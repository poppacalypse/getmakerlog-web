import React from "react";
import ErrorCard from "components/ui/ErrorCard";
import Navbar from "components/nav/Navbar";
import Container from "components/ui/Container";
import Footer from "components/nav/Footer";

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
				"flex flex-col min-h-screen " +
				(layoutProps && layoutProps.bgClassName
					? layoutProps.bgClassName
					: " bg-gray-100  ") +
				" " +
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
			<Footer />
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
