import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbingBoxLoader from "../vendor/ClimbingBoxLoader";
import AppLayout from "../layouts/AppLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { inject, observer } from "mobx-react";
import Avatar from "components/ui/Avatar";

const IndexPage = inject("auth")(
  observer((props) => {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    if (!props.auth.isLoggedIn) {
      return null;
    }

    return (
      <AppLayout>
        <div>
          <Card>
            <Card.Content>
              <div className="mb-2 inline-flex">
                <small>
                  <div className="mr-2 font-medium text-main-700">Task</div>
                  <div className="text-gray-500 font-medium">Discussion</div>
                </small>
              </div>
              <div className="input-flex flex items-center">
                <span className="mr-2">
                  <Avatar
                    size={8}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
                <input
                  className="w-full bg-gray-100 p-2 rounded-md flex-grow"
                  type="text"
                  placeholder="Start typing something you've done or made..."
                />
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              {" "}
              <h3 className="font-bold text-gray-900">Set up notifications</h3>
              <p className="mb-4 text-gray-700">
                Commit to building in public and set up streak notifications to
                make sure you don't miss a day.
              </p>
              <div className="flex">
                <div className="mr-2">
                  <Button primary>Get started</Button>
                </div>
                <div>
                  <Button>Later</Button>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <h3
                className="mb-2 text-sm leading-4 font-medium text-gray-700"
                id="projects-headline"
              >
                Top shippers today
              </h3>
              <div className="flex">
                <span className="mr-2">
                  <Avatar
                    size={10}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
                <span className="mr-2">
                  <Avatar
                    size={10}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
                <span className="mr-2">
                  <Avatar
                    size={10}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
                <span className="mr-2">
                  <Avatar
                    size={10}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
                <span className="mr-2">
                  <Avatar
                    size={10}
                    user={{
                      username: "sergio",
                      avatar:
                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
                    }}
                  />
                </span>
              </div>
            </Card.Content>
          </Card>

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
                      <span className="text-gray-700">completed a task</span>
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
                  I love doing what I do. Today I basically completed an amazing
                  new part of the Makerlog infrastructure, and I'm really happy
                  about it. I'm making a lot of progress lately!
                </p>
              </div>
              <div className="actions p-4 pt-0">
                {" "}
                {/** need to do pt-0 because it has no attachment! */}
                <span className="inline-flex rounded-md">
                  <span className="mr-2">
                    <Button sm>
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
                    </Button>
                  </span>

                  <span className="mr-2">
                    <Button sm>
                      <span className="-ml-0.5 mr-2 h-4 w-4">
                        <FontAwesomeIcon icon="comment" />
                      </span>
                      Comment
                    </Button>
                  </span>

                  <span className="mr-2">
                    <Button sm>
                      <span className="-ml-0.5 mr-2 h-4 w-4">
                        <FontAwesomeIcon icon="ellipsis-v" />
                      </span>
                      More
                    </Button>
                  </span>
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
                      <span className="text-gray-700">completed a task</span>
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
                      <span className="text-gray-700">completed a task</span>
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
        </div>
      </AppLayout>
    );
  })
);

export default IndexPage;
