import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserLine from "components/ui/UserLine";
import Button from "components/ui/Button";
import orderBy from "lodash/orderBy";
import ThreadReplyForm from "./ThreadReplyForm";

function Reply({
	reply,
	child,
	childrenReplies,
	thread,
	onReplyTo = null,
	withUserLine = true,
}) {
	const [replyingTo, setReplyingTo] = useState(null);
	childrenReplies = orderBy(childrenReplies, "created_at", "asc");

	return (
		<div
			className={
				child
					? "break-words whitespace-pre-line"
					: "mb-8 last:mb-0 break-words whitespace-pre-line"
			}
		>
			{withUserLine ? <UserLine user={reply.owner} /> : null}
			<div
				className={
					child ? "p-2 " : "px-4 py-2 border-l border-gray-200 ml-2.5"
				}
			>
				<p>{reply.body}</p>
				<div className="mt-4">
					<Button
						xs
						onClick={() => {
							onReplyTo
								? onReplyTo(reply.owner)
								: setReplyingTo(reply.owner);
						}}
					>
						<Button.Icon>
							<FontAwesomeIcon icon="reply" />
						</Button.Icon>{" "}
						Reply
					</Button>
				</div>
				<div className="px-4 border-l border-gray-200">
					{childrenReplies &&
						childrenReplies.map((r) => (
							<div key={r.id} className="mt-4">
								<Reply
									child
									reply={r}
									onReplyTo={setReplyingTo}
								/>
							</div>
						))}
					{!child && replyingTo ? (
						<div className="mt-4">
							<ThreadReplyForm
								replyingTo={replyingTo}
								parentReply={reply}
								thread={thread}
								onFinish={() => {
									setReplyingTo(null);
								}}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Reply;
