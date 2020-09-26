import React, { useState } from "react";
import Form from "components/ui/Form";
import Button from "components/ui/Button";
import ErrorMessageList from "components/error/ErrorMessageList";
import { requireUnauthed } from "utils/auth";
import { Router } from "routes";
import { useAuth } from "stores/AuthStore";
import NarrowLayout from "layouts/NarrowLayout";
import Card from "components/ui/Card";

function LoginPage() {
	const { loginWithCredentials, loading, errorMessages } = useAuth();
	const [redirecting, setRedirecting] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async () => {
		setRedirecting(true);
		const loggedIn = await loginWithCredentials(username, password);
		if (loggedIn) {
			Router.pushRoute("index");
		} else {
			setRedirecting(false);
		}
	};

	return (
		<NarrowLayout leftSidebar={null} rightSidebar={null}>
			<Card>
				<Card.Content>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onLogin();
						}}
					>
						<Form.Controls>
							<div className="col-span-6">
								<h1>Sign in</h1>
								<p className="text-gray-700">
									Welcome back to the maker community.
								</p>
							</div>
							<div className="col-span-6">
								<ErrorMessageList error={errorMessages} />
							</div>
							<Form.Field span={6} label="Username">
								<input
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</Form.Field>
							<Form.Field span={6} label="Password">
								<input
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									type="password"
								/>
							</Form.Field>
							<Form.Actions span={6}>
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
				</Card.Content>
			</Card>
		</NarrowLayout>
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
