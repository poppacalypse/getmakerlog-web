import React, { Component, useState } from "react";
import NotImplemented from "components/error/NotImplemented";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PraiseButton from "components/praise/PraiseButton";
import TaskComments from "./TaskComments";
import { useAuth } from "stores/AuthStore";

function TaskActions({ task, ...props }) {
	// We allow this to be false, favoring a boolean op below.
	// This allows for autofocus on click.
	const { user } = useAuth();
	const [commentsOpen, setCommentsOpen] = useState(false);
	return (
		<div>
			<span className="inline-flex">
				<span className="mr-2">
					<PraiseButton
						disabled={user && task.user.id === user.id}
						initialCount={task.praise}
						indexUrl={`/tasks/${task.id}`}
					/>
				</span>
				<span className="mr-2">
					<Button
						xs
						onClick={(e) => {
							setCommentsOpen(true);
						}}
					>
						<Button.Icon>
							<FontAwesomeIcon icon="comment" />
						</Button.Icon>
						Comment
					</Button>
				</span>
				<span className="mr-2">
					<NotImplemented>
						<Button xs>
							<Button.Icon>
								<FontAwesomeIcon icon="ellipsis-v" />
							</Button.Icon>
							More
						</Button>
					</NotImplemented>
				</span>
			</span>
			{(commentsOpen || task.comment_count > 0) && (
				<div className="mt-2">
					<TaskComments task={task} focused={commentsOpen} />
				</div>
			)}
		</div>
	);
}

export default TaskActions;
