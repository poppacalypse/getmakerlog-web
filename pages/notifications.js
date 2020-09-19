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

function NotificationsPage() {
	const { isLoading, data, error } = useNotifications();
	const [markAllReadMutation] = useMarkAllReadNotifications();

	const markAllRead = useCallback(async () => {
		await markAllReadMutation();
	}, [markAllReadMutation]);

	useEffect(() => {
		markAllRead();
	}, [markAllRead]);

	return (
		<div>
			<PageHeader>
				<h2 className="font-bold">Notifications</h2>
				<div className="flex-grow"></div>
			</PageHeader>
			<Card className="text-sm">
				<Card.Content>
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
		</div>
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
