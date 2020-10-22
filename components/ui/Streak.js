import React from "react";

export default function Streak({ days, text = false }) {
	return (
		<span>
			<small>{days === 0 ? "😔" : days === 1 ? "✨" : "🔥"}</small>
			{days}
			{text ? " day streak" : ""}
		</span>
	);
}
