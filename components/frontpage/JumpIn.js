import ThreadLine from "components/discussions/ThreadLine";
import Card from "components/ui/Card";
import React from "react";

export default function JumpIn({ frontpage }) {
	if (!(frontpage && frontpage.threads && frontpage.threads.length > 0))
		return null;

	return (
		<div className="mb-4">
			<h3 className="mb-2 font-semibold">Jump right in</h3>
			<Card>
				<Card.Content>
					{frontpage.threads.map((thread) => (
						<ThreadLine thread={thread} key={thread.slug} />
					))}
				</Card.Content>
			</Card>
		</div>
	);
}
