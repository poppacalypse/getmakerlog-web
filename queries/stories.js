import GhostContentAPI from "@tryghost/content-api";
import config from "config";
import { useMutation, useQuery } from "react-query";
import axios, { axiosWrapper } from "utils/axios";

export const COMMON_TAGS = {
	interviews: ["interviews", "maker-spotlight", "making-a-maker"],
	news: ["news"],
	culture: ["culture"],
};

export const STORY_QUERIES = {
	getPost: "stories.getPost",
	getFeatured: "stories.getFeatured",
	getTags: "stories.getTags",
	getRelatedPosts: "stories.getRelatedPosts",
	getStoryMetadata: "stories.getStoryMetadata",
};

export const blogApi = new GhostContentAPI({
	url: config.GHOST_API_URL,
	key: config.GHOST_CONTENT_KEY,
	version: config.GHOST_API_VER,
});

export async function subscribe(email) {
	const response = await axiosWrapper(axios.post, "/stories/subscribe/", {
		email,
	});
	return response.data;
}

export async function getPosts(limit = "all") {
	return await blogApi.posts.browse({
		limit: limit,
		include: "tags",
	});
}

export async function getLatestPost(limit = "1") {
	return await blogApi.posts.browse({
		limit: limit,
		include: "tags",
	});
}

export async function getNewsPosts(limit = "all") {
	return await blogApi.posts.browse({
		limit: limit,
		include: "tags",
		filter: "tag:news",
	});
}

export async function getInterviews(key, { limit = "all" }) {
	return await blogApi.posts.browse({
		limit,
		include: "tags",
		filter: "tag:interviews,tag:maker-spotlight,tag:making-a-maker",
	});
}

export async function getPost(key, { slug }) {
	return await blogApi.posts.read({
		slug,
		include: "tags",
	});
}

export async function getFeatured(key, { limit = 1 }) {
	return await blogApi.posts.browse({
		limit,
		include: "tags",
		filter: "featured:true",
	});
}

export async function getTags(key, { tags, limit = "all", filters = [] }) {
	return await blogApi.posts.browse({
		limit: limit,
		include: "tags",
		filter: [...tags.map((tag) => `tag:${tag}`), ...filters].join(","),
	});
}

export async function getRelatedPosts(
	key,
	{ slug, primary_tag_slug, limit = 3 }
) {
	return await blogApi.posts.browse({
		limit,
		include: "tags",
		filter: `slug:-${slug}+tag:${primary_tag_slug}`,
	});
}

export async function getStoryMetadata(key, { slug }) {
	const { data } = await axiosWrapper(axios.get, `/stories/${slug}/`);
	return data;
}

export function useFeatured(limit = 1) {
	return useQuery([STORY_QUERIES.getFeatured, { limit }], getFeatured);
}

// Interviews: tag:interviews,tag:maker-spotlight,tag:making-a-maker
// Other tags: news
export function useTags(tags = [], limit = "all", filters = []) {
	return useQuery([STORY_QUERIES.getTags, { tags, limit, filters }], getTags);
}

export function usePost(slug) {
	return useQuery([STORY_QUERIES.getPost, { slug }], getPost);
}

export function useRelatedPosts(slug, primary_tag_slug = "Uncategorized") {
	return useQuery(
		[STORY_QUERIES.getRelatedPosts, { slug, primary_tag_slug }],
		getRelatedPosts
	);
}

export function useStoryMetadata(slug) {
	return useQuery(
		[STORY_QUERIES.getStoryMetadata, { slug }],
		getStoryMetadata
	);
}

export function useSubscribe() {
	return useMutation(subscribe);
}
