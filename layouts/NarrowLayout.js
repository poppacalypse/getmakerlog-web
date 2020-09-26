import StdSidebar from "components/sidebars/StdSidebar";
import React from "react";

function NarrowLayout({
	rightSidebar = <StdSidebar />,
	leftSidebar = null,
	children,
}) {
	return (
		<div className="flex mx-auto">
			<div className="flex-1 hidden h-full md:block">{leftSidebar}</div>
			<div className="w-full mx-0 md:mx-4 md:max-w-2xl">{children}</div>
			<div className="flex-1 hidden h-full md:block">{rightSidebar}</div>
		</div>
	);
}

export default NarrowLayout;
