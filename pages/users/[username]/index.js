import React from "react";
import { makeQueryCache } from "react-query";
import {
	getUser,
	getUserProducts,
	USER_QUERIES,
	useUser,
	useUserProducts,
} from "queries/users";
import { dehydrate } from "react-query/dist/hydration/react-query-hydration.development";
import { useRouter } from "next/router";
import Spinner from "components/ui/Spinner";
import ErrorCard from "components/ui/ErrorCard";
import NarrowLayout from "layouts/NarrowLayout";
import ProfileSidebar from "components/sidebars/ProfileSidebar";
import Container from "components/ui/Container";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import ProfileHeader from "components/users/ProfileHeader";
import ProfileMenu from "components/users/ProfileMenu";
import { getUserStats, STATS_QUERIES, useUserStats } from "queries/stats";

// TODO: make sure profiles only work if it's at the last of the routing stack
// TODO: make sure they throw 404 for user not found cause fuck bitches

function ProfilePage() {
	const router = useRouter();
	const { username } = router.query;
	const { isLoading, data: user, error } = useUser(username);
	const {
		isLoading: isLoadingProducts,
		data: products,
		error: productsError,
	} = useUserProducts(username);
	const {
		isLoading: isLoadingStats,
		data: stats,
		error: statsError,
	} = useUserStats(username);

	if (error || productsError || statsError) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	if (isLoading || isLoadingProducts || isLoadingStats)
		return <Spinner text="Loading user..." />;

	return (
		<div>
			<ProfileHeader
				user={user}
				stats={stats}
				bottomNav={<ProfileMenu user={user} />}
			/>

			<Container className="py-4">
				<NarrowLayout
					leftSidebar={
						<ProfileSidebar left user={user} products={products} />
					}
					rightSidebar={
						<ProfileSidebar user={user} products={products} />
					}
				>
					<KeyActivityFeed userId={user.id} feed={"user"} />
				</NarrowLayout>
			</Container>
		</div>
	);
}

ProfilePage.getInitialProps = async ({ query: { username } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[USER_QUERIES.getUser, { username }],
		getUser
	);

	await queryCache.prefetchQuery(
		[USER_QUERIES.getUserProducts, { username }],
		getUserProducts
	);

	await queryCache.prefetchQuery(
		[STATS_QUERIES.getUserStats, { username }],
		getUserStats
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			allowGuest: true,
			contained: false,
		},
	};
};

export default ProfilePage;
