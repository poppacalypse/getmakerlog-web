import { useMutation } from "react-query";
import axios, { axiosWrapper } from "utils/axios";
import { getLogger } from "utils/logging";

const log = getLogger("reminders");

export const REMINDERS_QUERIES = {};

export async function createReminder({ type, frequency, time }) {
	const response = await axiosWrapper(axios.post, "/reminders/", {
		type,
		frequency,
		time,
	});
	return response.data;
}

export function useCreateReminder() {
	return useMutation(createReminder, {
		onSuccess: (data) => {
			log(`Created reminder (#${JSON.stringify(data)})`);
		},
	});
}
