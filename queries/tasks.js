import axios, { axiosWrapper } from "utils/axios";
import { useQuery, useMutation, queryCache } from "react-query";
import { getLogger } from "utils/logging";
import { format } from "date-fns";

const log = getLogger("tasks");

export const TASK_QUERIES = {
	getTasks: "tasks.getTasks",
};

export async function createTask(payload) {
	let data = new FormData();
	const headers = {
		"Content-Type": "multipart/form-data",
	};
	for (const [key, value] of Object.entries(payload)) {
		data.append(key, value);
	}
	const response = await axiosWrapper(axios.post, "/tasks/", data, {
		headers,
	});
	return response.data;
}

export async function getTasksForDateRange(key, { startDate, endDate }) {
	let page = 0;
	log(
		`Fetching tasks. (page: ${page}, startDate: ${startDate}, endDate: ${endDate})`
	);
	const { data } = await axiosWrapper(
		axios.get,
		`/tasks/?start_date=${startDate}&end_date=${endDate}`
	);
	let tasks = data.results;
	let next = data.next;
	while (next !== null) {
		page++;
		log(
			`Fetching tasks. (page: ${page}, startDate: ${startDate}, endDate: ${endDate})`
		);
		let { data } = await axiosWrapper(axios.get, next);
		tasks = [...tasks, ...data.results];
		next = data.next;
	}
	return tasks;
}

export async function updateTask({ id, payload }) {
	const { data } = await axiosWrapper(axios.patch, `/tasks/${id}/`, {
		...payload,
	});
	return data;
}

function getQueryForDate(date) {
	return [
		TASK_QUERIES.getTasks,
		{
			startDate: encodeURIComponent(`${format(date, "yyyy-MM-dd")} 0:00`),
			endDate: encodeURIComponent(`${format(date, "yyyy-MM-dd")} 23:59`),
		},
	];
}

export function useTasks(date) {
	return useQuery(getQueryForDate(date), getTasksForDateRange);
}

export function useUpdateTask({ date = null }) {
	const queries = [date ? getQueryForDate(date) : null];

	return useMutation(updateTask, {
		onMutate: ({ payload, id }) => {
			const rollbacks = queries.map((query) => {
				if (!query) return;
				log(`Task mutation, updating query '${query}'.`);
				// Snapshot the previous value
				const previousTasks = queryCache.getQueryData(query);

				// Optimistically update to the new value
				queryCache.setQueryData(query, (old) => {
					if (!old) return old;
					return old.map((task) =>
						task.id === id ? { ...task, ...payload } : task
					);
				});

				// Return the snapshotted value
				return () => queryCache.setQueryData(query, previousTasks);
			});

			return () => {
				rollbacks.map((rollback) => {
					if (rollback) {
						log(`Rolling back query. (${rollback})`);
						rollback();
					}
				});
			};
		},
		// If the mutation fails, use the value returned from onMutate to roll back
		onError: (err, content, rollback) => {
			log(`Failed to update task. (${err})`);
			if (rollback) rollback();
		},
		// Always refetch after error or success:
		onSettled: () => {
			queries.map((query) => {
				if (query) queryCache.invalidateQueries(query);
			});
		},
	});
}

export function useCreateTask() {
	return useMutation(createTask, {
		onSuccess: (newTask) => {
			log(`Created new task #${newTask.id}.`);
			queryCache.setQueryData([TASK_QUERIES.getTasks], (old) => {
				if (!old) return old;
				return [...old, newTask];
			});
		},
		// If the mutation fails, use the value returned from onMutate to roll back
		onError: (err) => {
			log(`Failed to create task. (${err})`);
		},
	});
}
