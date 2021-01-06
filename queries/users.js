import axios, { axiosWrapper } from "utils/axios";
import { useMutation, useQuery } from "react-query";
import { userSchema } from "schemas/user";
import { StdErrorCollection } from "utils/error";
import { getLogger } from "utils/logging";

const log = getLogger("auth");

export const USER_QUERIES = {
	getUser: "users.getUser",
};

export async function getUser(key, { username }) {
	const { data } = await axiosWrapper(axios.get, `/users/${username}/`);
	const { value, error } = userSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export async function createUser(payload) {
	const response = await axiosWrapper(
		axios.post,
		"/accounts/register/",
		payload
	);
	return response.data;
}

export function useUser(username) {
	return useQuery([USER_QUERIES.getUser, { username }], getUser, {
		staleTime: 1000 * 60 * 5,
	});
}

export function useCreateUser() {
	return useMutation(createUser, {
		onSuccess: (data) => {
			log(`Created new account (#${JSON.stringify(data)})`);
		},
	});
}
