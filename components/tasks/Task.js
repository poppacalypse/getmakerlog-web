import React, { Component } from "react";
import taskSchema from "schemas/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLogger } from "utils/logging";
import TaskIcon, { getColorForTask } from "./TaskIcon";

const log = getLogger("Task");

class Task extends Component {
	static defaultProps = {
		plain: false,
		withAttachment: true,
	};

	constructor(props) {
		super(props);

		this.state = {
			task: this.props.task,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.task.updated_at !== prevProps.task.updated_at) {
			this.setState({ task: this.props.task });
		}
	}

	renderAttachments = () => {
		if (this.state.task.attachment) {
			return (
				<div className="attachment inline-block mt-2 rounded-md bg-gray-100 border border-r-0 border-l-0 border-gray-200 bg-center max-w-full w-full">
					<img
						className="block rounded-md h-64 w-full max-w-full"
						src={this.state.task.attachment}
						alt={this.state.task.content}
					/>
				</div>
			);
		} else {
			return null;
		}
	};

	render() {
		const { errors, value } = taskSchema.validate(this.state.task);
		const task = value;
		if (errors) {
			log(
				`Task #${task.id ? task.id : null} failed validation. ${errors}`
			);
			return null;
		}

		return (
			<div className="Task max-w-full w-full">
				<div className="task text-base font-medium mb-1 text-gray-900 break-all max-w-full">
					<span className={`text-${getColorForTask(task)}-500`}>
						<TaskIcon task={task} />
					</span>{" "}
					{task.content}
				</div>
				{task.description !== null && task.description.length > 0 && (
					<p className="text-gray-900 ml-2 p-4 border-l border-gray-200 break-all max-w-full">
						{task.description}
					</p>
				)}
				{this.props.withAttachment && this.renderAttachments()}
			</div>
		);
	}
}

export default Task;
