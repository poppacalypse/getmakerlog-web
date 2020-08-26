import React, { useState } from "react";
import {
	useComments,
	usePostComment,
	useDeleteComment,
} from "queries/comments";
import { observer, inject } from "mobx-react";
import CommentInput from "components/comments/CommentInput";
import Spinner from "components/ui/Spinner";
import Button from "components/ui/Button";
import Message from "components/ui/Message";
import { commentsSchema } from "schemas/comments";
import Avatar from "components/ui/Avatar";
import FullName from "components/users/FullName";
import UserLine from "components/ui/UserLine";
import orderBy from "lodash/orderBy";

function TaskComments({ task, auth, focused, ...props }) {
	const indexUrl = `/tasks/${task.id}`;
	const [content, setContent] = useState("");
	const { data, isLoading, error, refetch } = useComments(indexUrl);
	const [createMutation, { isLoading: isPosting }] = usePostComment(
		indexUrl,
		auth.user
	);
	const [deleteMutation, { isLoading: isDeleting }] = useDeleteComment(
		indexUrl
	);

	const onCreateComment = async () => {
		await createMutation({
			indexUrl,
			content,
		});
		setContent("");
	};

	const onDeleteComment = async (id) => {
		await deleteMutation({
			indexUrl,
			id,
		});
	};

	const { errors, value } = commentsSchema.validate(data);
	if (errors) {
		return <Message title="Invalid comments data." danger></Message>;
	}
	return (
		<div className="w-full">
			{task.comment_count > 0 && isLoading && (
				<div className="text-gray-500 mb-2">
					<Spinner small text="Loading comments, hold on..." />
				</div>
			)}
			{error && !isLoading && (
				<Message title="Failed to load comments." danger>
					<Button xs onClick={refetch}>
						Retry
					</Button>
				</Message>
			)}
			{data && !isLoading && !error && data.length > 0 && (
				<div className="px-2 border-l border-gray-200 bg-gray-50 mb-2 py-4">
					{orderBy(value, "created_at", "asc").map((comment) => (
						<div className="flex mb-4 last:mb-0" key={comment.id}>
							<div className="flex-none mr-2">
								<Avatar size={8} user={comment.user} />
							</div>
							<div className="flex-initial">
								<UserLine user={comment.user} />
								<div className="bg-gray-100 p-2 shadow-xs rounded-md break-words">
									<div>{comment.content}</div>
								</div>
								{comment.user.id == auth.user.id ? (
									<div className="inline-flex text-xs">
										<a className="mr-2 last:mr-0 cursor-pointer">
											Edit
										</a>
										<a
											className="mr-2 last:mr-0 cursor-pointer"
											onClick={(e) => {
												onDeleteComment(comment.id);
											}}
										>
											Delete
										</a>
									</div>
								) : null}
							</div>
						</div>
					))}
				</div>
			)}
			<CommentInput
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onCreateComment();
				}}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				loading={isPosting}
				focused={focused}
			/>
		</div>
	);
}

export default inject("auth")(observer(TaskComments));
