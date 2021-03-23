import { default as axios, axiosWrapper } from "utils/axios";
import { useInfiniteQuery, useQueryCache } from "react-query";
import { getLogger } from "utils/logging";
import useWebSocket from "react-use-websocket";
import { buildSocketUrl } from "utils/random";
import { useCallback, useEffect, useMemo } from "react";
import uniqBy from "lodash/uniqBy";

const log = getLogger("feed");

export const FEED_QUERIES = {
	getFeed: "feeds.getFeed",
};

export async function getFeed(key, { indexUrl }, next = null) {
	const { data } = await axiosWrapper(axios.get, next ? next : indexUrl);
	return data;
}

export function useFeed(indexUrl, live = true, token = null) {
	const queryCache = useQueryCache();
	const query = useMemo(() => [FEED_QUERIES.getFeed, { indexUrl }], [
		indexUrl,
	]);

	const { lastMessage: latestMessage } = useWebSocket(
		token
			? buildSocketUrl(indexUrl + `?token=${token}`)
			: buildSocketUrl(indexUrl),
		{
			shouldReconnect: () =>
				!indexUrl || indexUrl.startsWith("/feeds/product") || !live,
		}
	);

	const onNewMessage = useCallback(
		(message) => {
			const parsed = JSON.parse(message.data);
			log("Received WS message.", parsed);
			switch (parsed.type) {
				case "day.push":
					queryCache.setQueryData(query, (old) => {
						// Assume all updates are in the past 24 hours, then push to top of stack.
						// Avoids a lengthy search op.
						if (!old)
							return [{ next: null, results: [parsed.payload] }];
						if (old.length > 0) {
							old[0].results = uniqBy(
								[parsed.payload, ...old[0].results],
								"id"
							);
						}
						return old;
					});
					return;
				case "day.pull":
					queryCache.setQueryData(query, (old) => {
						// Assume all updates are in the past 24 hours, then push to top of stack.
						// Avoids a lengthy search op.
						if (!old) return;
						return old.filter((d) => d.id !== parsed.payload.id);
					});
			}
		},
		[queryCache, query]
	);

	useEffect(() => {
		if (latestMessage) {
			onNewMessage(latestMessage);
		}
	}, [latestMessage, onNewMessage]);

	return useInfiniteQuery(query, getFeed, {
		getFetchMore: (lastGroup) => {
			return lastGroup.next;
		},
	});
}
