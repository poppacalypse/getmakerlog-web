import React from "react";
import Button from "components/ui/Button";
import truncate from "lodash/truncate";
import Card from "components/ui/Card";
import UserLine from "components/ui/UserLine";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActiveLink from "components/router/ActiveLink";
import ThreadReplyFaces from "components/discussions/ThreadReplyFaces";

function Discussion({ thread, withActionBar = true }) {
	return (
		<Card className="break-all">
			<Card.Content>
				<div className="flex flex-row items-center mb-2">
					<div className="mr-2">
						<Avatar size={6} user={thread.owner} />
					</div>
					<div>
						<UserLine
							style={{ marginBottom: 0 }}
							user={thread.owner}
						/>
					</div>
				</div>
				<ActiveLink
					route="discussions-thread"
					params={{ slug: thread.slug }}
				>
					<a>
						<h3 className="mb-2 font-semibold text-gray-900">
							{thread.pinned && (
								<FontAwesomeIcon size="xs" icon="thumbtack" />
							)}{" "}
							{thread.title}
						</h3>
						<p className="text-gray-700 whitespace-pre-line">
							{truncate(thread.body, { length: 144 })}
						</p>
					</a>
				</ActiveLink>
				{withActionBar && (
					<div className="flex flex-row items-center mt-4">
						<div className="mr-2">
							<Button sm>
								<Button.Icon>
									<FontAwesomeIcon icon="reply" />
								</Button.Icon>
								Reply{" "}
								<span
									className={
										thread.reply_count > 0 ? "ml-2" : ""
									}
								>
									<ThreadReplyFaces thread={thread} />
								</span>
							</Button>
						</div>

						<div className="mr-2 text-gray-500">
							{thread.reply_count} replies
						</div>
					</div>
				)}
			</Card.Content>
		</Card>
	);
}

export default Discussion;
