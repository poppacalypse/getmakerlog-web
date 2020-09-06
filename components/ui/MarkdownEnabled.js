import React from "react";
import OutboundLink from "components/seo/OutboundLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MarkdownEnabled() {
	return (
		<small>
			<OutboundLink
				className="text-gray-500"
				icon
				to="https://www.markdowntutorial.com/"
			>
				<FontAwesomeIcon icon={["fab", "markdown"]} /> Basic formatting
				is allowed.
			</OutboundLink>
		</small>
	);
}

export default MarkdownEnabled;
