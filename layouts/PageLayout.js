import React from "react";
import Navbar from "components/nav/Navbar";

function PageLayoutContainer(props) {
	return (
		<div className="flex-grow w-full h-full p-4 border-b border-l border-r border-gray-200 bg-gray-50">
			{props.children}
		</div>
	);
}

function PageLayout(props) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<div className="container flex flex-col flex-grow mx-auto">
				<div className="bg-white border-l border-r border-gray-200 ">
					<Navbar />
				</div>

				{props.children}
			</div>
		</div>
	);
}

PageLayout.Container = PageLayoutContainer;

export default PageLayout;
