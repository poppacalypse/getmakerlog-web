import React from "react";
import taskSchema from "schemas/task";
import { getLogger } from "utils/logging";
import TaskIcon, { getColorForTask } from "./TaskIcon";
import TaskActions from "./TaskActions";

import TaskTextRenderer from "./TaskTextRenderer";
import TaskAttachments from "./TaskAttachments";

const log = getLogger("Task");

// TODO: When link parsing is implemented, break-all anchor tags only.
// go back to break-words.

function getEggClassNames(content) {
	if (content.includes("egg:rainbows")) {
		return "egg-rainbow";
	}
}

function Task({
	task,
	// plain = false,
	withAttachments = true,
	withActions = false,
}) {
	const { errors } = taskSchema.validate(task);
	if (errors) {
		log(`Task #${task.id ? task.id : null} failed validation. ${errors}`);
		return null;
	}

	const renderActions = () => {
		return <TaskActions task={task} />;
	};

	const renderAttachments = () => {
		return <TaskAttachments task={task} />;
	};

	return (
		<div className="w-full max-w-full Task">
			<div className="flex flex-col content-center md:items-center md:flex-row">
				<div className="flex flex-row flex-grow max-w-full mb-1 text-base font-medium text-gray-900 task">
					<span className={`text-${getColorForTask(task)}-500 mr-1`}>
						<TaskIcon task={task} />
					</span>
					<div
						className={`flex-grow ${getEggClassNames(
							task.content
						)}`}
					>
						<TaskTextRenderer task={task} />
					</div>
				</div>

				<div className="flex-none ml-1">
					{withActions && renderActions()}
				</div>
			</div>
			{task.description !== null && task.description.length > 0 && (
				<p className="max-w-full p-4 ml-2 text-gray-900 break-words whitespace-pre-line border-l border-gray-200">
					{task.description}
				</p>
			)}
			{withAttachments && renderAttachments()}
		</div>
	);
}

export default Task;
