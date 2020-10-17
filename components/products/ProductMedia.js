import React from "react";
import ProductIcon from "./ProductIcon";
import truncate from "lodash/truncate";

function ProductMedia({ product }) {
	return (
		<div className="flex items-center justify-between break-words space-x-3">
			<ProductIcon
				size={10}
				product={product}
				className="flex-shrink-0"
			/>
			<div className="flex-1" style={{ minWidth: 0 }}>
				<h2 className="text-sm font-medium text-gray-900 leading-5">
					{product.name}
				</h2>
				<p className="text-sm text-gray-500 truncate leading-5">
					{truncate(product.description, { length: 140 })}
				</p>
			</div>
		</div>
	);
}

export default ProductMedia;
