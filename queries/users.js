import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";

export const USER_QUERIES = {
	getUser: "users.getUser",
	getUserProducts: "users.getUserProducts",
};

export async function getUser(key, { username }) {
	const { data } = await axiosWrapper(axios.get, `/users/${username}/`);
	return data;
}

export async function getUserProducts(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/products/`
	);
	return data;
}

export function useUser(username) {
	return useQuery([USER_QUERIES.getUser, { username }], getUser, {
		staleTime: 1000 * 60 * 5,
	});
}

export function useUserProducts(username) {
	return useQuery(
		[USER_QUERIES.getUserProducts, { username }],
		getUserProducts,
		{
			staleTime: 1000 * 60 * 5,
		}
	);
}
