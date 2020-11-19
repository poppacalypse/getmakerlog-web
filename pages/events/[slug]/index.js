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

EventPage.getInitialProps = async ({ query: { slug } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[EVENTS_QUERIES.getThread, { slug }],
		getEvent
	);

	return { dehydratedState: dehydrate(queryCache) };
};

export default EventPage;
