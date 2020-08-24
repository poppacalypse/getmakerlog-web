import React, { useEffect } from "react";
import { requireAuth } from "utils/auth";
import { inject, observer } from "mobx-react";
import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";
import { isServer } from "config";

function LogoutPage({ auth }) {
	if (!isServer) {
		setTimeout(() => {
			auth.logout();
		}, 1000);
	}
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
			allowGuest: true,
		},
	};
};

export default requireAuth(inject("auth")(observer(LogoutPage)));
