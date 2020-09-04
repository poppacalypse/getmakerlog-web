import React from "react";
import {
	useThread,
	getThread,
	DISCUSSION_QUERIES,
	useThreadReplies,
	useCreateThreadReply,
} from "queries/discussions";
import { useRouter } from "next/router";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import Discussion from "components/discussions/Discussion";
import { Link } from "routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/ui/Card";
import UserLine from "components/ui/UserLine";
import { useAuth } from "stores/AuthStore";
import Form from "components/ui/Form";
import Button from "components/ui/Button";
import OutboundLink from "components/seo/OutboundLink";
import orderBy from "lodash/orderBy";
import { useState } from "react";
import { useEffect } from "react";
import ErrorMessageList from "components/error/ErrorMessageList";
import { onCmdEnter } from "utils/random";

function ThreadReplyForm({ thread, parentReply = null }) {
	const { user, isLoggedIn } = useAuth();
	const [body, setBody] = useState("");
	const [mutate, { isLoading, error, isSuccess }] = useCreateThreadReply();

	const onCreate = async () => {
		await mutate({ slug: thread.slug, body, parentReply });
	};

	useEffect(() => {
		if (isSuccess) setBody("");
	}, [isSuccess]);

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
		<Card>
			<Card.Content>
				<Form>
					<div className="mb-2">
						<UserLine user={user} />
					</div>

					<Form.Controls>
						<Form.Field span={6}>
							<textarea
								value={body}
								onChange={(e) => setBody(e.target.value)}
								onKeyDown={(e) =>
									onCmdEnter(e, () => onCreate())
								}
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
									<FontAwesomeIcon
										icon={["fab", "markdown"]}
									/>{" "}
									Markdown is enabled.
								</OutboundLink>
							</small>
						</div>
						<div className="flex-grow"></div>
						<div className="flex-none">
							<Button
								primary
								loading={isLoading}
								onClick={onCreate}
							>
								Post
							</Button>
						</div>
					</div>
				</Form>
			</Card.Content>
		</Card>
	);
}

function Reply({ reply, child, childrenReplies, thread }) {
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

function ThreadReplies({ thread }) {
	const { isLoading, data, error, refetch } = useThreadReplies(thread.slug);

	if (error) {
		return (
			<ErrorCard
				message="Failed to load replies."
				actions={<Button onClick={refetch}>Retry</Button>}
			/>
		);
	}

	if (isLoading) {
		return (
			<Card>
				<Card.Content>
					<Spinner text="Loading replies..." />
				</Card.Content>
			</Card>
		);
	}

	let replies = orderBy(data, ["praise", "created_at"], ["desc", "desc"]);

	return (
		<Card>
			<Card.Content>
				{data.length === 0 && (
					<small className="text-gray-500">
						No replies yet. Start the conversation!
					</small>
				)}
				{replies
					.filter((r) => r.parent_reply === null)
					.map((reply) => (
						<Reply
							key={reply.id}
							childrenReplies={replies.filter(
								(r) => r.parent_reply === reply.id
							)}
							reply={reply}
							thread={thread}
						/>
					))}
			</Card.Content>
		</Card>
	);
}

function DiscussionThreadPage() {
	const router = useRouter();
	const { slug } = router.query;
	const { isLoading, data, error } = useThread(slug);

	if (isLoading) return <Spinner text="Loading discussion..." />;

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	return (
		<div>
			<div className="flex flex-row w-full mb-2 text-sm">
				<Link route="discussions">
					<a>← Discussions</a>
				</Link>
			</div>
			<div className="mb-4">
				<Discussion full withActionBar={false} thread={data} />
			</div>
			<div>
				<ThreadReplyForm thread={data} />
			</div>
			<div className="mt-4">
				<h4 className="mb-2 font-semibold text-gray-700">
					{data.reply_count} replies
				</h4>
				<ThreadReplies thread={data} />
			</div>
		</div>
	);
}

DiscussionThreadPage.getInitialProps = async ({ query: { slug } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[DISCUSSION_QUERIES.getThread, { slug }],
		getThread
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			layout: "app",
			allowGuest: true,
		},
	};
};

export default DiscussionThreadPage;
