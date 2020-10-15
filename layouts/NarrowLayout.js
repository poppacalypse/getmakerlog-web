import StdSidebar from "components/sidebars/StdSidebar";
import React from "react";

function NarrowLayout({
	rightSidebar = <StdSidebar />,
	leftSidebar = null,
	maxWidthMultiplier = 2,
	children,
}) {
	return (
		<div className="flex mx-auto">
			<div className="flex-1 hidden h-full md:block">{leftSidebar}</div>
			<div className={`w-full mx-0 md:mx-${maxWidthMultiplier * 2} md:max-w-${maxWidthMultiplier > 1 ? maxWidthMultiplier : ""}xl`}>{children}</div>
			<div className="flex-1 hidden h-full md:block">{rightSidebar}</div>
		</div>
	);
}

export default NarrowLayout;
