import React from "react";
import PropTypes from "prop-types";
import { Link, useRouter, routerHelper } from "routes";

// TODO: Add params support.

function ActiveLink({
	href,
	route,
	params,
	activeClassName,
	children,
	...props
}) {
	const router = useRouter();

	const child = React.Children.only(children);

	let className = child.props.className || "";
	if (
		(router.pathname === href ||
			routerHelper.resolveRoute(route).href == router.pathname) &&
		activeClassName
	) {
		className = `${className} ${activeClassName}`.trim();
	}

	return (
		<Link href={href} route={route} params={params} {...props}>
			{React.cloneElement(child, { className })}
		</Link>
	);
}

ActiveLink.propTypes = {
	href: PropTypes.string,
	activeClassName: PropTypes.string,
	children: PropTypes.node.isRequired,
};

ActiveLink.defaultProps = {
	href: "",
	activeClassName: "",
};

export default ActiveLink;