import Card from "../components/ui/Card";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import { useAuth } from "stores/AuthStore";
import Editor from "components/editor/Editor";
import NarrowLayout from "layouts/NarrowLayout";
import { requiresOnboarding } from "utils/auth";
import OnboardingCard from "components/auth/OnboardingCard";
import { NextSeo } from "next-seo";
import SidebarNav from "components/ui/SidebarNav";
import { useState } from "react";
import LatestThreads from "components/discussions/LatestThreads";
import { getFrontpage, STATS_QUERIES, useFrontpage } from "queries/stats";
import StubTaskActivity from "components/tasks/StubTaskActivity";
import DayView from "components/tasks/DayView";
import PlaceholderState from "components/ui/PlaceholderState";
import Spinner from "components/ui/Spinner";
import MyStreakCard from "components/sidebars/MyStreakCard";
import StdSidebar from "components/sidebars/StdSidebar";
import TopStreaksCard from "components/sidebars/TopStreaksCard";
import RisingMakersCard from "components/sidebars/RisingMakersCard";
import UpcomingEventsCard from "components/sidebars/UpcomingEventsCard";
import PopularToday from "components/frontpage/PopularToday";
import RecentLaunches from "components/frontpage/RecentLaunches";
import LatestDiscussions from "components/frontpage/LatestDiscussions";
import LatestMilestones from "components/frontpage/LatestMilestones";
import FeaturedStory from "components/frontpage/FeaturedStory";
import { dehydrate } from "react-query/hydration";
import { makeQueryCache } from "react-query";
import Hero from "components/ui/Hero";
import Container from "components/ui/Container";
import FacebookLogin from "components/auth/FacebookLogin";
import TwitterLogin from "components/auth/TwitterLogin";
import ContentLayout from "layouts/ContentLayout";
import config from "config";
import Button from "components/ui/Button";
import { Link } from "routes";
import { useRoot } from "stores/RootStore";
import dynamic from "next/dynamic";
import OnboardingChecklistCard from "components/sidebars/OnboardingChecklistCard";

const RemindersCard = dynamic(
	() => import("../components/reminders/RemindersCard"),
	{ ssr: false }
);

function HomePage() {
	const { data: frontpage } = useFrontpage();

	return (
		<div>
			<Hero
				className="bg-bubbles-gradient"
				style={{
					padding: 0,
					marginBottom: 0,
				}}
			>
				<div className="flex items-stretch items-center w-full text-center sm:text-left">
					<div className="flex-1 flex-shrink-0 py-12 sm:pr-6 sm:py-48">
						<h1 className="text-2xl font-extrabold sm:text-4xl">
							How makers stay productive
						</h1>
						<p className="mb-8 text-gray-700">
							Makerlog is your task list made public. Get
							feedback, stay accountable and ship better products
							with us.
						</p>
						<div className="flex flex-col space-y-2">
							<div className="flex-initial">
								<TwitterLogin />
							</div>
							<div className="flex-initial">
								<FacebookLogin />
							</div>
						</div>
					</div>
					<div className="flex-1 flex-shrink-0 hidden w-full sm:block"></div>
				</div>
			</Hero>
			<div className="px-4 py-12 border-b border-gray-200 bg-gray-50">
				<Container>
					<div className="text-center">
						<h3 className="font-semibold">It's simple.</h3>
						<p className="mb-6 text-gray-700">
							Consistency & value is what makes you shine on
							Makerlog.
						</p>
					</div>

					<div className="max-w-lg mx-auto grid gap-4 lg:grid-cols-3 lg:max-w-none">
						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									1
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Log your daily tasks.
									</span>
									<span className="text-gray-700">
										Share your completed tasks publicly to
										stay accountable.
									</span>
								</p>
							</div>
						</div>

						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									2
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Earn a streak.
									</span>
									<span className="text-gray-700">
										A streak is the count of consecutive
										days of completed tasks.
									</span>
								</p>
							</div>
						</div>

						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									3
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Learn & grow.
									</span>
									<span className="text-gray-700">
										Share your achievements, encourage
										others, and grow with us.
									</span>
								</p>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<ContentLayout
				rightSidebar={
					<>
						<StdSidebar />
						<TopStreaksCard />
						<RisingMakersCard />
						<UpcomingEventsCard />
					</>
				}
			>
				<FeaturedStory frontpage={frontpage} />
				<RecentLaunches frontpage={frontpage} />
				<LatestMilestones frontpage={frontpage} />
				<LatestDiscussions frontpage={frontpage} />
				<PopularToday frontpage={frontpage} />
				<h3 className="mb-2 font-semibold">Latest tasks</h3>
				<KeyActivityFeed userId={-1} feed="site" />
			</ContentLayout>
		</div>
	);
}

