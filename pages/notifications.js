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
import Button from "components/ui/Button";
import Message from "components/ui/Message";

function NotificationsPage() {
	const { isLoading, data, error } = useNotifications();
	const [
		markAllReadMutation,
		{ isLoading: isMarkingRead },
	] = useMarkAllReadNotifications();

	const onClickMarkAllRead = async () => {
		await markAllReadMutation();
	};

	return (
		<>
			<Message warning>
				<strong>Heads up!</strong> This isn't finished yet, and is only
				a proof of concept.
			</Message>
			<Card className="text-sm">
				<Card.Content>
					{isLoading && (
						<Spinner small text="Loading notifications..." />
					)}
					{data && (
						<div>
							<div className="mb-4">
								<Button
									loading={isMarkingRead}
									onClick={onClickMarkAllRead}
								>
									Mark all read
								</Button>
							</div>
							{orderBy(data, "created_at", "desc").map((n) => (
								<pre key={n.id} className="w-full break-all">
									{n.actor
										? JSON.stringify(n.actor.username)
										: null}{" "}
									{n.verb}{" "}
									{n.target
										? JSON.stringify(n.target_type)
										: null}{" "}
									({n.read ? "read" : "unread"})
								</pre>
							))}
						</div>
					)}
					{error && <ErrorMessageList error={error} />}
				</Card.Content>
			</Card>
		</>
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
