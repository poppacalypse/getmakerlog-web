import { useProductMakers } from "queries/products";
import React from "react";
import SocialsCard from "./SocialsCard";
import SidebarItem from "./SidebarItem";
import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";
import UserMedia from "components/ui/UserMedia";

function MakersCard({ product }) {
	const { isLoading, data, error } = useProductMakers(product.slug);

	if (!product || error) return null;

	return (
		<SidebarItem title="Makers">
			<Card>
				<Card.Content>
					{isLoading && <Spinner text="Loading makers..." small />}
					{data && data.length > 0 && (
						<div className="space-y-2">
							{data.map((user) => (
								<UserMedia
									extraStreakText={false}
									key={user.id}
									user={user}
								/>
							))}
						</div>
					)}
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}

export default function ProductSidebar({ product, left = false }) {
	// TODO: Implement feed filtering so the left sidebar is filter controls only.
	return (
		<div>
			{left && (
				<>
					<SocialsCard object={product} />
				</>
			)}
			{!left && (
				<>
					<MakersCard product={product} />
				</>
			)}
		</div>
	);
}
