import ProductIcon from "components/products/ProductIcon";
import OutboundLink from "components/seo/OutboundLink";
import Container from "components/ui/Container";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { useRouter } from "next/router";
import { getProduct, PRODUCT_QUERIES, useProduct } from "queries/products";
import React from "react";
import normalizeUrl from "normalize-url";
import { makeQueryCache } from "react-query";
import TimeAgo from "react-timeago";
import NarrowLayout from "layouts/NarrowLayout";
import ProductSidebar from "components/sidebars/ProductSidebar";
import KeyActivityFeed from "components/stream/KeyActivityFeed";

function ProductPage() {
	const router = useRouter();
	const { slug } = router.query;

	const { isLoading, data: product, error } = useProduct(slug);

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	if (isLoading) return <Spinner text="Loading product..." />;

	const makerCount = 1 + product.team.length;

	return (
		<div>
			<div className="bg-white border-b border-gray-200">
				<div
					className="h-32"
					style={{ backgroundColor: product.accent }}
				></div>
				<Container>
					<div className="flex flex-row p-4 space-x-4">
						<div>
							<ProductIcon product={product} size={16} />
						</div>
						<div>
							<div className="mb-2 sm:max-w-lg last:mb-0">
								<h2 className="text-xl font-bold text-gray-900 sm:truncate">
									{product.name}
								</h2>
								{product.description ? (
									<p>{product.description}</p>
								) : null}
							</div>
							<div className="flex text-sm text-gray-500 space-x-4">
								{product.website ? (
									<OutboundLink
										icon
										to={normalizeUrl(product.website)}
									>
										Website
									</OutboundLink>
								) : null}
								{makerCount > 1 && (
									<small>{makerCount} makers</small>
								)}
								{product.launched_at ? (
									<small>
										Launched{" "}
										<TimeAgo date={product.launched_at} />
									</small>
								) : null}
							</div>
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-4">
				<NarrowLayout
					leftSidebar={<ProductSidebar product={product} left />}
					rightSidebar={
						<ProductSidebar product={product} left={false} />
					}
				>
					<KeyActivityFeed
						userId={`product_${product.id}`}
						feed="product"
					/>
				</NarrowLayout>
			</Container>
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
		layout: {
			contained: false,
		},
	};
};

export default ProductPage;
