import Button from "components/ui/Button";
import Card from "components/ui/Card";
import React from "react";
import { useRoot } from "stores/RootStore";
import SidebarItem from "./SidebarItem";

export default function FeedbackCard() {
	const { toggleFeedback } = useRoot();

	return (
		<SidebarItem title="Send feedback">
			<Card>
				<Card.Content>
					<div className="mb-2 text-xs">
						Help us build Makerlog with you.
					</div>
					<Button xs onClick={toggleFeedback}>
						Send feedback 💌
					</Button>
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
