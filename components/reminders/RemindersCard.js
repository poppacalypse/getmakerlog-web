import Button from "components/ui/Button";
import Card from "components/ui/Card";
import React from "react";

export default function RemindersCard() {
	return (
		<Card>
			<Card.Content>
				{" "}
				<h3 className="font-bold text-gray-900">
					Set up notifications
				</h3>
				<p className="mb-4 text-gray-700">
					Commit to building in public and set up streak notifications
					to make sure you don't miss a day.
				</p>
				<div className="flex">
					<div className="mr-2">
						<Button primary>Get started</Button>
					</div>
					<div>
						<Button>Later</Button>
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
