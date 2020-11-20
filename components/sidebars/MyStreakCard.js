import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/ui/Card";
import RestDays from "components/ui/RestDays";
import Streak from "components/ui/Streak";
import React from "react";
import { useAuth } from "stores/AuthStore";
import SidebarItem from "./SidebarItem";

export default function MyStreakCard() {
	const { user } = useAuth();

	if (!user) return null;

	return (
		<SidebarItem
			title="Your streak"
			titleRight={
				<a className="text-xs">
					<FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet!
				</a>
			}
		>
			<Card>
				<Card.Content>
					<h1 className="font-bold text-gray-900">
						<Streak days={user.streak} />
						{user.rest_days ? (
							<RestDays days={user.rest_days} />
						) : null}
					</h1>
					<p className="help">
						Build a streak by logging completed tasks daily.
					</p>
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
