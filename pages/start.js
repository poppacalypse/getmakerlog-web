import FacebookLogin from "components/auth/FacebookLogin";
import TwitterLogin from "components/auth/TwitterLogin";
import Card from "components/ui/Card";
import NarrowLayout from "layouts/NarrowLayout";
import React from "react";

function SignupPage() {
	return (
		<NarrowLayout
			maxWidthMultiplier={1}
			rightSidebar={null}
			leftSidebar={null}
		>
			<Card>
				<Card.Content>
					<div className="mb-4">
						<h3 className="font-bold">Join Makerlog</h3>
						<p className="text-gray-700">
							Start your journey by logging in with social media.
						</p>
					</div>
					<div className="flex flex-row justify-center col-span-6">
						<div className="flex mr-2">
							<TwitterLogin />
						</div>
						<div>
							<FacebookLogin />
						</div>
					</div>
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<h3 className="font-bold">Here's why you should join...</h3>
					<p>
						Join <span>over 6,000 creators</span> building in public
						and staying productive — together.
					</p>
					<ul>
						<li className="p-2">
							✅ <strong>Stay accountable</strong> by building
							your projects in public alongside other makers.
						</li>
						<li className="p-2">
							🔥 <strong>Stay motivated</strong> by earning
							streaks, consecutive days of working on your
							projects.
						</li>
						<li className="p-2">
							🌎 <strong>Share your work</strong> and get great
							feedback from our incredibly supportive community.
						</li>
						<li className="p-2">
							🥰 <strong>Get inspired</strong> with our weekly
							newsletter and awesome founder interviews.
						</li>
					</ul>
				</Card.Content>
			</Card>
		</NarrowLayout>
	);
}

SignupPage.getInitialProps = async () => {
	return {
		layout: {
			className: "bg-people",
		},
	};
};

export default SignupPage;
