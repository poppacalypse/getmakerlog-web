import React from "react";

function CardContent({ children, className = "" }) {
	return <div className={"p-4 " + className}>{children}</div>;
}

function Card({ children, className = null, image = null }) {
	return (
		<div
			className={
				"Card bg-white rounded-md mb-4 shadow-xs last:mb-0 " +
				(className ?? "") +
				(image ? " flex flex-row " : "")
			}
		>
			{image && (
				<div
					className="relative overflow-hidden"
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
