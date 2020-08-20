import Link from "next/link";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbingBoxLoader from "../vendor/ClimbingBoxLoader";

const IndexPage = () => {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="bg-gray-100">
        <nav className="h-16 bg-white border-b border-gray-200  px-4 flex flex-row fixed left-0  w-full top-0 z-50">
          <div className="navbar-left flex-none flex flex-row md:w-72">
            <div className="flex flex-center items-center justify-center mr-4 md:hidden">
              <FontAwesomeIcon icon="bars" />
            </div>
            <div className="logo flex flex-center items-center justify-center mr-4 text-main-500">
              <FontAwesomeIcon icon="check-circle" />
            </div>
          </div>
          <div className="navbar-middle self-center w-full h-full flex justify-center">
            <div className="menu max-w-3xl  hidden md:flex items-center h-full flex-grow">
              <div className="hover:bg-main-100 cursor-pointer flex-1 text-center font-semibold border-b-2 border-main-500 text-main-500 h-full flex items-center justify-center  transition ease-in-out duration-150">
                Explore
              </div>
              <div className="hover:bg-main-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
                Stories
              </div>
              <div className="hover:bg-main-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
                More
              </div>
            </div>
          </div>
          <div className="navbar-right flex-none flex items-center flex-row justify-end md:w-72">
            <div
              className="px-4 text-center font-semibold text-gold-600 h-full flex items-center justify-center"
              onClick={(e) => setFailed(!failed)}
            >
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
          <div>
            <div className="hidden md:block w-72 pt-16 pb-4 flex flex-col flex-grow border-r border-gray-200 max-h-screen bg-white overflow-y-auto h-full left-0 top-0 sticky">
              <div className="py-4">
                <div className="cursor-pointer p-4 py-3 text-gray-900 bg-main-100 font-semibold border-l-2 box-border border-main-500 ">
                  Log
                </div>
                <div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-main-100 font-semibold">
                  Discussions
                </div>
                <div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-main-100 font-semibold">
                  Chat
                </div>
                <div className="cursor-pointer p-4 py-3 text-gray-700 hover:bg-main-100 font-semibold">
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
              </div>
            </div>
          </div>

          {loading ? (
            <div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow ">
              <div className="max-w-3xl mx-auto ">
                <div className="editor bg-white rounded-md p-4 mb-4 shadow-xs relative overflow-hidden">
                  <center>
                    <div className="mb-2">
                      <ClimbingBoxLoader />
                    </div>
                    <span className="font-semibold text-sm">
                      Loading the makerness...
                    </span>
                  </center>
                </div>
              </div>
            </div>
          ) : failed ? (
            <div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow ">
              <div className="max-w-3xl mx-auto ">
                <div className="editor bg-white rounded-md p-4 mb-4 shadow-xs relative overflow-hidden">
                  <div className="nyan absolute right-1 top-6 opacity-50 ">
                    <img
                      className="h-48 transform -rotate-45"
                      style={{ "--transform-rotate": "-25deg" }}
                      src="https://lh3.googleusercontent.com/proxy/JnApuuSA3rYDaFG5s09mFriT-ZYYTTVK9mqjaubhzIMBWJgtHrn888aHOIol3Hf1rs3lZsK9eUrZ-zEGF6T5NQrqbAN59meDumsGAizYy8QPXDu8go9L"
                      alt=""
                    />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Oops, something went wrong.
                  </h1>
                  <p className="mb-4 text-gray-700">
                    A network error ocurred and the feed couldn't load.
                  </p>
                  <div className="flex">
                    <div className="mr-2">
                      <button
                        onClick={(e) => setFailed(false)}
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-main-600 hover:bg-main-500 focus:outline-none active:bg-main-700 transition ease-in-out duration-150"
                      >
                        <span className="-ml-0.5 mr-2 h-4 w-4">
                          <FontAwesomeIcon icon="redo" />
                        </span>
                        Retry
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                      >
                        Report a problem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow ">
              <div className="max-w-3xl mx-auto ">
                <div>
                  <div className="editor bg-white rounded-md p-4 mb-4 shadow-xs">
                    <div className="mb-2 inline-flex">
                      <div className="text-sm mr-2 font-medium text-main-700">
                        Task
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Discussion
                      </div>
                    </div>
                    <div className="input-flex flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                        alt=""
                      />
                      <input
                        className="w-full bg-gray-100 p-2 rounded-md flex-grow"
                        type="text"
                        placeholder="Start typing something you've done or made..."
                      />
                    </div>
                  </div>

                  <div className="editor bg-white rounded-md p-4 mb-4 shadow-xs">
                    <h1 className="text-xl font-bold text-gray-900">
                      Set up notifications
                    </h1>
                    <p className="mb-4 text-gray-700">
                      Commit to building in public and set up streak
                      notifications to make sure you don't miss a day.
                    </p>
                    <div className="flex">
                      <div className="mr-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-main-600 hover:bg-main-500 focus:outline-none active:bg-main-700 transition ease-in-out duration-150"
                        >
                          Get started
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="editor bg-white rounded-md p-4 mb-4 shadow-xs">
                    <h3
                      className="mb-2 text-sm leading-4 font-medium text-gray-700"
                      id="projects-headline"
                    >
                      Top shippers today
                    </h3>
                    <div className="flex">
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-2"
                        src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-2"
                        src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-2"
                        src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 "
                        src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                        alt=""
                      />
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
                          <h2 className="text-gray-900 text-sm leading-5 font-medium">
                            Sergio Mattei{" "}
                            <span className="text-gray-700">
                              completed a task
                            </span>
                          </h2>
                          <p className="text-gray-500 text-sm leading-5 truncate">
                            <span className="mr-2">@sergio</span>
                            <span className="mr-2">🔥 2 day streak</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="text-gray-300">
                        <FontAwesomeIcon icon="caret-down" />
                      </div>
                    </div>
                    <div className="object px-4 py-4 pt-0 ">
                      <div className="task text-lg font-semibold mb-1 text-gray-900">
                        <span className="text-main-500">
                          <FontAwesomeIcon icon="check-circle" />
                        </span>{" "}
                        Completed an awesome work sprint
                      </div>
                      <p className="text-gray-700 ml-2 p-4 border-l border-gray-200">
                        I love doing what I do. Today I basically completed an
                        amazing new part of the Makerlog infrastructure, and I'm
                        really happy about it. I'm making a lot of progress
                        lately!
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
                          <h2 className="text-gray-900 text-sm leading-5 font-medium">
                            Sergio Mattei{" "}
                            <span className="text-gray-700">
                              completed a task
                            </span>
                          </h2>
                          <p className="text-gray-500 text-sm leading-5 truncate">
                            <span className="mr-2">@sergio</span>
                            <span className="mr-2">🔥 2 day streak</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="text-gray-300">
                        <FontAwesomeIcon icon="caret-down" />
                      </div>
                    </div>
                    <div className="object px-4 py-4 pt-0 ">
                      <div className="task text-lg font-semibold mb-1 text-gray-900">
                        <span className="text-main-500">
                          <FontAwesomeIcon icon="check-circle" />
                        </span>{" "}
                        Did something pretty cool.
                      </div>
                      <p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
                        I love doing what I do. Today I basically completed an
                        amazing new part of the Makerlog infrastructure, and I'm
                        really happy about it. I'm making a lot of progress
                        lately!
                      </p>
                    </div>
                    <div className="attachment bg-gray-100 border border-r-0 border-l-0 border-gray-200 bg-center">
                      <img
                        className="block"
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                        alt=""
                      />
                    </div>
                    <div className="actions p-4">
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
                          <h2 className="text-gray-900 text-sm leading-5 font-medium">
                            Sergio Mattei{" "}
                            <span className="text-gray-700">
                              completed a task
                            </span>
                          </h2>
                          <p className="text-gray-500 text-sm leading-5 truncate">
                            <span className="mr-2">@sergio</span>
                            <span className="mr-2">🔥 2 day streak</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="text-gray-300">
                        <FontAwesomeIcon icon="caret-down" />
                      </div>
                    </div>
                    <div className="object px-4 py-4 pt-0 ">
                      <div className="task text-lg font-semibold mb-1 text-gray-900">
                        <span className="text-main-500">
                          <FontAwesomeIcon icon="check-circle" />
                        </span>{" "}
                        Completed an awesome work sprint
                      </div>
                      <p className="text-gray-700 ml-2 p-4 border-l border-gray-200">
                        I love doing what I do. Today I basically completed an
                        amazing new part of the Makerlog infrastructure, and I'm
                        really happy about it. I'm making a lot of progress
                        lately!
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

                <div />
              </div>
            </div>
          )}

          <div>
            <div className="hidden md:block max-h-screen  pt-16 pb-4 sticky w-72 flex flex-col flex-grow border-l border-gray-200 bg-white overflow-y-auto min-h-screen h-full right-0 top-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
