import axios, { axiosWrapper } from "utils/axios";
import { useInfiniteQuery } from "react-query";

export const SEARCH_QUERIES = {
	searchUsers: "search.searchUsers",
	searchProducts: "search.searchProducts",
	searchTasks: "search.searchTasks",
	searchDiscussions: "search.searchDiscussions",
};

export async function searchUsers(key, { query }, next = null) {
	const { data } = await axiosWrapper(
		axios.get,
		next ? next : `/search/users/?q=${query}`
	);
	return data;
}

export async function searchProducts(key, { query }, next = null) {
	const { data } = await axiosWrapper(
		axios.get,
		next ? next : `/search/products/?q=${query}`
	);
	return data;
}

export async function searchTasks(key, { query }, next = null) {
	const { data } = await axiosWrapper(
		axios.get,
		next ? next : `/search/tasks/?q=${query}`
	);
	return data;
}

export async function searchDiscussions(key, { query }, next = null) {
	const { data } = await axiosWrapper(
		axios.get,
		next ? next : `/search/discussions/?q=${query}`
	);
	return data;
}

export function useSearchUsers(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchUsers, { query }],
		searchUsers,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useSearchProducts(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchProducts, { query }],
		searchProducts,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useSearchTasks(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchTasks, { query }],
		searchTasks,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useSearchDiscussions(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchDiscussions, { query }],
		searchDiscussions,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}
