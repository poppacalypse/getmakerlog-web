import React from "react";
import ErrorCard from "components/ui/ErrorCard";
import Navbar from "components/nav/Navbar";

// TODO: refactor, make nicer

function Shell({ contained, ...props }) {
	const errored = props.statusCode && props.statusCode >= 400;
	const children = !errored ? (
		props.children
	) : (
		<ErrorCard statusCode={props.statusCode} />
	);

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Navbar />
			<div className="flex-grow">
				{contained ? (
					<div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
						{children}
					</div>
				) : (
					children
				)}
			</div>
			<div className="flex-none">
				<div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<small className="text-gray-500">
						&copy; Makerlog, LLC. Footer goes here.
					</small>
				</div>
			</div>
		</div>
	);
}

Shell.defaultProps = {
	// Whether to display the narrow container by default.
	contained: true,
};

export default Shell;
