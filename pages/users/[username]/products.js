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
import Container from "components/ui/Container";
import ProfileHeader from "components/users/ProfileHeader";
import ProductMedia from "components/products/ProductMedia";
import Card from "components/ui/Card";
import ActiveLink from "components/router/ActiveLink";

function ProfileProductsPage() {
	const router = useRouter();
	const { username } = router.query;
	const { isLoading, data: user, error } = useUser(username);
	const {
		isLoading: isLoadingProducts,
		data: products,
		error: productsError,
	} = useUserProducts(username);

	if (error || productsError) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	if (isLoading || isLoadingProducts)
		return <Spinner text="Loading user..." />;

	return (
		<div>
			<ProfileHeader
				user={user}
				products={products}
				bottomNav={
					<div className="flex flex-row items-center justify-center flex-grow h-full sm:flex-none">
						<ActiveLink
							route="profile"
							params={{ username: user.username }}
							activeClassName="text-green-500 border-b-2 border-green-500"
						>
							<a className="flex items-center justify-center flex-1 h-full px-6 py-4 pt-2 font-semibold text-center text-gray-500">
								Feed
							</a>
						</ActiveLink>
						<ActiveLink
							route="profile-products"
							params={{ username: user.username }}
							activeClassName="text-green-500 border-b-2 border-green-500"
						>
							<a className="flex items-center justify-center flex-1 h-full px-6 py-4 pt-2 font-semibold text-center text-gray-500">
								Products
							</a>
						</ActiveLink>
						<div className="flex items-center justify-center flex-1 h-full px-6 py-4 pt-2 font-semibold text-center text-gray-500">
							Discussions
						</div>
					</div>
				}
			/>

			<Container className="py-4">
				<NarrowLayout>
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
				</NarrowLayout>
			</Container>
		</div>
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

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			allowGuest: true,
			contained: false,
		},
	};
};

export default ProfileProductsPage;
