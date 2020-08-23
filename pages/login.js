import React, { useState } from "react";
import PageLayout from "layouts/PageLayout";
import Form from "components/ui/Form";
import Button from "components/ui/Button";
import { inject, observer } from "mobx-react";
import ErrorMessageList from "components/error/ErrorMessageList";
import { requireUnauthed } from "utils/auth";
import { Router } from "routes";

function LoginPage({ auth }) {
	const [redirecting, setRedirecting] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="w-full flex-grow h-full bg-gray-50 border-b border-r border-l border-gray-200 p-0 flex">
			<div className="flex-initial w-full p-4 px-8 flex flex-col justify-center">
				<div>
					<Form>
						<Form.Controls>
							<div className="col-span-4">
								<h1>Sign in</h1>
								<p className="text-gray-700">
									Welcome back to the maker community.
								</p>
							</div>
							<div className="col-span-4">
								<ErrorMessageList error={auth.errorMessages} />
							</div>
							<Form.Field span={4} label="Username">
								<input
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</Form.Field>
							<Form.Field span={4} label="Password">
								<input
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									type="password"
								/>
							</Form.Field>
							<Form.Actions span={4}>
								<Button
									primary
									loading={auth.loading || redirecting}
									onClick={async (e) => {
										setRedirecting(true);
										const loggedIn = await auth.loginWithCredentials(
											username,
											password
										);
										if (loggedIn) {
											Router.pushRoute("home");
										} else {
											setRedirecting(false);
										}
									}}
								>
									Sign in
								</Button>
							</Form.Actions>
						</Form.Controls>
					</Form>
				</div>
			</div>
			<div className="flex-initial w-full bg-people hidden md:block"></div>
		</div>
	);
}

LoginPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "page",
		},
	};
};

export default requireUnauthed(inject("auth")(observer(LoginPage)));
