import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { useAuth } from "stores/AuthStore";
import { getTwitterShareUrl } from "utils/stats";
import createPersistedState from "use-persisted-state";
import { isServer } from "config";

const useOpen = createPersistedState("state__streakcelebrationcard_open");

export default function StreakCelebrationCard() {
	const [confetti, setConfetti] = useState(false);
	const [open, setOpen] = useOpen(true);
	const { user } = useAuth();
	if (!user) return null;
	let days = user.streak;

	useEffect(() => {
		let timer = setTimeout(() => {
			setConfetti(true);
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [confetti]);

	useEffect(() => {
		if (!(days > 0 && days % 50 === 0) && ![1, 7, 25].includes(days))
			setOpen(true);
	}, [days, setOpen]);

	if (!open || isServer) return null;

	let content = null;

	switch (days) {
		case 1:
			content = (
				<>
					<div className="flex items-center">
						<h3 className="flex-grow font-bold">
							You've kicked off a streak! ✨
						</h3>
						<button
							type="button"
							className="flex"
							onClick={() => setOpen(false)}
						>
							<span className="sr-only">Dismiss</span>
							<svg
								className="w-4 h-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<p className="text-gray-700">
						You're starting to build consistently. Keep on logging
						for more surprises!
					</p>
				</>
			);
			break;

		case 7:
			content = (
				<>
					<div className="flex items-center">
						<h3 className="flex-grow font-bold">
							One week of building daily 💪
						</h3>
						<button
							type="button"
							className="flex"
							onClick={() => setOpen(false)}
						>
							<span className="sr-only">Dismiss</span>
							<svg
								className="w-4 h-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<p className="text-gray-700">
						Give yourself a pat in the back and keep building!
					</p>
				</>
			);
			break;

		case 25:
			content = (
				<>
					<div className="flex items-center">
						<h3 className="flex-grow font-bold">
							A month of building consistently 😱
						</h3>
						<button
							type="button"
							className="flex"
							onClick={() => setOpen(false)}
						>
							<span className="sr-only">Dismiss</span>
							<svg
								className="w-4 h-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<p className="text-gray-700">
						That's incredible progress, high five!
					</p>
				</>
			);
			break;

		default:
			content = null;
	}

	if (days > 0 && days % 50 === 0) {
		// TODO: Add top x percent of users.
		content = (
			<>
				<div className="flex items-center">
					<h3 className="flex-grow font-bold">
						The {days} Day Club {days === 100 ? "💯" : "🔥"}
					</h3>
					<button
						type="button"
						className="flex"
						onClick={() => setOpen(false)}
					>
						<span className="sr-only">Dismiss</span>
						<svg
							className="w-4 h-4 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<p className="text-gray-700">
					You've built consistently for {days} days!
				</p>
			</>
		);
	}

	if (content) {
		return (
			<Card>
				<Card.Content>
					{content}
					<div className="mt-4">
						<Button
							secondary
							sm
							anchorElem
							href={getTwitterShareUrl(user)}
							target="_blank"
						>
							<Button.Icon>
								<FontAwesomeIcon icon={["fab", "twitter"]} />
							</Button.Icon>
							Tweet
						</Button>
					</div>
					<Confetti active={confetti} />
				</Card.Content>
			</Card>
		);
	} else {
		return null;
	}
}
