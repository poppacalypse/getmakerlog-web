import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";

export const STATS_QUERIES = {
	getUserHeatmap: "stats.getUserHeatmap",
};

export async function getUserHeatmap(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/activity_graph/`
	);
	return data;
}

export function useUserHeatmap(username) {
	return useQuery(
		[STATS_QUERIES.getUserHeatmap, { username }],
		getUserHeatmap
	);
}
