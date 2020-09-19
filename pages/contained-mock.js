import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditorModal from "components/editor/EditorModal";
import NotificationsLink from "components/notifications/NotificationsLink";
import Avatar from "components/ui/Avatar";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import React from "react";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";

function ContainedMock() {
	const { isLoggedIn, user } = useAuth();
	const { toggleEditor, editorOpen } = useRoot();
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
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
			<div className="flex-grow">
				<div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<Card className="flex flex-col justify-center h-64">
						<Card.Content>
							<h1>Build in public.</h1>
							<p className="text-gray-700">
								Makerlog is where developers and designers ship
								better products together.
							</p>
						</Card.Content>
					</Card>
				</div>
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

ContainedMock.getInitialProps = {
	layout: {
		layout: "none",
	},
};

export default ContainedMock;
