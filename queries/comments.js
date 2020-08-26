import axios, { axiosWrapper } from "utils/axios";
import { useQuery, useMutation, queryCache } from "react-query";
import { getLogger } from "utils/logging";

const log = getLogger("commments");

export const COMMENT_QUERIES = {
	getComments: "comments.getComments",
};

export async function getComments(key, { indexUrl }) {
	const { data } = await axiosWrapper(axios.get, `${indexUrl}/comments/`);
	return data;
}

export async function postComment({ indexUrl, content }) {
	const { data } = await axiosWrapper(axios.post, `${indexUrl}/comments/`, {
		content,
	});
	return data;
}

export async function deleteComment({ indexUrl, id }) {
	const { data } = await axiosWrapper(
		axios.delete,
		`${indexUrl}/comments/${id}`
	);
	return data;
}

export function useComments(indexUrl) {
	return useQuery([COMMENT_QUERIES.getComments, { indexUrl }], getComments);
}

export function usePostComment(indexUrl, user) {
	const query = [COMMENT_QUERIES.getComments, { indexUrl }];

	return useMutation(postComment, {
		onMutate: ({ indexUrl, content }) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			queryCache.cancelQueries(query);

			// Snapshot the previous value
			const previousComments = queryCache.getQueryData(query);

			// Optimistically update to the new value
			queryCache.setQueryData(query, (old) => [
				...old,
				{
					id: -1,
					user,
					content,
					created_at: new Date(),
				},
			]);

			// Return the snapshotted value
			return () => queryCache.setQueryData(query, previousComments);
		},
		// If the mutation fails, use the value returned from onMutate to roll back
		onError: (err, content, rollback) => {
			log(`Failed to post comment. (${err})`);
			if (rollback) rollback();
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryCache.invalidateQueries(query);
		},
	});
}

export function useDeleteComment(indexUrl) {
	const query = [COMMENT_QUERIES.getComments, { indexUrl }];

	return useMutation(deleteComment, {
		onMutate: ({ indexUrl, id }) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			queryCache.cancelQueries(query);

			// Snapshot the previous value
			const previousComments = queryCache.getQueryData(query);

			// Optimistically update to the new value
			queryCache.setQueryData(query, (old) =>
				old.filter((comment) => comment.id !== id)
			);

			// Return the snapshotted value
			return () => queryCache.setQueryData(query, previousComments);
		},
		// If the mutation fails, use the value returned from onMutate to roll back
		onError: (err, payload, rollback) => {
			log(`Failed to delete comment. (${err})`);
			if (rollback) rollback();
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryCache.invalidateQueries(query);
		},
	});
}
