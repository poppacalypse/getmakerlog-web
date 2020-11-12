import React from "react";
import Container from "components/ui/Container";
import { makeQueryCache } from "react-query";
import {
	COMMON_TAGS,
	getFeatured,
	getTags,
	STORY_QUERIES,
	useFeatured,
	useTags,
} from "queries/stories";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { dehydrate } from "react-query/hydration";
import PostMedia from "components/stories/PostMedia";
import PostGrid from "components/stories/PostGrid";

function StoriesPage() {
	const {
		isLoading: isLoadingFeatured,
		data: featured,
		error: errorFeatured,
	} = useFeatured();

	const { data: interviews, error: errorInterviews } = useTags(
		COMMON_TAGS.interviews,
		3
	);

	const { data: news, error: errorNews } = useTags(COMMON_TAGS.news, 3);
	const { data: culture, error: errorCulture } = useTags(
		COMMON_TAGS.culture,
		3
	);

	const error = errorFeatured || errorInterviews || errorCulture || errorNews;

	if (isLoadingFeatured) return <Spinner text="Loading stories..." />;

	if (error) {
		return <ErrorCard />;
	}

	return (
		<div>
			<div className="py-4 border-b border-gray-200">
				<Container>
					<PostMedia featured post={featured[0]} />
				</Container>
			</div>
			<Container>
				<div className="pt-16 pb-12">
					<div className="mb-12">
						<center>
							<h1>Interviews</h1>
							<h3 className="mb-4 text-gray-700">
								Every two weeks we bring on makers from all over
								the world to share their stories.
							</h3>
							<a>Read all &raquo;</a>
						</center>
					</div>

					<PostGrid posts={interviews} />
				</div>
				<div className="pt-12 pb-12">
					<div className="mb-12">
						<center>
							<h1>News</h1>
							<h3 className="mb-4 text-gray-700">
								The latest happenings in the maker community.
							</h3>
							<a>Read all &raquo;</a>
						</center>
					</div>
					<PostGrid posts={news} />
				</div>
				<div className="pt-12 pb-12">
					<div className="mb-12">
						<center>
							<h1>Culture</h1>
							<h3 className="mb-4 text-gray-700">
								Anything maker-culture related.
							</h3>
							<a>Read all &raquo;</a>
						</center>
					</div>
					<PostGrid posts={culture} />
				</div>
			</Container>
		</div>
	);
}

StoriesPage.getInitialProps = async () => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[STORY_QUERIES.getFeatured, { limit: 1 }],
		getFeatured
	);

	await queryCache.prefetchQuery(
		[
			STORY_QUERIES.getTags,
			{
				tags: COMMON_TAGS.interviews,
				limit: 3,
				filters: [],
			},
		],
		getTags
	);

	await queryCache.prefetchQuery(
		[
			STORY_QUERIES.getTags,
			{
				tags: COMMON_TAGS.news,
				limit: 3,
				filters: [],
			},
		],
		getTags
	);

	await queryCache.prefetchQuery(
		[
			STORY_QUERIES.getTags,
			{
				tags: COMMON_TAGS.culture,
				limit: 3,
				filters: [],
			},
		],
		getTags
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			contained: false,
			bgClassName: "bg-white",
		},
	};
};

export default StoriesPage;