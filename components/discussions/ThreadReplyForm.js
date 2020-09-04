import React from "react";
import { useCreateThreadReply } from "queries/discussions";
import ErrorCard from "components/ui/ErrorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserLine from "components/ui/UserLine";
import { useAuth } from "stores/AuthStore";
import Form from "components/ui/Form";
import Button from "components/ui/Button";
import OutboundLink from "components/seo/OutboundLink";
import { useState } from "react";
import { useEffect } from "react";
import ErrorMessageList from "components/error/ErrorMessageList";
import { onCmdEnter } from "utils/random";
import { usePrevious } from "utils/hooks";

function ThreadReplyForm({
	thread,
	replyingTo = null,
	parentReply = null,
	onFinish = () => {},
}) {
	const { user, isLoggedIn } = useAuth();
	const [body, setBody] = useState("");
	const [mutate, { isLoading, error, isSuccess }] = useCreateThreadReply();
	const prevReplyingTo = usePrevious(replyingTo);

	const onCreate = async () => {
		await mutate({
			slug: thread.slug,
			body,
			parentReply: parentReply ? parentReply.id : null,
		});
		onFinish();
	};

	useEffect(() => {
		if (isSuccess) setBody("");
	}, [isSuccess]);

	useEffect(() => {
		if (!prevReplyingTo && replyingTo)
			setBody(`@${replyingTo.username} ${body}`);
	}, [prevReplyingTo, body, replyingTo]);

	if (!isLoggedIn) {
		// TODO: Make a dedicated marketing component for this case
		return (
			<ErrorCard
				title="Join the conversation"
				message="Sign in to post a reply and interact with thousands of makers."
				statusCode={403}
				nyan={false}
			/>
		);
	}

	return (
		<Form>
			<div className="mb-2">
				<UserLine user={user} />
			</div>

			<Form.Controls>
				<Form.Field span={6}>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						onKeyDown={(e) => onCmdEnter(e, () => onCreate())}
						className="h-32 mb-4"
						placeholder="Say something nice..."
					></textarea>
				</Form.Field>
			</Form.Controls>

			{error && <ErrorMessageList error={error} />}

			<div className="flex flex-row items-center w-full">
				<div className="flex-none">
					<small>
						<OutboundLink
							className="text-gray-500"
							icon
							to="https://www.markdowntutorial.com/"
						>
							<FontAwesomeIcon icon={["fab", "markdown"]} />{" "}
							Markdown is enabled.
						</OutboundLink>
					</small>
				</div>
				<div className="flex-grow"></div>
				<div className="flex-none">
					<Button primary loading={isLoading} onClick={onCreate}>
						Post
					</Button>
				</div>
			</div>
		</Form>
	);
}

export default ThreadReplyForm;
