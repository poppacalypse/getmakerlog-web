import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLatestDiscussions, useThreadRepliers } from "queries/discussions";
import Button from "components/ui/Button";
import { extractResultsFromGroups } from "utils/random";
import orderBy from "lodash/orderBy";
import truncate from "lodash/truncate";
import Card from "components/ui/Card";
import AppLayout from "layouts/AppLayout";
import StickyNav from "components/ui/StickyNav";
import UserLine from "components/ui/UserLine";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaceStack from "components/ui/FaceStack";
import ActiveLink from "components/router/ActiveLink";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";

function ThreadReplyFaces({ size = 4, threadSlug }) {
	const { data } = useThreadRepliers(threadSlug);
	if (!data) return null;
	return <FaceStack size={size} users={data.slice(0, 5)} />;
}

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
									className={thread.reply_count > 0 && "ml-2"}
								>
									<ThreadReplyFaces
										threadSlug={thread.slug}
									/>
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

function DiscussionsPage() {
	const {
		error,
		data,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useLatestDiscussions();

	const discussions = orderBy(
		extractResultsFromGroups(data),
		"created_at",
		"desc"
	);

	return (
		<AppLayout.WithTopBar
			topBar={
				<StickyNav sticky={false}>
					<div className="flex flex-row items-center">
						<h2 className="font-bold">Discussions</h2>
						<div className="flex-grow"></div>
						<div>
							<Button secondary>New discussion</Button>
						</div>
					</div>
				</StickyNav>
			}
		>
			<InfiniteScroll
				dataLength={discussions.length}
				next={() => fetchMore()}
				hasMore={canFetchMore !== null}
				style={{ overflow: "none" }}
				//key={isServer}
			>
				{discussions.map((d) => (
					<Discussion key={d.slug} thread={d} />
				))}

				{canFetchMore && discussions.length > 0 && (
					<center>
						<Button
							loading={isFetching || isFetchingMore}
							onClick={() => fetchMore()}
						>
							Load more activity...
						</Button>
					</center>
				)}
				{isFetching && !isFetchingMore && (
					<div className={"center ActivityFeed--section"}>
						<Spinner text="Loading the makerness..." />
					</div>
				)}

				{error && (
					<ErrorCard
						message="Failed to load the feed."
						actions={
							<Button
								primary
								loading={isFetching || isFetchingMore}
								onClick={() => fetchMore()}
							>
								Retry
							</Button>
						}
					/>
				)}
			</InfiniteScroll>
		</AppLayout.WithTopBar>
	);
}

DiscussionsPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
			contained: false,
		},
	};
};

export default DiscussionsPage;
