import OutboundLink from "components/seo/OutboundLink";
import Container from "components/ui/Container";
import normalizeUrl from "normalize-url";
import React from "react";
import ProductIcon from "./ProductIcon";
import TimeAgo from "react-timeago";

function ProductHeader({ product, bottomNav = null, halfWidth = false }) {
	const makerCount = 1 + product.team.length;

	return (
		<div className="bg-white border-b border-gray-200">
			<div
				className={`object-cover w-full ${halfWidth ? "h-16" : "h-32"}`}
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
				{bottomNav}
			</Container>
		</div>
	);
}

export default ProductHeader;
