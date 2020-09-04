import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserLine from "components/ui/UserLine";
import Button from "components/ui/Button";
import orderBy from "lodash/orderBy";

function Reply({ reply, child, childrenReplies }) {
	childrenReplies = orderBy(childrenReplies, "created_at", "asc");

	return (
		<div
			className={
				child
					? "break-words whitespace-pre-line"
					: "mb-8 last:mb-0 break-words whitespace-pre-line"
			}
		>
			<UserLine user={reply.owner} />
			<div
				className={
					child ? "p-2 " : "px-4 py-2 border-l border-gray-200 ml-2.5"
				}
			>
				<p>{reply.body}</p>
				<div className="mt-4">
					<Button xs>
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
								<Reply child reply={r} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default Reply;
