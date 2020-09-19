import React from "react";
import Button from "components/ui/Button";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import NotificationsLink from "components/notifications/NotificationsLink";
import EditorModal from "components/editor/EditorModal";

function Navbar({ app = false }) {
	const { isLoggedIn, user } = useAuth();
	const {
		mobileSidebarOpen,
		toggleMobileSidebar,
		toggleEditor,
		editorOpen,
	} = useRoot();

	return (
		<nav className="flex-none bg-white">
			<div className="border-t border-green-500 border-1.5"></div>
			<div className="border-b border-gray-200">
				<div className="flex items-center px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center flex-1">
						<Link route="index">
							<a className="flex items-center mr-4 text-green-500 logo">
								<FontAwesomeIcon icon="check-circle" />
							</a>
						</Link>
						<input
							style={{ width: "20rem" }}
							className="hidden w-64 mr-4 md:block"
							placeholder="Search products, makers, stories..."
						/>
						<Link route="index">
							<a className="mr-4 font-semibold">Community</a>
						</Link>
						<div className="mr-4 font-semibold text-gray-700 ">
							Stories
						</div>
						<div className="mr-4 font-semibold text-gray-700 ">
							More
						</div>
					</div>
					<div className="flex justify-end flex-1">
						{isLoggedIn ? (
							<>
								{!user.gold && (
									<div className="flex items-center justify-center h-full px-2 font-semibold text-center text-gold-600">
										Get Gold
									</div>
								)}
								<button
									className={
										"flex md:hidden items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100  text-center rounded-full hover:bg-gray-200 text-gray-700"
									}
								>
									<FontAwesomeIcon icon="search" />
								</button>
								<button
									onClick={toggleEditor}
									className={
										"flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100  text-center rounded-full hover:bg-gray-200 text-gray-700"
									}
								>
									<FontAwesomeIcon icon="plus" />
								</button>
								<NotificationsLink />
								<div className="pl-2">
									<Avatar user={user} size={8} />
								</div>
							</>
						) : (
							<Button primary>Join Makerlog</Button>
						)}
					</div>
				</div>
			</div>
			<div className="border-b border-gray-200">
				<div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex flex-auto">
						<div className="mr-4 font-medium text-green-500">
							Feed
						</div>
						<div className="mr-4 font-medium text-gray-500">
							Discussions
						</div>
						<div className="mr-4 font-medium text-gray-500">
							Groups
						</div>
						<div className="mr-4 font-medium text-gray-500">
							Products
						</div>
						<div className="mr-4 font-medium text-gray-500">
							Events
						</div>
					</div>
				</div>
			</div>

			{isLoggedIn && (
				<EditorModal open={editorOpen} onClose={toggleEditor} />
			)}
		</nav>
	);
}

export default Navbar;
