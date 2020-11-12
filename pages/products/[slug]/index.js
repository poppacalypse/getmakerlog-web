import Container from "components/ui/Container";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { useRouter } from "next/router";
import { getProduct, PRODUCT_QUERIES, useProduct } from "queries/products";
import React from "react";
import { makeQueryCache } from "react-query";
import NarrowLayout from "layouts/NarrowLayout";
import ProductSidebar from "components/sidebars/ProductSidebar";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import ProductHeader from "components/products/ProductHeader";
import { NextSeo } from "next-seo";
import config from "config";
import { dehydrate } from "react-query/hydration";

function ProductPage() {
	const router = useRouter();
	const { slug } = router.query;

	const { isLoading, data: product, error } = useProduct(slug);

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	if (isLoading) return <Spinner text="Loading product..." />;

	return (
		<div>
			<ProductHeader product={product} />

			<Container className="py-4">
				<NarrowLayout
					leftSidebar={<ProductSidebar product={product} left />}
					rightSidebar={
						<ProductSidebar product={product} left={false} />
					}
				>
					<KeyActivityFeed userId={product.id} feed="product" />
				</NarrowLayout>
			</Container>

			<NextSeo
				title={product.name}
				description={`${product.name} is built publicly on Makerlog, a community of makers building products together.`}
				canonical={`${config.BASE_URL}/products/${product.slug}`}
				openGraph={{
					images: [
						{
							url: product.icon,
						},
					],
				}}
				twitter={{ cardType: "summary" }}
			/>
		</div>
	);
}

ProductPage.getInitialProps = async ({ query: { slug } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[PRODUCT_QUERIES.getProduct, { slug }],
		getProduct
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			contained: false,
		},
	};
};

export default ProductPage;
