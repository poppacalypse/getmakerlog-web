import React from "react";
import Button from "components/ui/Button";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import NotificationsLink from "components/notifications/NotificationsLink";

function Navbar({ app = false }) {
	const { isLoggedIn, user } = useAuth();
	const { mobileSidebarOpen, toggleMobileSidebar } = useRoot();

	return (
		<nav
			className={
				"h-16 bg-white border-b border-gray-200  px-4 flex flex-row left-0  w-full top-0 z-50 " +
				(app ? "fixed" : "")
			}
		>
			<div className="flex flex-row flex-none navbar-left md:w-72">
				{app && isLoggedIn && (
					<a
						className="flex items-center justify-center mr-4 flex-center md:hidden"
						onClick={() => toggleMobileSidebar()}
					>
						<Button sm className="w-10">
							<FontAwesomeIcon
								size="lg"
								icon={mobileSidebarOpen ? "times" : "bars"}
							/>
						</Button>
					</a>
				)}
				<Link route="index">
					<a className="flex items-center justify-center mr-4 text-green-500 logo flex-center">
						<FontAwesomeIcon icon="check-circle" />
					</a>
				</Link>
			</div>
			<div className="flex self-center justify-center w-full h-full navbar-middle">
				{app && !mobileSidebarOpen ? (
					<div className="fixed bottom-0 left-0 z-20 flex items-center flex-grow w-full bg-white border-t border-gray-200 md:max-w-3xl menu md:border-t-0 md:bg-transparent md:static md:h-full">
						<Link route="index">
							<a className="flex items-center justify-center flex-1 h-full p-4 font-semibold text-center text-green-500 border-b-2 border-green-500 cursor-pointer md:p-0 hover:bg-green-100 transition ease-in-out duration-150">
								Explore
							</a>
						</Link>
						<div className="flex items-center justify-center flex-1 h-full p-4 font-semibold text-center text-gray-700 cursor-pointer md:p-0 hover:bg-green-100 transition ease-in-out duration-150">
							Stories
						</div>
						<div className="flex items-center justify-center flex-1 h-full p-4 font-semibold text-center text-gray-700 cursor-pointer md:p-0 hover:bg-green-100 transition ease-in-out duration-150">
							More
						</div>
					</div>
				) : null}
			</div>
			<div className="flex flex-row items-center justify-end flex-none navbar-right md:w-72">
				{isLoggedIn ? (
					<>
						{!user.gold && (
							<div className="flex items-center justify-center h-full px-2 font-semibold text-center text-gold-600">
								Get Gold
							</div>
						)}
						<NotificationsLink />
						<div className="pl-2">
							<Avatar user={user} size={8} />
						</div>
					</>
				) : (
					<Button primary>Join Makerlog</Button>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
