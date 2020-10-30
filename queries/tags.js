import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";

export const TAGS_QUERIES = {
	getCommonTags: "tags.getCommonTags",
	getSuggestedTags: "tags.getSuggestedTags",
};

export async function getCommonTags(key, { type }) {
	const { data } = await axiosWrapper(axios.get, `/${type}/common_tags/`);
	return data;
}

export async function getSuggestedTags(key, { type, query }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/${type}/common_tags/?q=${query}`
	);
	return data;
}

export function useCommonTags(type) {
	return useQuery([TAGS_QUERIES.getCommonTags, { type }], getCommonTags);
}

export function useSuggestedTags(type, query) {
	return useQuery(
		[TAGS_QUERIES.getSuggestedTags, { type, query }],
		getSuggestedTags
	);
}
