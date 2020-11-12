import Button from "components/ui/Button";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { useMyProducts } from "queries/products";
import React from "react";
import { useAuth } from "stores/AuthStore";
import orderBy from "lodash/orderBy";
import Card from "components/ui/Card";
import PageHeader from "components/ui/PageHeader";
import { Link } from "routes";
import ProductCard from "components/products/ProductCard";
import { NextSeo } from "next-seo";

/*
Grid layout:
<ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
*/

function MyProductsList() {
	const { isLoggedIn } = useAuth();
	const { isLoading, data: products, error, refetch } = useMyProducts();

	if (!isLoggedIn) return null;

	return (
		<div>
			<PageHeader>
				<h2 className="flex-grow font-bold">Your Products</h2>
				<div>
					<Link route="products-create">
						<Button secondary>Add product</Button>
					</Link>
				</div>
			</PageHeader>
			{isLoading && <Spinner text="Loading your products..." />}
			{error && (
				<ErrorCard
					message={error.message}
					actions={<Button onClick={refetch}>Retry</Button>}
				/>
			)}
			{products && (
				<Card>
					<Card.Content className="space-y-2">
						<ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{orderBy(products, "created_at").map((product) => (
								<li key={product.slug}>
									<ProductCard product={product} />
								</li>
							))}
						</ul>
					</Card.Content>
				</Card>
			)}

			<NextSeo
				title="Products"
				description="Discover the world's largest community of software products built in public."
			/>
		</div>
	);
}

function ProductsPage() {
	return (
		<div>
			<MyProductsList />
		</div>
	);
}

export default ProductsPage;
