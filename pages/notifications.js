import React from "react";
import { requireAuth } from "utils/auth";
import Card from "components/ui/Card";
import {
	useNotifications,
	useMarkAllReadNotifications,
} from "queries/notifications";
import Spinner from "components/ui/Spinner";
import orderBy from "lodash/orderBy";
import ErrorMessageList from "components/error/ErrorMessageList";
import { useEffect } from "react";
import { useCallback } from "react";
import Notification from "components/notifications/Notification";
import PageHeader from "components/ui/PageHeader";
import NarrowLayout from "layouts/NarrowLayout";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

function NotificationsPage() {
	const router = useRouter();
	const { isLoading, data, error } = useNotifications();
	const [markAllReadMutation] = useMarkAllReadNotifications();

	const markAllRead = useCallback(async () => {
		await markAllReadMutation();
	}, [markAllReadMutation]);

	useEffect(() => {
		markAllRead();
	}, [markAllRead]);

	useEffect(() => {
		router.events.on("routeChangeStart", markAllRead);

		return () => {
			router.events.off("routeChangeStart", markAllRead);
		};
	}, [router, markAllRead]);

	return (
		<NarrowLayout leftSidebar={null} rightSidebar={null}>
			<PageHeader>
				<h2 className="font-bold">Notifications</h2>
				<div className="flex-grow"></div>
			</PageHeader>
			<Card className="text-sm">
				<Card.Content>
					{data.length === 0 && (
						<center>
							<div className="text-xs text-gray-700">
								🍃 Nothing yet.
							</div>
						</center>
					)}
					{isLoading && (
						<Spinner small text="Loading notifications..." />
					)}
					{data && (
						<div>
							{orderBy(data, "created_at", "desc").map((n) => (
								<Notification notification={n} key={n.id} />
							))}
						</div>
					)}
					{error && <ErrorMessageList error={error} />}
				</Card.Content>
			</Card>
			<NextSeo title="Notifications" />
		</NarrowLayout>
	);
}

NotificationsPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
		},
	};
};

export default requireAuth(NotificationsPage);
