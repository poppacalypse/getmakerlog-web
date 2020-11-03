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
import Container from "components/ui/Container";
import GlobalSearch from "components/search/GlobalSearch";

function Navbar() {
	const { isLoggedIn, user } = useAuth();
	const { toggleEditor, editorOpen, toggleSearch, searchOpen } = useRoot();

	return (
		<nav className="flex-none bg-white">
			<div className="border-t border-green-500 border-1.5"></div>
			<div className="border-b border-gray-200">
				<Container className="flex items-center py-4">
					<div className="flex items-center flex-1">
						<Link route="index">
							<a className="flex items-center mr-4 text-green-500 logo">
								<FontAwesomeIcon icon="check-circle" />
							</a>
						</Link>
						<div
							className="hidden mr-4 md:block"
							style={{ width: "500px" }}
						>
							<input
								onClick={() => toggleSearch()}
								className=" w-full"
								placeholder="Search products, makers, stories..."
							/>
						</div>
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
								<button
									className={
										"flex md:hidden items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100  text-center rounded-full hover:bg-gray-200 text-gray-700"
									}
									onClick={() => toggleSearch()}
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
												<Link
													route="profile"
													params={{
														username: user.username,
													}}
												>
													<Dropdown.Item>
														<Dropdown.Item.Icon>
															<FontAwesomeIcon icon="user-circle" />
														</Dropdown.Item.Icon>{" "}
														You
													</Dropdown.Item>
												</Link>
												<Link route="integrations">
													<Dropdown.Item>
														<Dropdown.Item.Icon>
															<FontAwesomeIcon icon="plug" />
														</Dropdown.Item.Icon>{" "}
														Integrations
													</Dropdown.Item>
												</Link>
												<Link route="settings">
													<Dropdown.Item>
														<Dropdown.Item.Icon>
															<FontAwesomeIcon icon="cogs" />
														</Dropdown.Item.Icon>{" "}
														Settings
													</Dropdown.Item>
												</Link>
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
							<>
								<Link route="register">
									<Button primary>Join Makerlog</Button>
								</Link>
								<Link route="login">
									<Button className="ml-2">Log in</Button>
								</Link>
							</>
						)}
					</div>
				</Container>
			</div>
			<div className="border-b border-gray-200">
				<Container className="py-2">
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
						<ActiveLink
							route="products"
							activeClassName="text-green-500"
						>
							<a className="mr-4 font-medium text-gray-500">
								Products
							</a>
						</ActiveLink>
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
				</Container>
			</div>

			{isLoggedIn && (
				<EditorModal open={editorOpen} onClose={toggleEditor} />
			)}

			<GlobalSearch open={searchOpen} onClose={toggleSearch} />
		</nav>
	);
}

export default Navbar;
