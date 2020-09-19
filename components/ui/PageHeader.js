import React from "react";

function PageHeader({ children }) {
	return (
		<div div className="flex flex-row pb-4 mb-4 border-b border-gray-200">
			{children}
		</div>
	);
}

export default PageHeader;
