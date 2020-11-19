import Button from "components/ui/Button";
import Card from "components/ui/Card";
import ErrorCard from "components/ui/ErrorCard";
import PageHeader from "components/ui/PageHeader";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import { useUpcomingEvents } from "queries/events";
import React from "react";
import orderBy from "lodash/orderBy";
import EventCard from "components/events/EventCard";
import { Link } from "routes";

export default function EventsPage() {
	const { isLoading, data: events, error, refetch } = useUpcomingEvents();

	return (
		<NarrowLayout>
			<PageHeader>
				<div>
					<h2 className="font-bold">Latest events</h2>
				</div>
				<div className="flex-grow"></div>
				<div>
					<Link route="events-create">
						<Button secondary>List an event</Button>
					</Link>
				</div>
			</PageHeader>

			{error ? (
				<ErrorCard
					message="Failed to load events."
					actions={<Button onClick={refetch}>Retry</Button>}
				/>
			) : (
				<>
					{isLoading && (
						<Card>
							<Card.Content>
								<Spinner small text="Loading events..." />
							</Card.Content>
						</Card>
					)}

					{events &&
						orderBy(events, "starts_at", "asc").map((event) => (
							<EventCard event={event} key={event.slug} />
						))}
				</>
			)}
			<NextSeo title="Events" />
		</NarrowLayout>
	);
}
