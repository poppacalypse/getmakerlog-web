import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";
import { getFeatured } from "./stories";
import { differenceInHours } from "date-fns";

export const STATS_QUERIES = {
	getFrontpage: "stats.getFrontpage",
	getUserHeatmap: "stats.getUserHeatmap",
	getUserStats: "stats.getUserStats",
};

export async function getFrontpage() {
	let featuredPost = await getFeatured("random.key", { limit: 1 });
	if (featuredPost) {
		featuredPost = featuredPost[0];
		featuredPost =
			differenceInHours(
				new Date(),
				new Date(featuredPost.published_at)
			) <= 48
				? featuredPost
				: null;
	}
	const { data } = await axiosWrapper(axios.get, `/stats/world/popular/`);
	return { featuredPost, ...data };
}

export async function getUserHeatmap(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/activity_graph/`
	);
	return data;
}

export async function getUserStats(key, { username }) {
	const { data } = await axiosWrapper(axios.get, `/users/${username}/stats/`);
	return data;
}

export function useFrontpage() {
	return useQuery([STATS_QUERIES.getFrontpage], getFrontpage);
}

export function useUserHeatmap(username) {
	return useQuery(
		[STATS_QUERIES.getUserHeatmap, { username }],
		getUserHeatmap
	);
}

export function useUserStats(username) {
	return useQuery([STATS_QUERIES.getUserStats, { username }], getUserStats);
}
