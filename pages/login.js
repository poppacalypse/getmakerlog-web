import React, { useState } from "react";
import Form from "components/ui/Form";
import Button from "components/ui/Button";
import ErrorMessageList from "components/error/ErrorMessageList";
import { requireUnauthed } from "utils/auth";
import { Router } from "routes";
import { useAuth } from "stores/AuthStore";

function LoginPage() {
	const { loginWithCredentials, loading, errorMessages } = useAuth();
	const [redirecting, setRedirecting] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async () => {
		setRedirecting(true);
		const loggedIn = await loginWithCredentials(username, password);
		if (loggedIn) {
			Router.pushRoute("home");
		} else {
			setRedirecting(false);
		}
	};

	return (
		<div className="flex flex-grow w-full h-full p-0 border-b border-l border-r border-gray-200 bg-gray-50">
			<div className="flex flex-col justify-center flex-initial w-full p-4 px-8">
				<div>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onLogin();
						}}
					>
						<Form.Controls>
							<div className="col-span-4">
								<h1>Sign in</h1>
								<p className="text-gray-700">
									Welcome back to the maker community.
								</p>
							</div>
							<div className="col-span-4">
								<ErrorMessageList error={errorMessages} />
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
									loading={loading || redirecting}
									type="submit"
								>
									Sign in
								</Button>
							</Form.Actions>
						</Form.Controls>
					</Form>
				</div>
			</div>
			<div className="flex-initial hidden w-full bg-people md:block"></div>
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

export default requireUnauthed(LoginPage);
