import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NarrowLayout extends Component {
	state = { scrolled: false };

	static async getInitialProps(ctx) {
		return {
			layout: {
				layout: "object",
			},
		};
	}

	handleScroll = (e) => {
		let scrollTop =
			window.pageYOffset ||
			(
				document.documentElement ||
				document.body.parentNode ||
				document.body
			).scrollTop;
		if (scrollTop >= 100) {
			this.setState({
				scrolled: true,
			});
		} else {
			this.setState({
				scrolled: false,
			});
		}
	};

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	render() {
		return (
			<div>
				<div className="bg-gray-100 min-h-screen flex flex-col">
					<div>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-3xl mx-auto bg-white border-b border-r border-l border-gray-200">
								<img
									src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
									className="object-cover h-48 w-full"
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="sticky top-0 z-50">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
							<div className="max-w-3xl mx-auto  bg-gray-50 border-b border-r border-l border-gray-200 ">
								<div
									className={
										"flex p-4" +
										(this.state.scrolled
											? " items-center"
											: "")
									}
								>
									<div className="flex min-w-0">
										<img
											className="h-12 w-12 rounded-full mr-4"
											src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
											alt=""
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h2 className="text-xl font-bold text-gray-900  sm:truncate">
											Sergio Mattei{" "}
											<span className="font-normal text-gray-500">
												@sergio
											</span>
										</h2>
										{!this.state.scrolled && (
											<>
												<p className="text-gray-700 mb-1">
													I create products people
													love.
												</p>
												<small className="text-sm text-gray-500">
													<span className="mr-2">
														🔥 2 day streak
													</span>
												</small>
											</>
										)}
									</div>
									<div className="ml-4 flex items-center justify-between">
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none active:bg-green-700 transition ease-in-out duration-150"
										>
											Follow
										</button>
									</div>
								</div>
								<div className="navbar-middle flex-grow flex flex-row items-center h-full">
									<div className="flex-1 py-4 pt-2 flex-grow text-center font-bold border-b-2 border-green-500 text-green-500 h-full flex items-center justify-center">
										Log
									</div>
									<div className="flex-1 py-4 pt-2 flex-grow text-center font-semibold text-gray-600 h-full flex items-center justify-center">
										Products
									</div>
									<div className="flex-1 py-4 pt-2 flex-grow text-center font-semibold text-gray-600 h-full flex items-center justify-center">
										Discussions
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full h-full flex flex-col">
						<div className="w-full flex-grow max-w-3xl mx-auto bg-gray-50 border-b border-r border-l border-gray-200 p-4">
							<div className="editor bg-white rounded-md mb-4 shadow-xs">
								<div className="Post">
									<div className="actor p-4 text-gray-50 flex">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-gray-800 text-sm leading-5 font-medium">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-gray-500 text-sm leading-5 truncate">
													<span className="mr-2">
														@sergio
													</span>
													<span className="mr-2">
														🔥 2 day streak
													</span>
												</p>
											</div>
										</div>
										<div className="flex-grow"></div>
										<div className="text-gray-400">
											<FontAwesomeIcon icon="caret-down" />
										</div>
									</div>
									<div className="object px-4 py-4 pt-0 ">
										<div className="task text-lg font-semibold mb-1 text-gray-900">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="actions p-4 pt-0">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="ml-2 flex relative z-0 overflow-hidden">
													<img
														className="relative z-30 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="editor bg-white rounded-md mb-4 shadow-xs">
								<div className="Post">
									<div className="actor p-4 text-gray-50 flex">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-gray-800 text-sm leading-5 font-medium">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-gray-500 text-sm leading-5 truncate">
													<span className="mr-2">
														@sergio
													</span>
													<span className="mr-2">
														🔥 2 day streak
													</span>
												</p>
											</div>
										</div>
										<div className="flex-grow"></div>
										<div className="text-gray-400">
											<FontAwesomeIcon icon="caret-down" />
										</div>
									</div>
									<div className="object px-4 py-4 pt-0 ">
										<div className="task text-lg font-semibold mb-1 text-gray-900">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="actions p-4 pt-0">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="ml-2 flex relative z-0 overflow-hidden">
													<img
														className="relative z-30 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="editor bg-white rounded-md mb-4 shadow-xs">
								<div className="Post">
									<div className="actor p-4 text-gray-50 flex">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-gray-800 text-sm leading-5 font-medium">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-gray-500 text-sm leading-5 truncate">
													<span className="mr-2">
														@sergio
													</span>
													<span className="mr-2">
														🔥 2 day streak
													</span>
												</p>
											</div>
										</div>
										<div className="flex-grow"></div>
										<div className="text-gray-400">
											<FontAwesomeIcon icon="caret-down" />
										</div>
									</div>
									<div className="object px-4 py-4 pt-0 ">
										<div className="task text-lg font-semibold mb-1 text-gray-900">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="actions p-4 pt-0">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="ml-2 flex relative z-0 overflow-hidden">
													<img
														className="relative z-30 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="editor bg-white rounded-md mb-4 shadow-xs">
								<div className="Post">
									<div className="actor p-4 text-gray-50 flex">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-gray-800 text-sm leading-5 font-medium">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-gray-500 text-sm leading-5 truncate">
													<span className="mr-2">
														@sergio
													</span>
													<span className="mr-2">
														🔥 2 day streak
													</span>
												</p>
											</div>
										</div>
										<div className="flex-grow"></div>
										<div className="text-gray-400">
											<FontAwesomeIcon icon="caret-down" />
										</div>
									</div>
									<div className="object px-4 py-4 pt-0 ">
										<div className="task text-lg font-semibold mb-1 text-gray-900">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="actions p-4 pt-0">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="ml-2 flex relative z-0 overflow-hidden">
													<img
														className="relative z-30 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="-ml-0.5 mr-2 h-4 w-4">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{this.state.scrolled && (
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-3xl mx-auto relative">
								<div className="max-w-3xl border border-gray-200 border-bottom-0 fixed z-50 bottom-0 bg-white p-4 w-full pin-c-x flex flex-row items-center">
									<div className="flex-1 font-semibold">
										Commit to building in public today.
									</div>
									<div>
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none active:bg-green-700 transition ease-in-out duration-150"
										>
											Join Makerlog
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
