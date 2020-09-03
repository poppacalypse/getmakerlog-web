import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const log = getLogger("AppLayout");

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

function MainSidebar({ user, open, toggleOpen }) {
	// The way this works avoids any glitchiness or jank.
	// It is hidden by default on mobile viewports, and display:hidden off when opened.
	// If the viewport != mobile, it automatically gets shut closed.

	const size = useWindowSize();
	const isMobile = isMobileViewport(size.width);

	useEffect(() => {
		if (!isMobile && !isServer && open) toggleOpen(false);
	});

	// Always open on mobile viewports.
	const isOpen = isMobile ? open : true;
	const openClassNames = isMobile
		? " fixed top-0 left-0 w-full min-h-screen z-40 force-block "
		: "";

	return (
		<div
			className={
				"hidden " +
				(isOpen ? openClassNames : "") +
				" md:block md:w-72 pt-16 pb-0 md:sticky flex flex-col flex-grow border-r border-gray-200 max-h-screen bg-white overflow-y-auto h-full left-0 top-0 "
			}
		>
			<div className="flex flex-col h-full pt-4">
				<ActiveLink
					route="index"
					activeClassName="text-gray-900 bg-green-100 border-l-2 border-green-500"
				>
					<a className="p-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-green-100 box-border">
						Log
					</a>
				</ActiveLink>
				<div className="p-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-green-100">
					Discussions
				</div>
				<div className="p-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-green-100">
					Chat
				</div>
				<div className="p-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-green-100">
					Leaderboards
				</div>
				<div className="mt-8">
					<h3
						className="px-4 pb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase leading-4"
						id="projects-headline"
					>
						Gold
					</h3>
					<div className="px-4 py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
						Club
					</div>
					<div className="px-4 py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
						Ads
					</div>
					<h3
						className="px-4 pb-2 mt-8 text-xs font-semibold tracking-wider text-gray-500 uppercase leading-4"
						id="projects-headline"
					>
						You
					</h3>

					<ActiveLink
						route="tasks"
						activeClassName="text-gray-900 bg-green-100"
					>
						<a className="block px-4 py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
							Tasks
						</a>
					</ActiveLink>
					<div className="px-4 py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
						Products
					</div>
					<div className="px-4 py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
						Integrations
					</div>
				</div>

				<div className="flex-grow"></div>
				<div className="border-t border-gray-200">
					<div className="p-4">
						<UserMedia
							user={user}
							actions={
								<small className="text-xs">
									<a>Settings</a> ·{" "}
									<Link route="logout">
										<a>Log out</a>
									</Link>
								</small>
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function AppLayoutContainer({
	children,
	withPaddingTop = true,
	preContained = null,
	className = "",
}) {
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return (
			<div
				className={
					"flex flex-col flex-grow w-full h-full max-w-full mx-auto max-w-7xl sm:px-6 lg:px-8" +
					` ${className}`
				}
			>
				<div className="flex-grow w-full max-w-3xl mx-auto border-l border-r border-gray-200 bg-gray-50">
					{preContained}
					<div className=" p-4 ">{children}</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={
				"max-w-full max-w-7xl mx-auto flex-grow" +
				(withPaddingTop ? " pt-16 " : "") +
				` ${className}`
			}
		>
			{preContained}
			<div className=" px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl py-4 mx-auto Container ">
					{children}
				</div>
			</div>
		</div>
	);
}

function AppLayoutWithTopBar({ children, topBar = null }) {
	return (
		<AppLayoutContainer preContained={topBar}>
			{children}
		</AppLayoutContainer>
	);
}

function AppLayout({ allowGuest, contained, ...props }) {
	const { isLoggedIn, user } = useAuth();
	const { mobileSidebarOpen, toggleMobileSidebar } = useRoot();
	const children =
		(!isLoggedIn && allowGuest) || isLoggedIn ? (
			props.children
		) : (
			<AppLayoutContainer>
				<ErrorCard statusCode={403} />
			</AppLayoutContainer>
		);

	if (!isLoggedIn) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-100">
				<div className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto border-l border-r border-gray-200">
						<Navbar />
					</div>
				</div>

				{contained ? (
					<AppLayoutContainer>{children}</AppLayoutContainer>
				) : (
					children
				)}
			</div>
		);
	}

	return (
		<div className="w-screen max-w-full min-h-screen mb-16 bg-gray-100 AppLayout Page md:mb-0">
			<Navbar app />

			<div className="flex">
				{isLoggedIn ? (
					<div>
						<MainSidebar
							open={mobileSidebarOpen}
							toggleOpen={toggleMobileSidebar}
							user={user}
						/>
					</div>
				) : null}

				{contained ? (
					<AppLayoutContainer>{children}</AppLayoutContainer>
				) : (
					children
				)}

				{isLoggedIn ? (
					<div>
						<div className="sticky top-0 right-0 flex-col flex-grow hidden h-full max-h-screen min-h-screen p-4 pt-20 pb-4 overflow-y-auto bg-white border-l border-gray-200 w-72 md:flex">
							<h3
								className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase leading-4"
								id="projects-headline"
							>
								Indie ad
							</h3>
							<div className="ad-case">
								<img
									className="mb-2 border border-gray-200 rounded-md"
									src="https://ik.imagekit.io/makerlog/media/uploads/bookings/2020/08/19/makerlog.png"
									alt=""
								/>
								<a className="text-sm">
									Create attention-grabbing headlines without
									a marketer.{" "}
									<FontAwesomeIcon
										icon="external-link-alt"
										size={"sm"}
									/>
								</a>
							</div>

							<div className="mt-8">
								<h3
									className="pb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase leading-4"
									id="projects-headline"
								>
									Groups
								</h3>
								<div className="py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
									Marketers
								</div>
								<div className="py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
									Young Makers
								</div>
								<div className="py-2 mx-2 mb-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
									Makers en Español
								</div>
							</div>
							<div className="flex-grow"></div>
							<div>
								<small className="text-xs text-gray-500">
									&copy; Makerlog, LLC <br />
									<a className="text-green-500">
										About
									</a> ·{" "}
									<a className="text-green-500">Legal</a> ·{" "}
									<a className="text-green-500">Twitter</a> ·{" "}
									<a className="text-green-500">Advertise</a>
								</small>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

AppLayout.defaultProps = {
	// Allow rendering children of the app layout (usually logged in).
	// This is for profile pages or object pages.
	// Replaces the object layout.
	allowGuest: false,

	// Whether to display the narrow container by default.
	contained: true,
};

AppLayout.Container = AppLayoutContainer;
AppLayout.WithTopBar = AppLayoutWithTopBar;

export default AppLayout;
