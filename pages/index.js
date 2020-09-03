import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Avatar from "components/ui/Avatar";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import ErrorCard from "components/ui/ErrorCard";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import Editor from "components/editor/Editor";

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

	return (
		<div>
			<Editor />

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

			<Card>
				<Card.Content>
					<h3
						className="mb-2 text-sm font-medium text-gray-700 leading-4"
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
			<KeyActivityFeed userId={-1} feed="timeline" />
		</div>
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
