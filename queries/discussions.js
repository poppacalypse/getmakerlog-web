import { default as axios, axiosWrapper } from "utils/axios";
import { useInfiniteQuery, useQuery } from "react-query";

export const DISCUSSION_QUERIES = {
	getLatestDiscussions: "discussions.getLatestDiscussions",
	getThread: "discussions.getThread",
	getThreadReplies: "discussions.getThreadReplies",
	getThreadRepliers: "discussions.getThreadRepliers",
};

export async function getLatestDiscussions(key, next = null) {
	const { data } = await axiosWrapper(
		axios.get,
		next ? next : `/discussions/`
	);
	return data;
}

export async function getThreadRepliers(key, { slug }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/discussions/${slug}/replies/people/?exclude_owner=true`
	);
	return data;
}

export function useLatestDiscussions() {
	return useInfiniteQuery(
		DISCUSSION_QUERIES.getLatestDiscussions,
		getLatestDiscussions,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useThreadRepliers(slug, enabled = true) {
	const query = [DISCUSSION_QUERIES.getThreadRepliers, { slug }];
	return useQuery(query, getThreadRepliers, {
		staleTime: 1000 * 60 * 5,
		enabled,
	});
}
