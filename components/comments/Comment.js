import React, { useState } from "react";
import { useDeleteComment, useUpdateComment } from "queries/comments";
import { useAuth } from "stores/AuthStore";
import Avatar from "components/ui/Avatar";
import UserLine from "components/ui/UserLine";
import Form from "components/ui/Form";

function CommentEdit({ comment, onSubmit }) {
	const [content, setContent] = useState(comment.content);
	return (
		<Form
			onSubmit={() => {
				onSubmit(content);
			}}
		>
			<input
				className="w-full"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
		</Form>
	);
}

function Comment({ comment, indexUrl }) {
	const [editing, setEditing] = useState(false);
	const { user, isLoggedIn } = useAuth();

	const [deleteMutation, { isLoading: isDeleting }] = useDeleteComment(
		indexUrl
	);
	const [updateMutation, { isLoading: isUpdating }] = useUpdateComment(
		indexUrl
	);

	const onEdit = async (content) => {
		setEditing(false);
		await updateMutation({
			indexUrl,
			content,
			id: comment.id,
		});
	};

	const onDelete = async () => {
		await deleteMutation({
			indexUrl,
			id: comment.id,
		});
	};

	return (
		<div className="flex mb-4 last:mb-0">
			<div className="flex-none mr-2">
				<Avatar size={8} user={comment.user} />
			</div>
			<div className="flex-initial">
				<UserLine user={comment.user} />
				<div className="bg-gray-100 p-2 shadow-xs rounded-md break-words">
					{editing ? (
						<CommentEdit comment={comment} onSubmit={onEdit} />
					) : (
						<div>{comment.content}</div>
					)}
				</div>
				{comment.user.id == user.id && !editing ? (
					<div className="inline-flex text-xs">
						<a
							className="mr-2 last:mr-0 cursor-pointer"
							onClick={() => setEditing(true)}
						>
							Edit
						</a>
						<a
							className="mr-2 last:mr-0 cursor-pointer"
							onClick={onDelete}
						>
							Delete
						</a>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Comment;
