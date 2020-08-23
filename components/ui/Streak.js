import React from "react";

export default function Streak({ days, text = false }) {
	return (
		<span>
			<small className="text-xs">🔥</small> {days}
			{text ? " day streak" : ""}
		</span>
	);
}
