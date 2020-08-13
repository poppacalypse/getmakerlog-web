import Link from "next/link";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IndexPage = () => (
  <div className="bg-gray-100 min-h-screen">
    <nav className="h-16 bg-white border-b border-gray-200 px-4 flex flex-row fixed left-0  w-full top-0 z-50">
      <div className="navbar-left flex-1 flex flex-row w-full">
        <div className="flex flex-center items-center justify-center mr-4 sm:hidden">
          <FontAwesomeIcon icon="bars" />
        </div>
        <div className="logo flex flex-center items-center justify-center mr-4">
          <FontAwesomeIcon icon="check-circle" />
        </div>
        <div className="flex-1 flex flex-center items-center justify-center mr-4">
          <input
            type="text"
            placeholder="Search makers, projects, stories, or topics..."
            className="input input-lg block w-full"
          />
        </div>
      </div>
      <div className="navbar-middle hidden sm:flex-auto"></div>
      <div className="navbar-right flex-initial sm:flex-1 flex items-center flex-row justify-end">
        <div className="mr-8">
          <button className="rounded-full text-white bg-green-600 px-4 py-2">
            New
          </button>
        </div>
        <div className="flex flex-center items-center justify-center text-gray-600 mr-8">
          <FontAwesomeIcon icon="bell" />
        </div>
        <div>
          <div className="chip flex flex-row rounded-full bg-gray-100">
            <div className="flex flex-center items-center justify-center mr-2">
              <img
                className="h-8 w-8 rounded-full"
                src="https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-center items-center justify-center text-gray-600 pr-2">
              🔥 45
            </div>
            <div className="flex flex-center items-center justify-center text-gray-400 pr-2">
              <FontAwesomeIcon icon="caret-down" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div>
      <div className="pt-20 w-64 flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto fixed h-full left-0 top-0">
        <div className="flex items-center flex-shrink-0 px-4">ML</div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 bg-white">
            <div className="space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 group-focus:bg-gray-200 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Team
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Projects
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                Documents
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Reports
              </a>
            </div>
            <div className="mt-8">
              <h3
                className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                id="projects-headline"
              >
                Projects
              </h3>
              <div
                className="mt-1 space-y-1"
                role="group"
                aria-labelledby="projects-headline"
              >
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Website redesign</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">GraphQL API</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Customer migration guides</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Profit sharing program</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="min-h-screen max-w-3xl mx-auto bg-white">x</div>
    </div>

    <div>
      <div className="pt-20 w-64 flex flex-col flex-grow border-l border-gray-200 pt-5 pb-4 bg-white overflow-y-auto fixed h-full right-0 top-0">
        <div className="flex items-center flex-shrink-0 px-4">ML</div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 bg-white">
            <div className="space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 group-focus:bg-gray-200 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Team
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Projects
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                Documents
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Reports
              </a>
            </div>
            <div className="mt-8">
              <h3
                className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                id="projects-headline"
              >
                Projects
              </h3>
              <div
                className="mt-1 space-y-1"
                role="group"
                aria-labelledby="projects-headline"
              >
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Website redesign</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">GraphQL API</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Customer migration guides</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <span className="truncate">Profit sharing program</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
);

export default IndexPage;
