import axios, { axiosWrapper } from "utils/axios";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { userSchema } from "schemas/user";
import { StdErrorCollection } from "utils/error";
import { getLogger } from "utils/logging";

const log = getLogger("auth");

export const USER_QUERIES = {
	getUser: "users.getUser",
	getIsFollowing: "users.getIsFollowing",
};

export async function getUser(key, { username }) {
	const { data } = await axiosWrapper(axios.get, `/users/${username}/`);
	const { value, error } = userSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export async function getIsFollowing(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/is_following/`
	);
	return data.is_following;
}

export async function createUser(payload) {
	const response = await axiosWrapper(
		axios.post,
		"/accounts/register/",
		payload
	);
	return response.data;
}

export async function activateUser({ uid, token }) {
	const response = await axiosWrapper(
		axios.post,
		`/accounts/email_activate/${uid}/${token}/`,
		{}
	);
	return response.data;
}

export async function deleteUser({ repeatUsername }) {
	const response = await axiosWrapper(
		axios.post,
		"/accounts/delete_account/",
		{
			validation: repeatUsername,
		}
	);
	return response.data;
}

export async function changePassword({ oldPassword, newPassword }) {
	const response = await axiosWrapper(
		axios.put,
		"/accounts/change_password/",
		{
			old_password: oldPassword,
			new_password: newPassword,
		}
	);
	return response.data;
}

export async function follow(username) {
	const { data } = await axiosWrapper(
		axios.post,
		`/users/${username}/follow/`
	);
	return data;
}

export function useUser(username) {
	return useQuery([USER_QUERIES.getUser, { username }], getUser, {
		staleTime: 1000 * 60 * 5,
	});
}

export function useIsFollowing(username) {
	return useQuery(
		[USER_QUERIES.getIsFollowing, { username }],
		getIsFollowing,
		{
			staleTime: 1000 * 60 * 5,
		}
	);
}

export function useCreateUser() {
	return useMutation(createUser, {
		onSuccess: (data) => {
			log(`Created new account (#${JSON.stringify(data)})`);
		},
	});
}

export function useActivateUser() {
	return useMutation(activateUser, {
		onSuccess: (data) => {
			log(`Activated new account (#${JSON.stringify(data)})`);
		},
	});
}

export function useDeleteUser() {
	return useMutation(deleteUser, {
		onSuccess: (data) => {
			log(`Deleted account (#${JSON.stringify(data)})`);
		},
	});
}

export function useChangePassword() {
	return useMutation(changePassword, {
		onSuccess: (data) => {
			log(`Changed account password (#${JSON.stringify(data)})`);
		},
	});
}

export function useFollow() {
	const queryCache = useQueryCache();
	return useMutation(follow, {
		onMutate: async (username) => {
			const query = [USER_QUERIES.getIsFollowing, { username }];
			await queryCache.cancelQueries(query);
			// Snapshot the previous value
			const previousState = queryCache.getQueryData(query);
			// Optimistically update to the new value
			queryCache.setQueryData(query, !previousState);

			// Return a context object with the snapshotted value
			return { previousState };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (err, username, context) => {
			const query = [USER_QUERIES.getIsFollowing, { username }];
			queryCache.setQueryData(query, context.previousState);
		},
		// Always refetch after error or success:
		onSettled: (data, err, username) => {
			const query = [USER_QUERIES.getIsFollowing, { username }];
			queryCache.invalidateQueries(query);
		},
		onSuccess: (data) => {
			log(`Toggled folow: (#${JSON.stringify(data)})`);
		},
	});
}
