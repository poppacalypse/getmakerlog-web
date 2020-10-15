import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import config from "config";
import React from "react";

export default function FacebookLogin() {
	return (
		<Button anchorElem={true} href={`${config.API_URL}/login/facebook/`}>
			<Button.Icon>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</Button.Icon>
			Sign in with Facebook
		</Button>
	);
}
