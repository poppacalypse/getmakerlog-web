import OutboundLink from "components/seo/OutboundLink";
import Card from "components/ui/Card";
import React from "react";
import SidebarItem from "./SidebarItem";
import normalizeUrl from "normalize-url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductMedia from "components/products/ProductMedia";
import orderBy from "lodash/orderBy";
import UserHeatmap from "components/stats/UserHeatmap";

function AboutCard({ user }) {
	if (
		!user ||
		(!user.website &&
			!user.twitter_handle &&
			!user.github_handle &&
			!user.telegram_handle &&
			!user.bmc_handle)
	)
		return null;

	return (
		<SidebarItem title={`Links`}>
			<Card>
				<Card.Content>
					{user.website && (
						<div className="text-xs">
							<OutboundLink to={normalizeUrl(user.website)}>
								<FontAwesomeIcon icon="globe" />{" "}
								{normalizeUrl(user.website)
									.replace("http://", "")
									.replace("https://", "")}
							</OutboundLink>
						</div>
					)}
					{user.twitter_handle && (
						<div className="text-xs">
							<OutboundLink
								to={`https://twitter.com/${user.twitter_handle}`}
							>
								<FontAwesomeIcon icon={["fab", "twitter"]} />{" "}
								{user.twitter_handle}
							</OutboundLink>
						</div>
					)}

					{user.github_handle && (
						<div className="text-xs">
							<OutboundLink
								to={`https://github.com/${user.github_handle}`}
							>
								<FontAwesomeIcon icon={["fab", "github"]} />{" "}
								{user.github_handle}
							</OutboundLink>
						</div>
					)}

					{user.bmc_handle && (
						<div className="text-xs">
							<OutboundLink
								to={`https://buymeacoffee.com/${user.bmc_handle}`}
							>
								<FontAwesomeIcon icon={"mug-hot"} />{" "}
								{user.bmc_handle}
							</OutboundLink>
						</div>
					)}

					{user.telegram_handle && (
						<div className="text-xs">
							<OutboundLink
								to={`https://t.me/${user.telegram_handle}`}
							>
								<FontAwesomeIcon icon={["fab", "telegram"]} />{" "}
								{user.telegram_handle}
							</OutboundLink>
						</div>
					)}
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}

function ProductsCard({ products }) {
	if (!products) return null;

	return (
		<SidebarItem title="Products made">
			<Card>
				<Card.Content>
					{orderBy(products, "created_at", "asc").map((product) => (
						<div className="mb-2 last:mb-0" key={product.slug}>
							<ProductMedia product={product} />
						</div>
					))}
					{products.length === 0 && (
						<div className="text-sm text-center text-gray-500">
							This maker has no products yet.
						</div>
					)}
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}

function HeatmapCard({ user }) {
	if (!user) return null;

	return (
		<SidebarItem title="Activity graph">
			<Card>
				<Card.Content>
					<UserHeatmap user={user} />
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}

export default function ProfileSidebar({
	user,
	products = null,
	left = false,
}) {
	// TODO: Implement feed filtering so the left sidebar is filter controls only.
	return (
		<div>
			{left && (
				<>
					<AboutCard user={user} />
					<HeatmapCard user={user} />
				</>
			)}
			{!left && <ProductsCard products={products} />}
		</div>
	);
}
