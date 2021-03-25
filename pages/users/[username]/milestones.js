import React from "react";
import { QueryClient } from "react-query";
import { getUser, USER_QUERIES, useUser } from "queries/users";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import Spinner from "components/ui/Spinner";
import ErrorCard from "components/ui/ErrorCard";
import Card from "components/ui/Card";
import ProfileMenu from "components/users/ProfileMenu";
import { getUserStats, STATS_QUERIES } from "queries/stats";
import ProfileLayout from "components/users/ProfileLayout";
import { getErrorResponse } from "utils/error";
import {
	getUserMilestones,
	MILESTONE_QUERIES,
	useUserMilestones,
} from "queries/milestones";
import MilestoneLine from "components/milestones/MilestoneLine";

function ProfileMilestonesPage() {
	const router = useRouter();
	const { username } = router.query;
	const { isLoading, data: user, error } = useUser(username);
	const {
		isLoading: isLoadingMilestones,
		data: milestones,
		error: errorMilestones,
	} = useUserMilestones(username);

	const err = error || errorMilestones;
	if (err) {
		return <ErrorCard statusCode={err.intCode ? err.intCode() : 400} />;
	}

	if (isLoading || isLoadingMilestones)
		return <Spinner text="Loading user..." />;

	return (
		<ProfileLayout
			user={user}
			headerProps={{
				bottomNav: <ProfileMenu user={user} />,
			}}
		>
			<Card>
				<Card.Content>
					<div className="space-y-2">
						{milestones.map((milestone) => (
							<MilestoneLine
								key={milestone.slug}
								milestone={milestone}
							/>
						))}
					</div>
				</Card.Content>
			</Card>
		</ProfileLayout>
	);
}

ProfileMilestonesPage.getInitialProps = async ({
	res,
	query: { username },
}) => {
	const queryClient = new QueryClient();

	try {
		await queryClient.prefetchQuery(
			[USER_QUERIES.getUser, { username }],
			getUser,
			{},
			{ throwOnError: true }
		);

		await queryClient.prefetchQuery(
			[STATS_QUERIES.getUserStats, { username }],
			getUserStats
		);

		await queryClient.prefetchQuery(
			[MILESTONE_QUERIES.getUserStats, { username }],
			getUserMilestones
		);

		return {
			dehydratedState: dehydrate(queryClient),
			layout: {
				allowGuest: true,
				contained: false,
			},
		};
	} catch (e) {
		return getErrorResponse(e, res);
	}
};

export default ProfileMilestonesPage;
