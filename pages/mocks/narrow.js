import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NarrowLayout extends Component {
	state = { scrolled: false };

	static async getInitialProps() {
		return {
			layout: {
				layout: "object",
			},
		};
	}

	handleScroll = () => {
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
				<div className="flex flex-col min-h-screen bg-gray-100">
					<div>
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
							<div className="max-w-3xl mx-auto bg-white border-b border-l border-r border-gray-200">
								<img
									src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
									className="object-cover w-full h-48"
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="sticky top-0 z-50">
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
							<div className="max-w-3xl mx-auto border-b border-l border-r border-gray-200 bg-gray-50">
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
											className="w-12 h-12 mr-4 rounded-full"
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
												<p className="mb-1 text-gray-700">
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
									<div className="flex items-center justify-between ml-4">
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 border border-transparent leading-4 rounded-md hover:bg-green-500 focus:outline-none active:bg-green-700 transition ease-in-out duration-150"
										>
											Follow
										</button>
									</div>
								</div>
								<div className="flex flex-row items-center flex-grow h-full navbar-middle">
									<div className="flex items-center justify-center flex-1 flex-grow h-full py-4 pt-2 font-bold text-center text-green-500 border-b-2 border-green-500">
										Log
									</div>
									<div className="flex items-center justify-center flex-1 flex-grow h-full py-4 pt-2 font-semibold text-center text-gray-600">
										Products
									</div>
									<div className="flex items-center justify-center flex-1 flex-grow h-full py-4 pt-2 font-semibold text-center text-gray-600">
										Discussions
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col flex-grow w-full h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="flex-grow w-full max-w-3xl p-4 mx-auto border-b border-l border-r border-gray-200 bg-gray-50">
							<div className="mb-4 bg-white editor rounded-md shadow-xs">
								<div className="Post">
									<div className="flex p-4 actor text-gray-50">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-sm font-medium text-gray-800 leading-5">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-sm text-gray-500 truncate leading-5">
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
									<div className="px-4 py-4 pt-0 object">
										<div className="mb-1 text-lg font-semibold text-gray-900 task">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="p-4 ml-2 text-gray-800 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="p-4 pt-0 actions">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="relative z-0 flex ml-2 overflow-hidden">
													<img
														className="relative z-30 inline-block w-4 h-4 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="mb-4 bg-white editor rounded-md shadow-xs">
								<div className="Post">
									<div className="flex p-4 actor text-gray-50">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-sm font-medium text-gray-800 leading-5">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-sm text-gray-500 truncate leading-5">
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
									<div className="px-4 py-4 pt-0 object">
										<div className="mb-1 text-lg font-semibold text-gray-900 task">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="p-4 ml-2 text-gray-800 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="p-4 pt-0 actions">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="relative z-0 flex ml-2 overflow-hidden">
													<img
														className="relative z-30 inline-block w-4 h-4 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="mb-4 bg-white editor rounded-md shadow-xs">
								<div className="Post">
									<div className="flex p-4 actor text-gray-50">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-sm font-medium text-gray-800 leading-5">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-sm text-gray-500 truncate leading-5">
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
									<div className="px-4 py-4 pt-0 object">
										<div className="mb-1 text-lg font-semibold text-gray-900 task">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="p-4 ml-2 text-gray-800 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="p-4 pt-0 actions">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="relative z-0 flex ml-2 overflow-hidden">
													<img
														className="relative z-30 inline-block w-4 h-4 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="ellipsis-v" />
												</span>
												More
											</button>
										</span>
									</div>
								</div>
							</div>

							<div className="mb-4 bg-white editor rounded-md shadow-xs">
								<div className="Post">
									<div className="flex p-4 actor text-gray-50">
										<div className="flex items-center justify-between space-x-3">
											<img
												className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
												src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
												alt=""
											/>
											<div className="flex-1">
												<h2 className="text-sm font-medium text-gray-800 leading-5">
													Sergio Mattei{" "}
													<span className="text-gray-600">
														completed a task
													</span>
												</h2>
												<p className="text-sm text-gray-500 truncate leading-5">
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
									<div className="px-4 py-4 pt-0 object">
										<div className="mb-1 text-lg font-semibold text-gray-900 task">
											<span className="text-green-500">
												<FontAwesomeIcon icon="check-circle" />
											</span>{" "}
											Completed an awesome work sprint
										</div>
										<p className="p-4 ml-2 text-gray-800 border-l border-gray-200">
											I love doing what I do. Today I
											basically completed an amazing new
											part of the Makerlog infrastructure,
											and I'm really happy about it. I'm
											making a lot of progress lately!
										</p>
									</div>
									<div className="p-4 pt-0 actions">
										{" "}
										{/** need to do pt-0 because it has no attachment! */}
										<span className="inline-flex rounded-md shadow-sm">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="star" />
												</span>
												Praise
												<div className="relative z-0 flex ml-2 overflow-hidden">
													<img
														className="relative z-30 inline-block w-4 h-4 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-20 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-10 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
														alt=""
													/>
													<img
														className="relative z-0 inline-block w-4 h-4 -ml-1 text-white rounded-full shadow-solid"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
													<FontAwesomeIcon icon="comment" />
												</span>
												Comment
											</button>

											<button
												type="button"
												className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded leading-4 hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
											>
												<span className="w-4 h-4 mr-2 -ml-0.5">
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
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
							<div className="relative max-w-3xl mx-auto">
								<div className="fixed bottom-0 z-50 flex flex-row items-center w-full max-w-3xl p-4 bg-white border border-gray-200 border-bottom-0 pin-c-x">
									<div className="flex-1 font-semibold">
										Commit to building in public today.
									</div>
									<div>
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 border border-transparent leading-4 rounded-md hover:bg-green-500 focus:outline-none active:bg-green-700 transition ease-in-out duration-150"
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
