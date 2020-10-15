import OutboundLink from "components/seo/OutboundLink";
import React from "react";

export default function URLComponent(key, result) {
	return (
		<OutboundLink icon to={result[0]} key={key} className="break-all">
			{result[0]}
		</OutboundLink>
	);
}
