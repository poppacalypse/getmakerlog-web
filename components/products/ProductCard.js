import ProductIcon from "components/products/ProductIcon";
import Card from "components/ui/Card";
import React from "react";
import truncate from "lodash/truncate";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductCard({ product }) {
	const { user } = useAuth();

	return (
		<Card>
			<div
				className="h-16 rounded-t-md"
				style={{ backgroundColor: product.accent }}
			></div>
			<Card.Content className="relative text-center">
				<div
					className="absolute left-0 flex items-center justify-center w-full"
					style={{ top: "-2rem" }}
				>
					<ProductIcon size={16} product={product} />
				</div>
				<div className="h-6"></div>
				<Link route="product" params={{ slug: product.slug }}>
					<a>
						<h2 className="text-sm font-medium text-gray-900 leading-5">
							{product.name}
						</h2>
					</a>
				</Link>
				<p className="mb-4 text-sm text-gray-500 truncate leading-5 last:mb-0">
					{truncate(product.description, { length: 140 })}
				</p>
				{user && user.id === product.user && (
					<Link route="not-implemented">
						<Button xs>
							<Button.Icon>
								<FontAwesomeIcon icon="edit" />
							</Button.Icon>
							Edit
						</Button>
					</Link>
				)}
			</Card.Content>
		</Card>
	);
}

export default ProductCard;
