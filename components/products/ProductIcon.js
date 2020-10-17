import React from "react";

function darken(color, amount) {
	return (
		"#" +
		color
			.replace(/^#/, "")
			.replace(/../g, (color) =>
				(
					"0" +
					Math.min(
						255,
						Math.max(0, parseInt(color, 16) + amount)
					).toString(16)
				).substr(-2)
			)
	);
}

function ProductLetter({ product }) {
	return (
		<span
			className={`rounded-md w-full h-full text-center flex items-center justify-center text-white`}
			style={{ backgroundColor: darken(product.accent, -30) }}
		>
			{product.name.length ? product.name.charAt(0) : "P"}
		</span>
	);
}

function ProductIcon({ size, product, className = "" }) {
	return (
		<figure
			className={
				`p-1 bg-gray-100 border border-gray-200 flex items-center justify-content h-${size} w-${size} rounded-md ` +
				className
			}
		>
			{product.icon ? (
				<img
					className={`rounded-md ` + className}
					src={product.icon}
					alt={product.name}
				/>
			) : (
				<ProductLetter product={product} size={size} />
			)}
		</figure>
	);
}

export default ProductIcon;
