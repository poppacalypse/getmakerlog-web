import Button from "components/ui/Button";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { useMyProducts } from "queries/products";
import React from "react";
import { useAuth } from "stores/AuthStore";
import orderBy from "lodash/orderBy";
import Card from "components/ui/Card";
import ProductMedia from "components/products/ProductMedia";

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
			<h3 className="font-bold">Your Products</h3>
			{isLoading && <Spinner text="Loading your products..." />}
			{error && (
				<ErrorCard
					message={error.message}
					actions={<Button onClick={refetch}>Retry</Button>}
				/>
			)}
			{products && (
				<Card className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
					<Card.Content className="space-y-2">
						{orderBy(products, "created_at").map((product) => (
							<ProductMedia
								product={product}
								key={product.slug}
							/>
						))}
					</Card.Content>
				</Card>
			)}
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
