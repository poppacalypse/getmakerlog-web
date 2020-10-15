import React from "react";
import Button from "components/ui/Button";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import NotificationsLink from "components/notifications/NotificationsLink";
import EditorModal from "components/editor/EditorModal";
import ActiveLink from "components/router/ActiveLink";
import Dropdown from "components/ui/Dropdown";

function Navbar() {
	const { isLoggedIn, user } = useAuth();
	const { toggleEditor, editorOpen } = useRoot();

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
							style={{ width: "500px" }}
							className="hidden w-64 mr-4 md:block"
							placeholder="Search products, makers, stories..."
						/>
						<div
							className={
								"fixed sm:static flex flex-row bottom-0 left-0 w-full bg-white sm:bg-transparent z-40 border-t border-gray-200 sm:border-none"
							}
						>
							<ActiveLink
								route="index"
								wildcard
								notPath={["stories", "more", "_error"]}
								activeClassName="text-green-500"
							>
								<a className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
									Community
								</a>
							</ActiveLink>
							<div className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
								Stories
							</div>
							<div className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
								More
							</div>
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
								<div className="pl-2 cursor-pointer">
									<Dropdown
										hover
										items={
											<>
												<Link route="logout">
													<Dropdown.Item>
														<Dropdown.Item.Icon>
															<FontAwesomeIcon icon="sign-out-alt" />
														</Dropdown.Item.Icon>{" "}
														Log out
													</Dropdown.Item>
												</Link>
											</>
										}
									>
										<Avatar user={user} size={8} />
									</Dropdown>
								</div>
							</>
						) : (
							<Link route="register">
								<Button primary>Join Makerlog</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="border-b border-gray-200">
				<div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex flex-auto max-w-full overflow-x-auto">
						<ActiveLink
							route="index"
							activeClassName="text-green-500"
						>
							<a className="mr-4 font-medium text-gray-500">
								Feed
							</a>
						</ActiveLink>
						<ActiveLink
							route="discussions"
							activeClassName="text-green-500"
						>
							<a className="mr-4 font-medium text-gray-500">
								Discussions
							</a>
						</ActiveLink>
						<div className="mr-4 font-medium text-gray-500">
							Products
						</div>
						<div className="mr-4 font-medium text-gray-500">
							Events
						</div>
						{isLoggedIn && (
							<>
								<div className="flex-grow"></div>
								<ActiveLink
									route="tasks"
									activeClassName="text-green-500"
								>
									<a className="flex-none font-medium text-gray-500">
										Your Tasks
									</a>
								</ActiveLink>
							</>
						)}
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
