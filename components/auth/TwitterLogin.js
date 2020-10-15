import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import config from "config";
import React from "react";

export default function TwitterLogin() {
	return (
		<Button anchorElem={true} href={`${config.API_URL}/login/twitter/`}>
			<Button.Icon>
				<FontAwesomeIcon icon={["fab", "twitter"]} />
			</Button.Icon>
			Sign in with Twitter
		</Button>
	);
}
