import React from "react";
import AppLayout from "./AppLayout";
import ErrorCard from "components/ui/ErrorCard";
import PageLayout from "./PageLayout";

function Shell({ layoutProps = {}, ...props }) {
	const errored = props.statusCode && props.statusCode >= 400;
	const children = errored ? (
		<ErrorCard statusCode={props.statusCode} />
	) : (
		props.children
	);
	switch (layoutProps.layout) {
		case "app":
			return <AppLayout {...layoutProps}>{children}</AppLayout>;

		case "page":
			return <PageLayout {...layoutProps}>{children}</PageLayout>;

		default:
			// Pass through by default.
			// This is useful for pages like the home/log page, the object pages, etc where conditional layout changes occur.
			// However, these pages may have to implement error/statusCode handling manually.
			return children;
	}
}

export default Shell;
