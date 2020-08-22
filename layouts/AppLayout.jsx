import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer, inject } from "mobx-react";
import UserMedia from "components/ui/UserMedia";
import ErrorCard from "components/ui/ErrorCard";
import Button from "components/ui/Button";

@inject("auth")
@observer
class AppLayout extends Component {
	render() {
		return (
			<div className="AppLayout Page bg-gray-100 min-h-screen">
				<nav className="h-16 bg-white border-b border-gray-200  px-4 flex flex-row fixed left-0  w-full top-0 z-50">
					<div className="navbar-left flex-none flex flex-row md:w-72">
						<div className="flex flex-center items-center justify-center mr-4 md:hidden">
							<FontAwesomeIcon icon="bars" />
						</div>
						<div className="logo flex flex-center items-center justify-center mr-4 text-green-500">
							<FontAwesomeIcon icon="check-circle" />
						</div>
					</div>
					<div className="navbar-middle self-center w-full h-full flex justify-center">
						<div className="menu max-w-3xl  hidden md:flex items-center h-full flex-grow">
							<div className="hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold border-b-2 border-green-500 text-green-500 h-full flex items-center justify-center  transition ease-in-out duration-150">
								Explore
							</div>
							<div className="hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
								Stories
							</div>
							<div className="hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
								More
							</div>
						</div>
					</div>
					<div className="navbar-right flex-none flex items-center flex-row justify-end md:w-72">
						<div className="px-4 text-center font-semibold text-gold-600 h-full flex items-center justify-center">
							Get Gold
						</div>
						<div className="pl-4">
							<img
								className="h-8 w-8 rounded-full"
								src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
								alt=""
							/>
						</div>
					</div>
				</nav>

				<div className="flex">
					{this.props.auth.isLoggedIn ? (
						<div>
							<div className="hidden md:block w-72 pt-16 pb-0 flex flex-col flex-grow border-r border-gray-200 max-h-screen bg-white overflow-y-auto h-full left-0 top-0 sticky">
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
												user={this.props.auth.user}
												actions={
													<small className="text-xs">
														<a>Settings</a> ·{" "}
														<a>Log out</a>
													</small>
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}

					<div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow ">
						<div className="Container max-w-3xl mx-auto">
							{this.props.auth.isLoggedIn ? (
								this.props.children
							) : (
								<ErrorCard statusCode={403} />
							)}
						</div>
					</div>

					{this.props.auth.isLoggedIn ? (
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
									<p className="text-green-700 text-sm">
										Create attention-grabbing headlines
										without a marketer.
									</p>
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
										</a>{" "}
										·{" "}
										<a className="text-green-500">Legal</a>{" "}
										·{" "}
										<a className="text-green-500">
											Twitter
										</a>{" "}
										·{" "}
										<a className="text-green-500">
											Advertise
										</a>
									</small>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default AppLayout;
