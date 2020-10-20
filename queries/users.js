import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";
import { userSchema } from "schemas/user";
import { StdErrorCollection } from "utils/error";
import { productsSchema } from "schemas/products";

export const USER_QUERIES = {
	getUser: "users.getUser",
	getUserProducts: "users.getUserProducts",
};

export async function getUser(key, { username }) {
	const { data } = await axiosWrapper(axios.get, `/users/${username}/`);
	const { value, error } = userSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export async function getUserProducts(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/products/`
	);
	const { value, error } = productsSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
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
