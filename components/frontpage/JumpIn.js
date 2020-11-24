import Thread from "components/discussions/Thread";
import React from "react";

export default function JumpIn({ frontpage }) {
	if (!(frontpage && frontpage.threads && frontpage.threads.length > 0))
		return null;

	return (
		<div className="mb-4">
			<h3 className="mb-2 font-semibold">Jump right in</h3>
			<Thread thread={frontpage.threads[0]} />
		</div>
	);
}
