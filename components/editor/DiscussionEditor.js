import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "components/ui/Avatar";
import { useAuth } from "stores/AuthStore";
import { onCmdEnter } from "utils/random";
import Button from "components/ui/Button";
import MarkdownEnabled from "components/ui/MarkdownEnabled";
import { useCreateThread } from "queries/discussions";
import ErrorMessageList from "components/error/ErrorMessageList";

function DiscussionEditor() {
	const { user } = useAuth();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [mutate, { isLoading, error, isSuccess }] = useCreateThread();

	const onCreate = async () => {
		await mutate({ title, body });
	};

	useEffect(() => {
		if (isSuccess) {
			setTitle("");
			setBody("");
		}
	}, [isSuccess]);

	return (
		<div>
			<div className="flex items-center input-flex">
				<div className="flex-none mr-2">
					<Avatar size={8} user={user} />
				</div>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="flex-grow w-full mr-2"
					type="text"
					placeholder="Share something, ask a question, get feedback..."
				/>
			</div>
			{title.length > 0 && (
				<div>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						onKeyDown={(e) => onCmdEnter(e, onCreate)}
						rows={4}
						className="w-full h-32 mt-2"
						placeholder="Write away..."
					/>
					{error && (
						<div className="mt-2">
							<ErrorMessageList error={error} />
						</div>
					)}
					<div className="flex flex-row w-full mt-4">
						<div className="flex-none">
							<MarkdownEnabled />
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
				</div>
			)}
		</div>
	);
}

export default DiscussionEditor;
