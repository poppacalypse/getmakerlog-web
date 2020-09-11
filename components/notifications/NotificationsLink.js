import React from "react";
import {
	useNotifications,
	useStreamNotifications,
	useTitleCounts,
} from "queries/notifications";
import { useAuth } from "stores/AuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "routes";

function NotificationsLink() {
	const { token } = useAuth();
	const { data } = useNotifications();
	let count =
		data && data.length > 0
			? data.filter((n) => n.read === false).length
			: 0;
	// TODO: Validate schema
	useStreamNotifications(token);
	useTitleCounts(count);

	return (
		<Link route="notifications">
			<a
				className={
					"flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full " +
					(count > 0
						? "bg-green-500 hover:bg-green-700 text-white "
						: " text-gray-700 border border-gray-200 hover:bg-gray-100 ")
				}
			>
				{count === 0 ? <FontAwesomeIcon icon="bell" /> : count}
			</a>
		</Link>
	);
}

export default NotificationsLink;
