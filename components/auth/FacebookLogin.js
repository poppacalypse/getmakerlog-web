import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import config from "config";
import React from "react";

export default function FacebookLogin() {
	return (
		<Button
			className="text-blue-800"
			anchorElem={true}
			href={`${config.API_URL}/login/facebook/`}
		>
			<Button.Icon>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</Button.Icon>
			Join with Facebook
		</Button>
	);
}
