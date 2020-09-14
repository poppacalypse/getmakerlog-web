import React, { useState } from "react";
import TaskEditor from "./TaskEditor";
import DiscussionEditor from "./DiscussionEditor";

function Editor({ onFinish = () => {} }) {
	/**
	 * Four tabs!
	 * - Completed
	 * - In Progress
	 * - Remaining
	 * - Discussion
	 */
	const [tab, setTab] = useState(0);

	return (
		<div>
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
			{tab === 0 && <TaskEditor onFinish={onFinish} />}
			{tab === 1 && <DiscussionEditor onFinish={onFinish} />}
		</div>
	);
}

export default Editor;
