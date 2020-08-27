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
		? " fixed top-0 left-0 w-full min-h-screen z-30 force-block "
		: "";

	return (
		<div
			className={
				"hidden " +
				(isOpen ? openClassNames : "") +
				" md:block md:w-72 pt-16 pb-0 md:sticky flex flex-col flex-grow border-r border-gray-200 max-h-screen bg-white overflow-y-auto h-full left-0 top-0 "
			}
		>
			<div className="pt-4 flex flex-col h-full">
				<div className="cursor-pointer p-4 py-3 text-gray-900 bg-green-100 font-semibold border-l-2 box-border border-green-500 ">
					Log
				</div>
				<div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-green-100 font-semibold">
					Discussions
				</div>
				<div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-green-100 font-semibold">
					Chat
				</div>
				<div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-green-100 font-semibold">
					Leaderboards
				</div>
				<div className="mt-8">
					<h3
						className="px-4 pb-2 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
						id="projects-headline"
					>
						Gold
					</h3>
					<div className="mx-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
						Club
					</div>
					<div className="mx-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
						Ads
					</div>
					<h3
						className="mt-8 px-4 pb-2 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
						id="projects-headline"
					>
						You
					</h3>
					<div className="mx-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
						Tasks
					</div>
					<div className="mx-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
						Products
					</div>
					<div className="mx-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
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

function AppLayoutContainer({ children, withPaddingTop = true }) {
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return (
			<div className="max-w-full max-w-7xl mx-auto sm:px-6 lg:px-8 flex-grow w-full h-full flex flex-col">
				<div className="w-full flex-grow max-w-3xl mx-auto bg-gray-50 border-r border-l border-gray-200 p-4">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div
			className={
				"max-w-full py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow " +
				(withPaddingTop ? " pt-20 " : "")
			}
		>
			<div className="Container max-w-3xl mx-auto">{children}</div>
		</div>
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
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full">
					<div className="max-w-3xl mx-auto border-r border-l border-gray-200">
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
		<div className="AppLayout Page bg-gray-100 min-h-screen w-screen max-w-full mb-16 md:mb-0">
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
						<div className="hidden max-h-screen p-4 pt-20 pb-4 sticky w-72 md:flex flex-col flex-grow border-l border-gray-200 bg-white overflow-y-auto min-h-screen h-full right-0 top-0">
							<h3
								className="mb-2 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
								id="projects-headline"
							>
								Indie ad
							</h3>
							<div className="ad-case">
								<img
									className=" rounded-md border border-gray-200 mb-2"
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
									className="pb-2 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
									id="projects-headline"
								>
									Groups
								</h3>
								<div className="mx-2 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
									Marketers
								</div>
								<div className="mx-2 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
									Young Makers
								</div>
								<div className="mx-2 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
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

export default AppLayout;
