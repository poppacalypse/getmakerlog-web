import Link from "next/link";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IndexPage = () => (
  <div className="bg-gray-100 min-h-screen">
    <nav className="h-16 bg-white border-b border-gray-200 px-4 flex flex-row fixed left-0  w-full top-0 z-50">
      <div className="navbar-left flex-1 flex flex-row w-full">
        <div className="flex flex-center items-center justify-center mr-4 md:hidden">
          <FontAwesomeIcon icon="bars" />
        </div>
        <div className="logo flex flex-center items-center justify-center mr-4">
          <FontAwesomeIcon icon="check-circle" />
        </div>
      </div>
      <div className="navbar-middle flex-grow hidden md:flex flex-row items-center max-w-3xl h-full">
        <div className="flex-grow text-center font-bold border-b-2 border-gray-800 h-full flex items-center justify-center">
          Explore
        </div>
        <div className="flex-grow text-center font-semibold text-gray-600 h-full flex items-center justify-center">
          Gold
        </div>
        <div className="flex-grow text-center font-semibold text-gray-600 h-full flex items-center justify-center">
          Stories
        </div>
        <div className="flex-grow text-center font-semibold text-gray-600 h-full flex items-center justify-center">
          More
        </div>
      </div>
      <div className="navbar-right flex-initial md:flex-1 flex items-center flex-row justify-end">
        <div>
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
            <div className="p-4 py-3 text-gray-800 bg-gray-100 font-semibold border-l-2 box-border border-black">
              Log
            </div>
            <div className="p-4 py-3 text-gray-600 hover:bg-gray-100 font-semibold">
              Discussions
            </div>
            <div className="p-4 py-3 text-gray-600 hover:bg-gray-100 font-semibold">
              Chat
            </div>
            <div className="p-4 py-3 text-gray-600 hover:bg-gray-100 font-semibold">
              Leaderboards
            </div>
            <div className="mt-8">
              <h3
                className="px-2 pb-2 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                id="projects-headline"
              >
                You
              </h3>
              <div className="px-2 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
                Tasks
              </div>
              <div className="px-2 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
                Products
              </div>
              <div className="px-2 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-md font-semibold mb-1">
                Integrations
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow ">
        <div className="max-w-3xl mx-auto ">
          <div className="editor bg-white rounded-md p-4 mb-8 shadow-xs">
            <div className="mb-2 inline-flex">
              <div className="text-sm mr-2 font-medium text-gray-700">Task</div>
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

          <div className="editor bg-white rounded-md p-4 mb-8 shadow-xs">
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

          <div className="editor bg-white rounded-md mb-8 shadow-xs">
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
                      <span className="text-gray-600">completed a task</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-5 truncate">
                      <span className="mr-2">@sergio</span>
                      <span className="mr-2">🔥 2 day streak</span>
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
                  <FontAwesomeIcon icon="check-circle" /> Completed an awesome
                  work sprint
                </div>
                <p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
                  I love doing what I do. Today I basically completed an amazing
                  new part of the Makerlog infrastructure, and I'm really happy
                  about it. I'm making a lot of progress lately!
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

          <div className="editor bg-white rounded-md mb-8 shadow-xs">
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
                      <span className="text-gray-600">completed a task</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-5 truncate">
                      <span className="mr-2">@sergio</span>
                      <span className="mr-2">🔥 2 day streak</span>
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
                  <FontAwesomeIcon icon="check-circle" /> Did something pretty
                  cool.
                </div>
                <p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
                  I love doing what I do. Today I basically completed an amazing
                  new part of the Makerlog infrastructure, and I'm really happy
                  about it. I'm making a lot of progress lately!
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

          <div className="editor bg-white rounded-md mb-8 shadow-xs">
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
                      <span className="text-gray-600">completed a task</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-5 truncate">
                      <span className="mr-2">@sergio</span>
                      <span className="mr-2">🔥 2 day streak</span>
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
                  <FontAwesomeIcon icon="check-circle" /> Completed an awesome
                  work sprint
                </div>
                <p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
                  I love doing what I do. Today I basically completed an amazing
                  new part of the Makerlog infrastructure, and I'm really happy
                  about it. I'm making a lot of progress lately!
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

      <div>
        <div className="hidden md:block max-h-screen  pt-16 pb-4 sticky w-72 flex flex-col flex-grow border-l border-gray-200 bg-white overflow-y-auto min-h-screen h-full right-0 top-0"></div>
      </div>
    </div>
  </div>
);

export default IndexPage;
