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
import ProductMedia from "components/products/ProductMedia";
import Card from "components/ui/Card";
import ProfileMenu from "components/users/ProfileMenu";
import { getUserStats, STATS_QUERIES } from "queries/stats";
import ProfileLayout from "components/users/ProfileLayout";

function ProfileProductsPage() {
	const router = useRouter();
	const { username } = router.query;
	const { isLoading, data: user, error } = useUser(username);
	const {
		isLoading: isLoadingProducts,
		data: products,
		error: productsError,
	} = useUserProducts(username);

	const err = error || productsError;
	if (err) {
		return <ErrorCard statusCode={err.intCode ? err.intCode() : 400} />;
	}

	if (isLoading || isLoadingProducts)
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
						{products.map((product) => (
							<ProductMedia
								key={product.slug}
								product={product}
							/>
						))}
					</div>
				</Card.Content>
			</Card>
		</ProfileLayout>
	);
}

ProfileProductsPage.getInitialProps = async ({ query: { username } }) => {
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

export default ProfileProductsPage;
