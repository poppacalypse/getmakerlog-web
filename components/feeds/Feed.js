import Button from "components/ui/Button";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { useFeed } from "queries/feeds";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "stores/AuthStore";
import { sortStreamByActivity } from "utils/feeds";
import { extractResultsFromGroups } from "utils/random";
import FeedSection from "./FeedSection";

function ErrorFallback({ componentStack }) {
	return <ErrorCard trace={componentStack} />;
}

export default function Feed({ indexUrl = "/feeds/world/", live = true }) {
	const { user, token } = useAuth();
	const {
		fetchMore,
		isFetchingMore,
		isFetching,
		canFetchMore,
		data,
		error,
	} = useFeed(indexUrl, live, token);
	const extractedData = extractResultsFromGroups(data);
	const grouped = sortStreamByActivity(
		extractedData,
		user ? user.timezone : null
	);

	if (extractedData.length === 0 && !canFetchMore && !isFetching) {
		return <div>No activity here.</div>;
	}

	return (
		<InfiniteScroll
			dataLength={data ? data.length : 0}
			next={() => fetchMore()}
			hasMore={canFetchMore}
			style={{ overflow: "none" }}
			//key={isServer}
		>
			<div id="ActivityFeed" className="ActivityFeed">
				{error && (
					<ErrorCard
						message="Failed to load the feed."
						actions={
							<Button
								primary
								loading={isFetchingMore}
								onClick={() => fetchMore()}
							>
								Retry
							</Button>
						}
					/>
				)}

				<ErrorBoundary FallbackComponent={ErrorFallback}>
					{Object.keys(grouped).map((key) => (
						<FeedSection
							key={JSON.stringify(key)}
							date={key}
							activities={grouped[key]}
						/>
					))}
				</ErrorBoundary>

				{canFetchMore && (
					<center>
						<Button
							loading={isFetchingMore || isFetching}
							onClick={() => fetchMore()}
						>
							Load more activity...
						</Button>
					</center>
				)}
				{!canFetchMore && (isFetchingMore || isFetching) && (
					<div className={"center ActivityFeed--section"}>
						<Spinner text="Loading the makerness..." />
					</div>
				)}
				{!canFetchMore && !(isFetchingMore || isFetching) && !error && (
					<center className="text-xs text-gray-400 ActivityFeed--section">
						That's all.
					</center>
				)}
			</div>
		</InfiniteScroll>
	);
}
