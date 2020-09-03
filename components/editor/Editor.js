import React, { useState } from "react";
import Card from "components/ui/Card";
import TaskEditor from "./TaskEditor";

function Editor() {
	/**
	 * Four tabs!
	 * - Completed
	 * - In Progress
	 * - Remaining
	 * - Discussion
	 */
	const [tab, setTab] = useState(0);

	return (
		<Card>
			<Card.Content>
				<div className="mb-2">
					<small className="inline-flex">
						<a
							onClick={() => setTab(0)}
							className={
								"mr-2 font-medium cursor-pointer " +
								(tab == 0 ? "text-green-700" : "text-gray-500")
							}
						>
							Task
						</a>
						<a
							onClick={() => setTab(1)}
							className={
								"mr-2 font-medium cursor-pointer " +
								(tab == 1 ? "text-green-700" : "text-gray-500")
							}
						>
							Discussion
						</a>
					</small>
				</div>
				{tab === 0 && <TaskEditor />}
			</Card.Content>
		</Card>
	);
}

export default Editor;
