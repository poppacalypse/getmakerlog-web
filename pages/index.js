import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import ErrorCard from "components/ui/ErrorCard";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import Editor from "components/editor/Editor";
import NarrowLayout from "layouts/NarrowLayout";
import { requiresOnboarding } from "utils/auth";
import OnboardingCard from "components/auth/OnboardingCard";
import { NextSeo } from "next-seo";
import SidebarNav from "components/ui/SidebarNav";
import { useState } from "react";
import LatestThreads from "components/discussions/LatestThreads";
import PostCard from "components/stories/PostCard";
import { useFrontpage } from "queries/stats";
import StubTaskActivity from "components/tasks/StubTaskActivity";
import Thread from "components/discussions/Thread";
import DayView from "components/tasks/DayView";
import PlaceholderState from "components/ui/PlaceholderState";
import Spinner from "components/ui/Spinner";
import MyStreakCard from "components/sidebars/MyStreakCard";
import StdSidebar from "components/sidebars/StdSidebar";
import TopStreaksCard from "components/sidebars/TopStreaksCard";
import RisingMakersCard from "components/sidebars/RisingMakersCard";
import UpcomingEventsCard from "components/sidebars/UpcomingEventsCard";

function FeedPage() {
	const FEEDS = {
		FRONTPAGE: 1,
		USER_TASKS: 2,
		DISCUSSIONS: 3,
		ALL_TASKS: 4,
	};
	const [feed, setFeed] = useState(FEEDS.FRONTPAGE);
	const { user } = useAuth();
	const { isLoading, data: frontpage } = useFrontpage();

	return (
		<NarrowLayout
			leftSidebar={
				requiresOnboarding(user) ? null : (
					<SidebarNav>
						<p className="heading">Feeds</p>
						<SidebarNav.Button
							onClick={() => setFeed(FEEDS.FRONTPAGE)}
							active={feed === FEEDS.FRONTPAGE}
						>
							Frontpage
						</SidebarNav.Button>
						<SidebarNav.Button
							onClick={() => setFeed(FEEDS.ALL_TASKS)}
							active={feed === FEEDS.ALL_TASKS}
						>
							Tasks
						</SidebarNav.Button>
						<SidebarNav.Button
							onClick={() => setFeed(FEEDS.DISCUSSIONS)}
							active={feed === FEEDS.DISCUSSIONS}
						>
							Discussions
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
					<StdSidebar />
					<TopStreaksCard />
					<RisingMakersCard />
					<UpcomingEventsCard />
				</>
			}
		>
			{requiresOnboarding(user) ? (
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
							{isLoading && (
								<PlaceholderState>
									<Spinner
										text="Curating the makerness..."
										small
									/>
								</PlaceholderState>
							)}
							{frontpage && frontpage.featuredPost && (
								<div className="mb-4">
									<h3 className="mb-2 font-semibold">
										On Makerlog Stories
									</h3>
									<PostCard post={frontpage.featuredPost} />
								</div>
							)}

							{frontpage && frontpage.threads && (
								<div className="mb-4">
									<h3 className="mb-2 font-semibold">
										Jump right in
									</h3>
									<Thread thread={frontpage.threads[0]} />
								</div>
							)}

							{frontpage && frontpage.tasks && (
								<div className="mb-4">
									<h3 className="mb-2 font-semibold">
										Popular today
									</h3>
									{frontpage.tasks.slice(0, 1).map((task) => (
										<StubTaskActivity
											task={task}
											key={task.id}
										/>
									))}
								</div>
							)}

							<h3 className="mb-2 font-semibold">
								Latest on Makerlog
							</h3>
							<KeyActivityFeed userId={-1} feed="site" />
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
							<KeyActivityFeed userId={user.id} feed="tasks" />
						</>
					)}
					{feed === FEEDS.DISCUSSIONS && <LatestThreads />}
				</>
			)}
			<NextSeo title="Feed" />
		</NarrowLayout>
	);
}

function IndexPage() {
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return (
			<ErrorCard
				title="Welcome to Area51."
				message="This is an experimental Makerlog project. Here be dragons."
				actions={
					<Link route="login">
						<Button primary>Sign in</Button>
					</Link>
				}
			/>
		);
	}

	return <FeedPage />;
}

IndexPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
			footer: false,
		},
	};
};

export default IndexPage;