function FeedPage() {
	const FEEDS = {
		FRONTPAGE: 1,
		USER_TASKS: 2,
		DISCUSSIONS: 3,
		ALL_TASKS: 4,
		POPULAR_TODAY: 5,
		FOLLOWING: 6,
	};
	const { isOnboarding } = useRoot();
	const [feed, setFeed] = useState(FEEDS.FRONTPAGE);
	const { user } = useAuth();
	const { isLoading, data: frontpage } = useFrontpage();

	return (
		<Container className="py-4">
			<NarrowLayout
				leftSidebar={
					requiresOnboarding(user) || isOnboarding ? null : (
						<SidebarNav>
							<p className="heading">Feeds</p>
							<SidebarNav.Button
								onClick={() => setFeed(FEEDS.FRONTPAGE)}
								active={feed === FEEDS.FRONTPAGE}
							>
								Everyone
							</SidebarNav.Button>
							<SidebarNav.Button
								onClick={() => setFeed(FEEDS.FOLLOWING)}
								active={feed === FEEDS.FOLLOWING}
							>
								Following
							</SidebarNav.Button>
							<SidebarNav.Button
								onClick={() => setFeed(FEEDS.POPULAR_TODAY)}
								active={feed === FEEDS.POPULAR_TODAY}
							>
								Top today
							</SidebarNav.Button>
							<p className="mt-2 heading">You</p>
							<SidebarNav.Button
								onClick={() => setFeed(FEEDS.USER_TASKS)}
								active={feed === FEEDS.USER_TASKS}
							>
								Tasks
							</SidebarNav.Button>
						</SidebarNav>
					)
				}
				rightSidebar={
					<>
						<MyStreakCard />
						<OnboardingChecklistCard />
						<StdSidebar />
						<TopStreaksCard />
						<RisingMakersCard />
						<UpcomingEventsCard />
					</>
				}
			>
				{requiresOnboarding(user) || isOnboarding ? (
					<OnboardingCard />
				) : (
					<>
						<Card>
							<Card.Content>
								<Editor />
							</Card.Content>
						</Card>
						{feed === FEEDS.FRONTPAGE && (
							<>
								<RemindersCard />
								<div className="mb-4">
									<DayView small withHeader={false} />
								</div>

								{isLoading && (
									<PlaceholderState>
										<Spinner
											text="Curating the makerness..."
											small
										/>
									</PlaceholderState>
								)}

								<FeaturedStory frontpage={frontpage} />

								<LatestMilestones frontpage={frontpage} />

								<LatestDiscussions frontpage={frontpage} />

								<PopularToday frontpage={frontpage} />

								<h3 className="mb-2 font-semibold">
									Latest tasks
								</h3>
								<KeyActivityFeed userId={-1} feed="site" />
							</>
						)}
						{feed === FEEDS.POPULAR_TODAY && (
							<>
								{isLoading && (
									<PlaceholderState>
										<Spinner
											text="Curating the makerness..."
											small
										/>
									</PlaceholderState>
								)}
								{frontpage && frontpage.tasks && (
									<div className="mb-4">
										<h3 className="mb-2 font-semibold">
											Top tasks today
										</h3>
										{frontpage.tasks.map((task) => (
											<StubTaskActivity
												task={task}
												key={task.id}
											/>
										))}
									</div>
								)}
							</>
						)}
						{feed === FEEDS.ALL_TASKS && (
							<KeyActivityFeed userId={-1} feed="site" />
						)}
						{feed === FEEDS.USER_TASKS && (
							<>
								<div className="mb-4">
									<DayView withHeader={false} />
								</div>
								<h3 className="mb-2 font-semibold">Your log</h3>
								<KeyActivityFeed
									userId={user.id}
									feed="tasks"
								/>
							</>
						)}
						{feed === FEEDS.DISCUSSIONS && <LatestThreads />}
						{feed === FEEDS.FOLLOWING && (
							<KeyActivityFeed userId={user.id} feed="timeline" />
						)}
					</>
				)}
				<NextSeo title="Feed" />
			</NarrowLayout>
		</Container>
	);
}

function IndexPage() {
	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? <HomePage /> : <FeedPage />;
}

IndexPage.getInitialProps = async () => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery([STATS_QUERIES.getFrontpage], getFrontpage);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			footer: false,
			contained: false,
		},
	};
};

export default IndexPage;
