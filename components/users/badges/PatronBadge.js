import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { isPatron } from "utils/patron";

export default function PatronBadge({ user }) {
	return isPatron(user) && !user.verified && !user.is_staff ? (
		<span className="text-xs text-yellow-500 text-uppercase">
			<FontAwesomeIcon icon="check-circle" />
			&nbsp;
			<span className="hidden sm:inline-block">Patron</span>
		</span>
	) : null;
}
