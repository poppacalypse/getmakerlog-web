import React from "react";

export default function Streak({ days, text = false }) {
	return (
		<span>
			{days === 0 ? "😔" : days === 1 ? "✨" : "🔥"}
			{days}
			{text ? " day streak" : ""}
		</span>
	);
}
