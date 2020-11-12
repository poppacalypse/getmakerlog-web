import PostList from "components/stories/PostList";
import ErrorCard from "components/ui/ErrorCard";
import PlaceholderState from "components/ui/PlaceholderState";
import Spinner from "components/ui/Spinner";
import { useRouter } from "next/router";
import { COMMON_TAGS, getTags, STORY_QUERIES, useTags } from "queries/stories";
import React from "react";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";

function StoriesTagPage() {
	const {
		query: { slug },
	} = useRouter();
	const { isLoading, data: posts, error } = useTags(
		slug === "interviews" ? COMMON_TAGS.interviews : [slug],
		"all"
	);

	return (
		<div>
			<h1 className="mb-4">Posts tagged "{slug}"</h1>
			{isLoading && (
				<PlaceholderState>
					<Spinner text="Loading posts..." small />
				</PlaceholderState>
			)}
			{posts && <PostList posts={posts} />}
			{error && <ErrorCard />}
		</div>
	);
}

StoriesTagPage.getInitialProps = async ({ query: { slug } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[
			STORY_QUERIES.getTags,
			{
				tags: slug === "interviews" ? COMMON_TAGS.interviews : [slug],
				limit: "all",
			},
		],
		getTags
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			bgClassName: "bg-white",
		},
	};
};

export default StoriesTagPage;
