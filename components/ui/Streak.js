import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ValuePlaceholder = ({ value }) => <span>{value}</span>;

const Odometer = dynamic(import("react-odometerjs"), {
	ssr: false,
	loading: ValuePlaceholder,
});

export default function Streak({
	days,
	animated = false,
	previous = null,
	text = false,
}) {
	const [currentDays, setCurrentDays] = useState(previous);
	const [delta, setDelta] = useState(null);

	useEffect(() => {
		if (previous !== null) {
			let timer = setTimeout(() => {
				setDelta(days - previous);
				setCurrentDays(days);
			}, 500);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [days, previous]);

	const deltaClass =
		delta !== null && delta !== 0
			? delta > 0
				? "stat-improve"
				: "stat-worsen"
			: "";

	return (
		<span className={deltaClass}>
			{days === 0 ? "😔" : days === 1 ? "✨" : "🔥"}
			{animated && previous !== null ? (
				<span className="inline-flex">
					<Odometer value={currentDays} />
				</span>
			) : (
				<>&nbsp;{days}</>
			)}
			{text ? " day streak" : ""}
		</span>
	);
}
