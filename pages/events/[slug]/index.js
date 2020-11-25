import EventCard from "components/events/EventCard";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import { EVENTS_QUERIES, getEvent, useEvent } from "queries/events";
import React from "react";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "routes";
import { getErrorResponse } from "utils/error";

function EventPage() {
	const {
		query: { slug },
	} = useRouter();
	const { isLoading, data: event, error } = useEvent(slug);

	if (error) {
		return <ErrorCard />;
	}

	if (isLoading) {
		return <Spinner text="Loading event..." />;
	}

	return (
		<NarrowLayout>
			<EventCard full event={event} />
			<NextSeo title={event.title} />
		</NarrowLayout>
	);
}

EventPage.getInitialProps = async ({ res, query: { slug } }) => {
	const queryCache = makeQueryCache();

	try {
		await queryCache.prefetchQuery(
			[EVENTS_QUERIES.getThread, { slug }],
			getEvent,
			{},
			{ throwOnError: true }
		);

		return { dehydratedState: dehydrate(queryCache) };
	} catch (e) {
		return getErrorResponse(e, res);
	}
};

export default EventPage;
