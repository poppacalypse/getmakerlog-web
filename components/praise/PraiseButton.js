import React, { Component, useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import Button from "components/ui/Button";
import { useQuery, queryCache, useMutation } from "react-query";
import { PRAISE_QUERIES, getPraise, setPraise } from "queries/praise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLogger } from "utils/logging";
import FaceStack from "components/ui/FaceStack";
import uniqBy from "lodash/uniqBy";
import { isServer } from "config";
import { Router } from "routes";

const log = getLogger("PraiseButton");

// TODO: On click, redirect to sign in if not logged in.

function PraiseButton({ indexUrl, initialCount, user, isLoggedIn, ...props }) {
	const [clicked, setClicked] = useState(false);
	const query = [PRAISE_QUERIES.getPraise, { indexUrl }];
	const { isLoading, error, data } = useQuery(query, getPraise, {
		staleTime: 1000 * 60 * 5,
		enabled: initialCount > 0 || clicked,
	});

	const [mutate] = useMutation(setPraise, {
		// When mutate is called:
		onMutate: (indexUrl) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			queryCache.cancelQueries(query);

			// Snapshot the previous value
			const previousPraiseState = queryCache.getQueryData(query);

			// Optimistically update to the new value
			queryCache.setQueryData(query, (old) => {
				if (!old && initialCount === 0) {
					return {
						praised: true,
						praised_by: [user],
						total: 1,
					};
				} else if (!old) {
					return null;
				}
				// This ain't good.
				return {
					...old,
					praised: !old.praised,
					praised_by: !old.praised
						? old.praised_by === null || old.praised_by.length === 0
							? [user]
							: uniqBy([...old.praised_by, user], "id")
						: old.praised_by !== null && old.praised_by.length > 0
						? old.praised_by.filter((u) => u.id !== user.id)
						: old.praised_by,
					total: old.praised ? old.total - 1 : old.total + 1,
				};
			});

			// Return the snapshotted value
			return () => {
				queryCache.setQueryData(query, previousPraiseState);
			};
		},
		// If the mutation fails, use the value returned from onMutate to roll back
		onError: (err, indexUrl, rollback) => {
			log(`Error praising.`, err);
			if (rollback) rollback();
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryCache.invalidateQueries(query);
		},
	});

	const onPraise = async () => {
		if (!isLoggedIn && !isServer) {
			log(`User is not signed in. Redirecting...`);
			Router.pushRoute("login");
		}
		log(`Praising ${indexUrl}.`);
		setClicked(true);
		const data = await mutate(indexUrl);
		return data;
	};

	useEffect(() => {
		if (error) {
			log(`Failed to load praise for ${indexUrl}.`, error);
		}
	}, [error]);

	// This is the one place where errors are acceptable.
	// We don't inform the user of errors. They will occur.

	return (
		<Button
			loading={isLoading}
			xs
			onClick={onPraise}
			className={data && data.praised ? "text-yellow-500" : ""}
		>
			<Button.Icon>
				<FontAwesomeIcon icon="star" />
			</Button.Icon>
			<span>
				{data && data.praised ? (
					<span className="font-medium">Praised</span>
				) : (
					"Praise"
				)}
			</span>
			<span className="text-gray-500">
				{data ? (
					<span className="ml-2">{data.total}</span>
				) : (
					<span className="ml-2">{initialCount}</span>
				)}
			</span>
			{data && data.praised_by !== null && data.praised_by.length > 0 && (
				<span className="ml-2">
					<FaceStack size={4} users={data.praised_by} />
				</span>
			)}
		</Button>
	);
}

export default inject((stores) => ({
	isLoggedIn: stores.auth.isLoggedIn,
	user: stores.auth.user,
}))(observer(PraiseButton));
