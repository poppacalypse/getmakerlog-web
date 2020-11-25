import React, { useState } from "react";
import Avatar from "components/ui/Avatar";
import { useAuth } from "stores/AuthStore";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	DoneStates,
	getDeltaFromDoneState,
	getHumanStateFromDoneState,
	useAttachmentInput,
} from "utils/tasks";
import TaskIcon from "components/tasks/TaskIcon";
import Dropdown from "components/ui/Dropdown";
import { useCreateTask } from "queries/tasks";
import ErrorMessageList from "components/error/ErrorMessageList";
import { useEffect } from "react";
import { onCmdEnter } from "utils/random";

function TaskEditor({ onFinish }) {
	const { user } = useAuth();
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [doneState, setDoneState] = useState(DoneStates.DONE);
	const [mutate, { isSuccess, isLoading, error }] = useCreateTask();

	const {
		attachmentState,
		getRootProps,
		getInputProps,
		open,
		isDragActive,
	} = useAttachmentInput();

	useEffect(() => {
		if (isSuccess) {
			setContent("");
			setDescription("");
			if (onFinish) onFinish();
		}
	}, [isSuccess, onFinish]);

	const onCreate = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		let payload = { content, ...getDeltaFromDoneState(doneState) };
		if (description.length > 0) payload["description"] = description;
		if (attachmentState.attachment)
			payload["attachment"] = attachmentState.attachment;
		await mutate(payload);
	};

	const cycleDoneState = () => {
		if (doneState === DoneStates.DONE) {
			setDoneState(DoneStates.IN_PROGRESS);
		} else if (doneState === DoneStates.IN_PROGRESS) {
			setDoneState(DoneStates.REMAINING);
		} else if (doneState === DoneStates.REMAINING) {
			setDoneState(DoneStates.DONE);
		}
	};

	return (
		<form onSubmit={(e) => onCreate(e)} {...getRootProps()}>
			<div className="flex items-center input-flex">
				<span
					className="relative flex-none mr-2 cursor-pointer"
					onClick={cycleDoneState}
				>
					<Avatar size={8} user={user} />
					<TaskIcon
						task={getDeltaFromDoneState(doneState)}
						className="absolute bg-white rounded-full"
						style={{ right: "-4px", top: "-4px" }}
					/>
				</span>
				<input
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onKeyDown={(e) => onCmdEnter(e, () => onCreate(e))}
					className="flex-grow w-full mr-2 appearance-none"
					type="text"
					placeholder="Start typing something you've done or made..."
				/>
				{content.length > 0 && (
					<div className="flex-none">
						<Dropdown
							items={
								<>
									<Dropdown.Item
										onClick={() =>
											setDoneState(DoneStates.DONE)
										}
									>
										Done
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() =>
											setDoneState(DoneStates.IN_PROGRESS)
										}
									>
										In-progress
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() =>
											setDoneState(DoneStates.REMAINING)
										}
									>
										To-do
									</Dropdown.Item>
								</>
							}
						>
							<Button
								sm
								secondary
								className={
									doneState !== DoneStates.DONE
										? "remaining"
										: ""
								}
							>
								<Button.Icon>
									<TaskIcon
										task={getDeltaFromDoneState(doneState)}
									/>
								</Button.Icon>
								{getHumanStateFromDoneState(doneState)}
								<Button.Icon right>
									<FontAwesomeIcon icon="caret-down" />
								</Button.Icon>
							</Button>
						</Dropdown>
					</div>
				)}
			</div>
			{content.length > 0 && (
				<>
					{isDragActive ? (
						<div className="flex items-center justify-center h-32 mt-2 bg-gray-100 border border-gray-200 border-dashed rounded-md">
							<span className="text-gray-300">
								Drop an image here.
							</span>
						</div>
					) : (
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							onKeyDown={(e) => onCmdEnter(e, () => onCreate(e))}
							rows={4}
							className="w-full h-32 mt-2"
							placeholder="Write a description or drop images here..."
						/>
					)}
					{error && (
						<div className="mt-2">
							<ErrorMessageList error={error} />
						</div>
					)}
					<div className="flex flex-row w-full mt-4">
						<div className="flex-none">
							<input {...getInputProps()}></input>
							<Button sm onClick={open}>
								<Button.Icon>
									<FontAwesomeIcon icon="camera" />
								</Button.Icon>
								{attachmentState.name
									? attachmentState.name
									: "Add image"}
							</Button>
						</div>
						<div className="flex-grow"></div>
						<div className="flex-none">
							<Button
								primary
								sm
								loading={isLoading}
								onClick={onCreate}
							>
								Post
							</Button>
						</div>
					</div>
				</>
			)}
		</form>
	);
}

export default TaskEditor;
