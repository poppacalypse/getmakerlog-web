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

function IndexPage() {
	const { isLoggedIn, user } = useAuth();

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

	return (
		<NarrowLayout>
			{requiresOnboarding(user) ? (
				<OnboardingCard />
			) : (
				<>
					<Card>
						<Card.Content>
							<Editor />
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							{" "}
							<h3 className="font-bold text-gray-900">
								Set up notifications
							</h3>
							<p className="mb-4 text-gray-700">
								Commit to building in public and set up streak
								notifications to make sure you don't miss a day.
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
					<KeyActivityFeed userId={-1} feed="site" />
				</>
			)}
		</NarrowLayout>
	);
}

IndexPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
		},
	};
};

export default IndexPage;
