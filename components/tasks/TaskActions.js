import React, { useState } from "react";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PraiseButton from "components/praise/PraiseButton";
import TaskComments from "./TaskComments";
import { useAuth } from "stores/AuthStore";
import Dropdown from "components/ui/Dropdown";
import copy from "clipboard-copy";
import { isServer } from "config";
import { buildAbsoluteUrl } from "utils/random";
import { getTwitterShareUrl } from "utils/tasks";

function TaskPermalinkAction({ task }) {
	const [copied, setCopied] = useState(false);

	return (
		<Dropdown.Item
			onClick={() => {
				if (isServer) return;
				copy(buildAbsoluteUrl(`/tasks/${task.id}`));
				setCopied(true);
				setInterval(() => setCopied(false), 1000);
			}}
		>
			<Dropdown.Item.Icon>
				<FontAwesomeIcon icon="link" />
			</Dropdown.Item.Icon>
			{copied ? "Copied!" : "Permalink"}
		</Dropdown.Item>
	);
}

function TaskActions({ task }) {
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
						onClick={() => {
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
					<Dropdown
						items={
							<>
								<TaskPermalinkAction task={task} />

								<Dropdown.Item
									href={getTwitterShareUrl([task])}
									target="_blank"
								>
									<Dropdown.Item.Icon>
										<FontAwesomeIcon
											icon={["fab", "twitter"]}
										/>
									</Dropdown.Item.Icon>
									Tweet
								</Dropdown.Item>
							</>
						}
					>
						<Button xs>
							<Button.Icon>
								<FontAwesomeIcon icon="ellipsis-v" />
							</Button.Icon>
							More
						</Button>
					</Dropdown>
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
