import React from "react";

function CardContent({ children, className = "" }) {
	return <div className={"p-4 " + className}>{children}</div>;
}

function Card({
	children,
	className = null,
	image = null,
	mb = true,
	floating = false,
}) {
	return (
		<div
			className={
				"Card bg-white dark:bg-dark-100 rounded-md " +
				(className ?? "") +
				(image ? " flex flex-row " : "") +
				(mb ? " mb-4 last:mb-0 " : "") +
				(floating ? " shadow " : " shadow-xs ")
			}
		>
			{image && (
				<div
					className="relative overflow-hidden border-r border-gray-200"
					style={{
						flex: 1 / 3,
						backgroundImage: `url(${image})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				></div>
			)}
			{image ? (
				<div className="flex items-center flex-1">{children}</div>
			) : (
				children
			)}
		</div>
	);
}

Card.Content = CardContent;

export default Card;
