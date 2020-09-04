import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OutboundLink = ({
	to,
	href,
	icon = false,
	children,
	className = null,
	style = null,
}) => (
	<a
		href={to || href}
		target={"_blank"}
		rel="noopener noreferrer"
		className={className}
		style={style}
	>
		{children} <FontAwesomeIcon size="xs" icon="external-link-alt" />
	</a>
);

OutboundLink.propTypes = {
	to: PropTypes.string,
};

export default OutboundLink;
