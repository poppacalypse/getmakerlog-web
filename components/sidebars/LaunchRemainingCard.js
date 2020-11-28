import Card from "components/ui/Card";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SidebarItem from "./SidebarItem";

export default function LaunchRemainingCard() {
	const calculateTimeLeft = () => {
		const difference = +new Date(1608634800 * 1000) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});

	return (
		<SidebarItem title="Launch Countdown">
			<Card>
				<Card.Content>
					<h1 className="font-bold text-gray-900">
						🕚 {("0" + timeLeft.days).slice(-2)}:
						{("0" + timeLeft.hours).slice(-2)}:
						{("0" + timeLeft.minutes).slice(-2)}
					</h1>
					<p className="help">... until Makerlog Beta LAUNCHES!</p>
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
