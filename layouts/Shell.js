import React from "react";
import ErrorCard from "components/ui/ErrorCard";
import Navbar from "components/nav/Navbar";
import Container from "components/ui/Container";

// TODO: refactor, make nicer

function Shell({ layoutProps, ...props }) {
	const errored = props.statusCode && props.statusCode >= 400;
	const children = !errored ? (
		props.children
	) : (
		<ErrorCard statusCode={props.statusCode} />
	);

	if (layoutProps && layoutProps.withoutShell && !errored) {
		return children;
	}

	return (
		<div
			className={
				"flex flex-col min-h-screen bg-gray-100 " +
				(layoutProps && layoutProps.className
					? layoutProps.className
					: "")
			}
		>
			<Navbar />
			<div className="flex-grow">
				{!layoutProps ||
				(layoutProps && layoutProps.contained === undefined) ||
				(layoutProps && layoutProps.contained) ? (
					<Container className="py-4">{children}</Container>
				) : (
					children
				)}
			</div>
			<div className="flex-none">
				<Container className="py-4">
					<small className="text-gray-500">
						&copy; Makerlog, LLC. Footer goes here.
					</small>
				</Container>
			</div>
		</div>
	);
}

Shell.defaultProps = {
	// Whether to display the container by default.
	layoutProps: {
		contained: true,
	},
};

export default Shell;
