import axios, { axiosWrapper } from "utils/axios";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { getLogger } from "utils/logging";
import useWebSocket from "react-use-websocket";
import { usePrevious } from "utils/hooks";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { buildSocketUrl } from "utils/random";
import { isServer } from "config";

const log = getLogger("notifications");

const NOTIFICATION_QUERIES = {
	getNotifications: "notifications.getNotifications",
};

export async function getNotifications() {
	const { data } = await axiosWrapper(axios.get, "/notifications/");
	return data;
}

export async function markAllRead() {
	const { data } = await axiosWrapper(
		axios.get,
		"/notifications/mark_all_read/"
	);
	return data;
}

export function useNotifications() {
	return useQuery([NOTIFICATION_QUERIES.getNotifications], getNotifications);
}

export function useMarkAllReadNotifications() {
	const queryCache = useQueryCache();
	const query = [NOTIFICATION_QUERIES.getNotifications];

	return useMutation(markAllRead, {
		onMutate: () => {
			queryCache.cancelQueries(query);
			const previous = queryCache.getQueryData(query);
			queryCache.setQueryData(query, (old) => {
				if (!old) return old;
				return old.map((notification) => ({
					...notification,
					read: true,
				}));
			});
			return () => queryCache.setQueryData(query, previous);
		},
		onError: (err, content, rollback) => {
			log(`Failed to mark notifications as read. (${err})`);
			if (rollback) rollback();
		},
		onSettled: () => {
			queryCache.invalidateQueries(query);
		},
	});
}

export function useStreamNotifications(token) {
	const queryCache = useQueryCache();
	const [socketUrl, setSocketUrl] = useState(
		buildSocketUrl(`/notifications/?token=${token}`)
	);
	const { lastMessage: latestMessage } = useWebSocket(socketUrl, {
		shouldReconnect: () =>
			token !== null && token !== "" && token !== undefined,
	});
	const prevToken = usePrevious(token);

	const clearNotificationCache = useCallback(() => {
		const query = [NOTIFICATION_QUERIES.getNotifications];
		queryCache.invalidateQueries(query);
	}, [queryCache]);

	useEffect(() => {
		if (prevToken !== token) {
			log(`Changing socket URL to new token: ${token}.`);
			setSocketUrl(buildSocketUrl(`/notifications/?token=${token}`));
		}
	}, [prevToken, token]);

	useEffect(() => {
		log(`Message received via WS.`, latestMessage);
		clearNotificationCache();
	}, [latestMessage, clearNotificationCache]);

	return { latestMessage };
}

export function useTitleCounts(count) {
	const setCount = (count) => {
		if (isServer) return;
		let initialTitle = document.title
			.substring(document.title.indexOf(")") + 1)
			.trim();
		if (count > 0) {
			// remove any previous parentheses. still a hack.
			document.title = `(${count}) ${initialTitle}`;
		} else {
			document.title = initialTitle;
		}
	};

	useEffect(() => {
		setCount(count);
		return () => {
			setCount(0);
		};
	}, [count]);
}
