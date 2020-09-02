import React, { Component } from "react";
import taskSchema from "schemas/Task";
import { getLogger } from "utils/logging";
import TaskIcon, { getColorForTask } from "./TaskIcon";
import TaskActions from "./TaskActions";

const log = getLogger("Task");

// TODO: When link parsing is implemented, break-all anchor tags only.
// go back to break-words.

class Task extends Component {
	static defaultProps = {
		plain: false,
		withAttachments: true,
		withActions: false,
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

	renderActions = () => {
		return <TaskActions task={this.state.task} onUpdate={this.onUpdate} />;
	};

	renderAttachments = () => {
		if (this.state.task.attachment) {
			return (
				<div className="inline-block max-w-full mt-2 bg-gray-100 bg-center border border-l-0 border-r-0 border-gray-200 attachment rounded-md">
					<img
						className="block h-64 max-w-full rounded-md"
						src={this.state.task.attachment}
						alt={this.state.task.content}
					/>
				</div>
			);
		} else {
			return null;
		}
	};

	onUpdate = (delta) => {
		this.setState({ task: { ...this.state.task, ...delta } }, () => {
			log(`Task #${this.state.task.id} has been updated. (${delta})`);
			if (this.props.onUpdate) {
				this.props.onUpdate(delta, this.state.task);
			}
		});
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
			<div className="w-full max-w-full Task">
				<div className="flex flex-col content-center md:items-center md:flex-row">
					<div className="flex flex-row items-center flex-grow max-w-full mb-1 text-base font-medium text-gray-900 break-all task">
						<span
							className={`text-${getColorForTask(task)}-500 mr-1`}
						>
							<TaskIcon task={task} />
						</span>
						<div className="flex-grow">{task.content}</div>
					</div>

					<div className="flex-none ml-1">
						{this.props.withActions && this.renderActions()}
					</div>
				</div>
				{task.description !== null && task.description.length > 0 && (
					<p className="max-w-full p-4 ml-2 text-gray-900 break-words border-l border-gray-200">
						{task.description}
					</p>
				)}
				{this.props.withAttachments && this.renderAttachments()}
			</div>
		);
	}
}

export default Task;
