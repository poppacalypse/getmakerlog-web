import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Navbar from "components/nav/Navbar";

function PageLayoutContainer(props) {
	return (
		<div className="w-full flex-grow h-full bg-gray-50 border-b border-r border-l border-gray-200 p-4">
			{props.children}
		</div>
	);
}

function PageLayout(props) {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col">
			<div className="flex-grow container mx-auto flex flex-col">
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
