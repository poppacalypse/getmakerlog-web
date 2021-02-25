import FollowButton from "components/follows/FollowButton";
import MilestoneComments from "components/milestones/MilestoneComments";
import MilestonesTextRenderer from "components/milestones/MilestonesTextRenderer";
import ProductMedia from "components/products/ProductMedia";
import Container from "components/ui/Container";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import UserMedia from "components/ui/UserMedia";
import NarrowLayout from "layouts/NarrowLayout";
import {
	getMilestone,
	MILESTONE_QUERIES,
	useMilestone,
} from "queries/milestones";
import React from "react";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Router, useRouter } from "routes";
import { getErrorResponse } from "utils/error";
import TimeAgo from "react-timeago";
import MilestoneActions from "components/milestones/MilestoneActions";

function MilestonePage() {
	const {
		query: { slug },
	} = useRouter();
	const { isLoading, data: milestone, error } = useMilestone(slug);

	if (isLoading) return <Spinner text="Loading milestone..." />;

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	return (
		<div>
			<div className="py-12 bg-white">
				<Container>
					<div className="flex flex-col md:flex-row">
						<div className="flex-grow">
							<div className="sticky top-10 md:space-y-8">
								<div>
									<p className="hidden heading md:block">
										About
									</p>
									<UserMedia
										descriptive
										user={milestone.user}
									/>
								</div>

								{milestone.product && (
									<div className="hidden md:block">
										<p className="heading">Product</p>
										<ProductMedia
											product={milestone.product}
										/>
									</div>
								)}

								<div>
									<p className="hidden heading md:block">
										Follow their journey
									</p>
									<div className="flex flex-row items-center mt-2 space-x-2">
										<FollowButton
											buttonProps={{ xs: true }}
											user={milestone.user}
										/>
										<span className="text-xs text-gray-500">
											{milestone.user.follower_count}{" "}
											followers
										</span>
									</div>
								</div>
							</div>
						</div>
						<div
							className={`w-full max-w-full mx-0 md:mx-4 md:max-w-4xl mt-8 md:mt-0`}
						>
							<p className="heading">
								🏆 Milestone #{milestone.id} ·{" "}
								<TimeAgo date={milestone.created_at} />
							</p>
							<h1 className="mb-2 font-bold text-gray-900">
								{milestone.title}
							</h1>
							<MilestonesTextRenderer
								milestone={milestone}
								className="lg:prose-lg prose prose-green dark:prose-dark"
							/>
							<hr className="my-4" />
							<MilestoneActions
								stream
								milestone={milestone}
								onDelete={() => {
									Router.pushRoute("index");
								}}
							/>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

MilestonePage.getInitialProps = async ({ res, query: { slug } }) => {
	const queryCache = makeQueryCache();

	try {
		await queryCache.prefetchQuery(
			[MILESTONE_QUERIES.getMilestone, { slug }],
			getMilestone,
			{},
			{
				throwOnError: true,
			}
		);

		return {
			dehydratedState: dehydrate(queryCache),
			layout: {
				contained: false,
				bgClassName: "bg-white",
			},
		};
	} catch (e) {
		return getErrorResponse(e, res);
	}
};

export default MilestonePage;
