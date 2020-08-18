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
          <div className="p-4">
            <div className="p-2 py-3 text-gray-800 bg-gray-100 rounded-md font-semibold mb-1">
              Log
            </div>
            <div className="p-2 py-3 text-gray-600 hover:bg-gray-100 rounded-md font-semibold mb-1">
              Discussions
            </div>
            <div className="p-2 py-3 text-gray-600 hover:bg-gray-100 rounded-md font-semibold mb-1">
              Chat
            </div>
            <div className="p-2 py-3 text-gray-600 hover:bg-gray-100 rounded-md font-semibold mb-1">
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

      <div className="pt-20 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-3xl mx-auto ">
          <div className="editor bg-white rounded-md p-4 mb-8">
            <div className="mb-2 inline-flex">
              <div className="text-sm mr-2 font-medium text-gray-700">Task</div>
              <div className="text-sm text-gray-400 font-medium">
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

          <h3 className="text-lg font-semibold mb-4">Featured</h3>
          <div className="flex flex-col md:flex-row mb-8">
            <div className="editor bg-white rounded-md p-4 flex-1 mr-4 flex flex-col justify-center">
              <h3
                className="pb-1 text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider"
                id="projects-headline"
              >
                Discussion
              </h3>
              <h2 className="font-semibold text-lg">
                How do you build your projects?
              </h2>
              <p className="text-gray-600">
                I like to build projects, but I don't know where to start...
              </p>
            </div>
            <div className="editor bg-white rounded-md p-4 flex-1 flex flex-col justify-center">
              <h3
                className="pb-1 text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider"
                id="projects-headline"
              >
                Story
              </h3>
              <h2 className="font-semibold text-lg">
                How I bootstrapped a SaaS to $2k MRR
              </h2>
              <p className="text-gray-600">Shit, I did that.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Today on Makerlog</h3>
          <div className="editor bg-white rounded-md p-4 mb-8">Hai</div>
        </div>
      </div>

      <div>
        <div className="hidden md:block max-h-screen  pt-16 pb-4 sticky w-72 flex flex-col flex-grow border-l border-gray-200 bg-white overflow-y-auto min-h-screen h-full right-0 top-0"></div>
      </div>
    </div>
  </div>
);

export default IndexPage;
