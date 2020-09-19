import React, { useState, useEffect } from "react";
import UserMedia from "components/ui/UserMedia";
import ErrorCard from "components/ui/ErrorCard";
import Navbar from "components/nav/Navbar";
import { Link } from "routes";
import debounce from "lodash/debounce";
import { getLogger } from "utils/logging";
import { isServer } from "config";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import ActiveLink from "components/router/ActiveLink";
import Ad from "components/ads/Ad";

const log = getLogger("Shell");

// TODO: refactor, make nicer

function isMobileViewport(width) {
	return width <= 1024;
}

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			log(
				`Window resized. (${window.innerWidth}x${window.innerHeight}, ${
					isMobileViewport(window.innerWidth)
						? "mobile viewport"
						: "desktop viewport"
				})`
			);
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Add event listener
		window.addEventListener("resize", debounce(handleResize, 400));

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}

function Shell({ contained, ...props }) {
	const { isLoggedIn, user } = useAuth();
	const { mobileSidebarOpen, toggleMobileSidebar } = useRoot();

	const size = useWindowSize();
	const isMobile = isMobileViewport(size.width);

	useEffect(() => {
		if (!isMobile && !isServer && open) toggleMobileSidebar(false);
	});

	// Always open on mobile viewports.
	const isOpen = isMobile ? open : true;
	const openClassNames = isMobile
		? " fixed top-0 left-0 w-full min-h-screen z-40 force-block "
		: "";

	const errored = props.statusCode && props.statusCode >= 400;
	const children = !errored ? (
		props.children
	) : (
		<ErrorCard statusCode={props.statusCode} />
	);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
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
