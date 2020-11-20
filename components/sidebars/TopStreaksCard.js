import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";
import UserMedia from "components/ui/UserMedia";
import { useWorldStats } from "queries/stats";
import React from "react";
import SidebarItem from "./SidebarItem";

export default function TopStreaksCard() {
	const { isLoading, data: worldStats, error } = useWorldStats();

	if (error) return null;

	return (
		<SidebarItem title="Top">
			<Card>
				<Card.Content>
					{isLoading && <Spinner small text="Loading users..." />}
					{worldStats && worldStats.top_users && (
						<div className="space-y-2">
							{worldStats.top_users.slice(0, 5).map((user) => (
								<UserMedia
									truncateName
									extraStreakText={false}
									key={user.id}
									user={user}
								/>
							))}
						</div>
					)}
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
