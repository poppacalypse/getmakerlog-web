import { default as axios, axiosWrapper } from "utils/axios";
import {
	useInfiniteQuery,
	useQuery,
	useMutation,
	useQueryCache,
} from "react-query";
import { getLogger } from "utils/logging";

const log = getLogger("discussions");

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

export async function getThreadReplies(key, { slug }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/discussions/${slug}/replies/`
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

export async function getThread(key, { slug }) {
	const { data } = await axiosWrapper(axios.get, `/discussions/${slug}/`);
	return data;
}

export async function createThreadReply({ slug, body, parentReply = null }) {
	let payload = { body };
	if (parentReply) {
		payload.parent_reply = parentReply;
	}
	const response = await axiosWrapper(
		axios.post,
		`/discussions/${slug}/replies/`,
		payload
	);
	return response.data;
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

export function useThread(slug) {
	const query = [DISCUSSION_QUERIES.getThread, { slug }];
	return useQuery(query, getThread);
}

export function useThreadReplies(slug) {
	const query = [DISCUSSION_QUERIES.getThreadReplies, { slug }];
	return useQuery(query, getThreadReplies);
}

export function useCreateThreadReply() {
	const queryCache = useQueryCache();

	return useMutation(createThreadReply, {
		onSuccess: (data) => {
			log(`Created new replt (#${data.id}, parent: ${data.parent})`);
			const slug = data.parent;
			queryCache.setQueryData(
				[DISCUSSION_QUERIES.getThreadReplies, { slug }],
				(oldData) => {
					if (!oldData) return [data];
					return [...oldData, data];
				}
			);
		},
	});
}
