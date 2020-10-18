import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";

export const STATS_QUERIES = {
	getUserHeatmap: "stats.getUserHeatmap",
	getUserStats: "stats.getUserStats",
};

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

export function useUserHeatmap(username) {
	return useQuery(
		[STATS_QUERIES.getUserHeatmap, { username }],
		getUserHeatmap
	);
}

export function useUserStats(username) {
	return useQuery([STATS_QUERIES.getUserStats, { username }], getUserStats);
}
