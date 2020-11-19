import EventCreateForm from "components/events/EventCreateForm";
import Card from "components/ui/Card";
import PageHeader from "components/ui/PageHeader";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import React from "react";
import { requireAuth } from "utils/auth";

function CreateEventPage() {
	return (
		<NarrowLayout rightSidebar={null}>
			<PageHeader>
				<div>
					<h2 className="font-bold">List an event</h2>
				</div>
			</PageHeader>
			<Card>
				<Card.Content>
					<EventCreateForm />
				</Card.Content>
			</Card>
			<NextSeo title="List event" />
		</NarrowLayout>
	);
}

export default requireAuth(CreateEventPage);
