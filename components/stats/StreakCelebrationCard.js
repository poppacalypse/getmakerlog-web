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
	if (!open || isServer) return null;
	let days = user.streak;

	return null;
}
