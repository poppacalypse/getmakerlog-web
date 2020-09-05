import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLatestThreads } from "queries/discussions";
import Button from "components/ui/Button";
import { extractResultsFromGroups } from "utils/random";
import orderBy from "lodash/orderBy";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import Thread from "components/discussions/Thread";
import { threadsSchema } from "schemas/discussions";

function LatestThreads() {
	const {
		error,
		data,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useLatestThreads();

	const { errors, value } = threadsSchema.validate(
		orderBy(extractResultsFromGroups(data), "created_at", "desc")
	);

	const discussions = value;

	if (errors) return null;

	return (
		<InfiniteScroll
			dataLength={discussions.length}
			next={() => fetchMore()}
			hasMore={canFetchMore !== null}
			style={{ overflow: "none" }}
			//key={isServer}
		>
			{discussions.map((d) => (
				<Thread key={d.slug} thread={d} />
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

export default LatestThreads;
