import React, { Component, useState, useEffect } from "react";
import Button from "components/ui/Button";
import { usePraise, usePraiseMutation } from "queries/praise";
import { getLogger } from "utils/logging";
import FaceStack from "components/ui/FaceStack";
import { isServer } from "config";
import { Router } from "routes";
import praiseSchema from "schemas/praise";
import PraiseIcon from "./PraiseIcon";
import { useAuth } from "stores/AuthStore";

const log = getLogger("PraiseButton");

// TODO: On click, redirect to sign in if not logged in.

function PraiseButton({ indexUrl, initialCount, disabled = false, ...props }) {
	const { isLoggedIn, user } = useAuth();
	const [clicked, setClicked] = useState(false);
	const { isLoading, error, data } = usePraise(
		indexUrl,
		initialCount > 0 || clicked
	);
	const [mutate] = usePraiseMutation(initialCount, user);

	const onPraise = async () => {
		if (!isLoggedIn && !isServer) {
			log(`User is not signed in. Redirecting...`);
			Router.pushRoute("login");
		}
		setClicked(true);
		const data = await mutate(indexUrl);
		return data;
	};

	useEffect(() => {
		if (error) {
			log(`Failed to load praise for ${indexUrl}.`, error);
		}
	}, [error]);

	// This is the one place where errors are acceptable.
	// We don't inform the user of errors. They will occur.
	// Except schema errors, those break the site...

	const { errors, value } = praiseSchema.validate(data);
	if (errors) return null;

	return (
		<Button
			loading={isLoading}
			disabled={disabled}
			xs
			onClick={onPraise}
			className={
				value && value.praised
					? "text-yellow-500 hover:text-yellow-400"
					: "hover:text-yellow-500"
			}
		>
			<Button.Icon>
				<PraiseIcon />
			</Button.Icon>
			<span>
				{value && value.praised ? (
					<span className="font-medium">Praised</span>
				) : (
					"Praise"
				)}
			</span>
			<span className="text-gray-500">
				{value ? (
					<span className="ml-2">{value.total}</span>
				) : (
					<span className="ml-2">{initialCount}</span>
				)}
			</span>
			{value && value.praised_by !== null && value.praised_by.length > 0 && (
				<span className="ml-2">
					<FaceStack size={4} users={value.praised_by} />
				</span>
			)}
		</Button>
	);
}

export default PraiseButton;
