import React, { useEffect } from "react";
import { requireAuth } from "utils/auth";
import { inject, observer } from "mobx-react";
import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";

function LogoutPage({ auth }) {
	useEffect(() => {
		auth.logout();
	});
	return (
		<Card>
			<Card.Content>
				<Spinner text="Logging you out..." color="gray" />
			</Card.Content>
		</Card>
	);
}

LogoutPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
		},
	};
};

export default requireAuth(inject("auth")(observer(LogoutPage)));
