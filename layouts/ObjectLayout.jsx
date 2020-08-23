import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Navbar from "components/nav/Navbar";

function ObjectLayoutContainer(props) {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full h-full flex flex-col">
			<div className="w-full flex-grow max-w-3xl mx-auto bg-gray-50 border-r border-l border-gray-200 p-4">
				{props.children}
			</div>
		</div>
	);
}

function ObjectLayout(props) {
	return (
		<div>
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
					<div className="max-w-3xl mx-auto border-r border-l border-gray-200">
						<Navbar />
					</div>
				</div>

				{props.children}
			</div>
		</div>
	);
}

ObjectLayout.Container = ObjectLayoutContainer;

export default ObjectLayout;
