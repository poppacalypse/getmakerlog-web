import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLatestDiscussions } from "queries/discussions";
import Button from "components/ui/Button";
import { extractResultsFromGroups } from "utils/random";
import orderBy from "lodash/orderBy";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import Discussion from "components/discussions/Discussion";

function LatestDiscussions() {
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
	);
}

export default LatestDiscussions;
