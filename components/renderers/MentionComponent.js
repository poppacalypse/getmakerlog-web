import React from "react";
import { Link } from "routes";

export default function MentionComponent(key, result) {
	return (
		<Link route="not-implemented" key={key}>
			<a>{result[0]}</a>
		</Link>
	);
}
