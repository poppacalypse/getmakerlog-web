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
import { useRouter } from "next/router";
import OutboundLink from "components/seo/OutboundLink";
import FeedbackModal from "components/feedback/FeedbackModal";
import config from "config";

function Navbar() {
	const { pathname } = useRouter();
	const { isLoggedIn, user } = useAuth();
	const {
		toggleEditor,
		editorOpen,
		editorDefaultTab,
		toggleSearch,
		searchOpen,
		toggleFeedback,
		feedbackOpen,
	} = useRoot();

	return (
		<nav className="flex-none bg-white mt-safe-top">
			<div className="fixed top-0 left-0 z-50 w-full bg-green-500 h-safe-top"></div>
			<div
				className={`border-t ${config.WL_BORDER_COLOR} border-1.5`}
			></div>
			<div className="border-b border-gray-200">
				<Container className="flex items-center py-4">
					<div className="flex items-center sm:flex-1">
						<Link route="index">
							<a className="flex items-center flex-none h-full mr-4 text-green-500 space-x-2 logo">
								{config.WL_LOGO ? (
									<img
										className="w-auto h-8"
										src={config.WL_LOGO}
									/>
								) : (
									<FontAwesomeIcon icon="check-circle" />
								)}
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
								"mobile-footer fixed sm:static flex flex-row bottom-0 left-0 w-full bg-white sm:bg-transparent z-40 border-t border-gray-200 sm:border-none"
							}
						>
							<ActiveLink
								route="index"
								wildcard
								notPath={["stories", "about", "_error"]}
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
									Community
								</a>
							</ActiveLink>
							<ActiveLink
								route="stories"
								wildcard
								notPath={["index", "about", "_error"]}
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
									Stories
								</a>
							</ActiveLink>
							<ActiveLink
								route="about"
								wildcard
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="flex-1 py-4 mr-0 font-semibold text-center text-gray-500 sm:mr-4 sm:py-0 sm:flex-initial">
									More
								</a>
							</ActiveLink>
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
									onClick={() => toggleEditor()}
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
												{!config.IS_WL ? (
													<Link route="integrations">
														<Dropdown.Item>
															<Dropdown.Item.Icon>
																<FontAwesomeIcon icon="plug" />
															</Dropdown.Item.Icon>{" "}
															Integrations
														</Dropdown.Item>
													</Link>
												) : null}
												<Link route="settings">
													<Dropdown.Item>
														<Dropdown.Item.Icon>
															<FontAwesomeIcon icon="cogs" />
														</Dropdown.Item.Icon>{" "}
														Settings
													</Dropdown.Item>
												</Link>
												<Dropdown.Item
													onClick={toggleFeedback}
												>
													<Dropdown.Item.Icon>
														<FontAwesomeIcon icon="envelope" />
													</Dropdown.Item.Icon>{" "}
													Send feedback
												</Dropdown.Item>
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
									<Button primary>
										Join {config.WL_FULL_NAME}
									</Button>
								</Link>
								<Link route="login">
									<Button className="ml-2">Log in</Button>
								</Link>
							</>
						)}
					</div>
				</Container>
			</div>
			{pathname.startsWith("/stories") ? (
				<div className="border-b border-gray-200">
					<Container className="py-2">
						<div className="flex flex-auto max-w-full px-4 -mx-4 overflow-x-auto box-content">
							<ActiveLink
								route="stories"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Frontpage
								</a>
							</ActiveLink>
							<ActiveLink
								route="stories-tag"
								params={{ slug: "interviews" }}
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Interviews
								</a>
							</ActiveLink>
							<ActiveLink
								route="stories-tag"
								params={{ slug: "culture" }}
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Culture
								</a>
							</ActiveLink>
							<ActiveLink
								route="stories-tag"
								params={{ slug: "news" }}
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									News
								</a>
							</ActiveLink>
						</div>
					</Container>
				</div>
			) : pathname.startsWith("/about") ? (
				<div className="border-b border-gray-200">
					<Container className="py-2">
						<div className="flex flex-auto max-w-full px-4 -mx-4 overflow-x-auto box-content">
							<ActiveLink
								route="about"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									About
								</a>
							</ActiveLink>
							{!config.IS_WL ? (
								<ActiveLink
									route="book-ad"
									activeClassName={config.WL_TEXT_COLOR}
								>
									<a className="mr-4 font-medium text-gray-500">
										Advertise
									</a>
								</ActiveLink>
							) : null}
							<ActiveLink
								route="legal"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Legal
								</a>
							</ActiveLink>
							<ActiveLink
								route="contact"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Contact
								</a>
							</ActiveLink>
							<div className="flex-grow"></div>
							<OutboundLink
								to="https://open.getmakerlog.com"
								className="mr-4 font-medium text-gray-500"
							>
								Open
							</OutboundLink>
						</div>
					</Container>
				</div>
			) : (
				<div className="border-b border-gray-200">
					<Container className="py-2">
						<div className="flex flex-auto max-w-full px-4 -mx-4 overflow-x-auto box-content">
							<ActiveLink
								route="index"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Feed
								</a>
							</ActiveLink>
							<ActiveLink
								route="discussions"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Discussions
								</a>
							</ActiveLink>
							<ActiveLink
								route="products"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Products
								</a>
							</ActiveLink>
							<ActiveLink
								route="events"
								activeClassName={config.WL_TEXT_COLOR}
							>
								<a className="mr-4 font-medium text-gray-500">
									Events
								</a>
							</ActiveLink>
							{isLoggedIn && (
								<>
									<div className="flex-grow"></div>
									<ActiveLink
										route="tasks"
										activeClassName={config.WL_TEXT_COLOR}
									>
										<a className="flex-none pr-4 font-medium text-gray-500 md:pr-0">
											Your Tasks
										</a>
									</ActiveLink>
								</>
							)}
						</div>
					</Container>
				</div>
			)}

			{isLoggedIn && (
				<EditorModal
					open={editorOpen}
					onClose={() => toggleEditor()}
					defaultTab={editorDefaultTab}
				/>
			)}

			<GlobalSearch open={searchOpen} onClose={toggleSearch} />
			<FeedbackModal open={feedbackOpen} onClose={toggleFeedback} />
		</nav>
	);
}

export default Navbar;
