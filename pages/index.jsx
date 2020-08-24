import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbingBoxLoader from "../vendor/ClimbingBoxLoader";
import AppLayout from "../layouts/AppLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { inject, observer } from "mobx-react";
import Avatar from "components/ui/Avatar";
import FaceStack from "components/ui/FaceStack";
import UserMedia from "components/ui/UserMedia";
import Message from "components/ui/Message";
import ActivityFeed from "components/stream/ActivityFeed";
import KeyActivityFeed from "components/stream/KeyActivityFeed";
import ErrorCard from "components/ui/ErrorCard";
import { Link } from "routes";

const IndexPage = inject("auth")(
	observer((props) => {
		if (!props.auth.isLoggedIn) {
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
				<Card>
					<Card.Content>
						<div className="mb-2">
							<small className="inline-flex">
								<div className="mr-2 font-medium text-green-700">
									Task
								</div>
								<div className="text-gray-500 font-medium">
									Discussion
								</div>
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
								className="w-full flex-grow"
								type="text"
								placeholder="Start typing something you've done or made..."
							/>
						</div>
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
				<KeyActivityFeed userId={-1} feed="timeline" />
			</div>
		);
	})
);

IndexPage.getInitialProps = async (ctx) => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
		},
	};
};

export default IndexPage;
