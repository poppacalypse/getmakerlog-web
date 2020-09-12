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
import Message from "components/ui/Message";
import AppLayout from "layouts/AppLayout";
import StickyNav from "components/ui/StickyNav";
import { useEffect } from "react";
import { useCallback } from "react";
import Notification from "components/notifications/Notification";

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
		<AppLayout.WithTopBar
			topBar={
				<StickyNav sticky={false}>
					<div className="flex flex-row items-center">
						<h2 className="font-bold">Notifications</h2>
						<div className="flex-grow"></div>
					</div>
				</StickyNav>
			}
		>
			<Message warning>
				<strong>Heads up!</strong> This isn't finished yet, here be
				dragons.
			</Message>
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
		</AppLayout.WithTopBar>
	);
}

NotificationsPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			contained: false,
		},
	};
};

export default requireAuth(NotificationsPage);
