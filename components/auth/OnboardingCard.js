import ErrorMessageList from "components/error/ErrorMessageList";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import Form from "components/ui/Form";
import AvatarUpload from "components/users/AvatarUpload";
import React, { useState } from "react";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import { requiresOnboarding } from "utils/auth";
import { useImageUpload } from "utils/hooks";
import { getLogger } from "utils/logging";

const log = getLogger("onboarding");

function OnboardingCard() {
	const {
		patching: loading,
		patchUser,
		errorMessages,
		isLoggedIn,
		user,
	} = useAuth();
	const { setOnboarding, isOnboarding } = useRoot();
	const { getInputProps, open, attachmentState } = useImageUpload();
	const [payload, setPayload] = useState({
		first_name: user && user.first_name ? user.first_name : "",
		last_name: user && user.last_name ? user.last_name : "",
		email: user && user.email ? user.email : "",
		timezone: user && user.timezone ? user.timezone : "UTC",
	});

	if (!isLoggedIn || (!requiresOnboarding(user) && !isOnboarding))
		return null;

	async function onSubmit() {
		let finalPayload = { ...payload };
		if (attachmentState.attachment)
			finalPayload.avatar = attachmentState.attachment;
		if (Intl) {
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			finalPayload.timezone = timezone;
			log(`Timezone detected as ${timezone}.`);
		}
		await patchUser(finalPayload);
		setOnboarding(false);
	}

	return (
		<Card>
			<Card.Content>
				<h3 className="font-bold text-gray-900">
					Welcome to Makerlog!{" "}
				</h3>
				<p className="mb-4 text-gray-700">
					You're only one step away from joining the maker community.
				</p>

				<Form onSubmit={onSubmit}>
					{errorMessages && (
						<ErrorMessageList error={errorMessages} />
					)}
					<Form.Controls>
						<Form.Field span={3} label="First name">
							<input
								value={payload.first_name}
								onChange={(e) => {
									setPayload({
										...payload,
										first_name: e.target.value,
									});
								}}
							/>
						</Form.Field>
						<Form.Field span={3} label="Last name">
							<input
								value={payload.last_name}
								onChange={(e) => {
									setPayload({
										...payload,
										last_name: e.target.value,
									});
								}}
							/>
						</Form.Field>
						{!user.email && (
							<Form.Field span={3} label="Email address">
								<input
									value={payload.email}
									onChange={(e) => {
										setPayload({
											...payload,
											email: e.target.value,
										});
									}}
								/>
							</Form.Field>
						)}
						<Form.Field span={3} label="Profile picture">
							<AvatarUpload
								attachmentState={attachmentState}
								user={user}
								open={open}
								getInputProps={getInputProps}
							/>
						</Form.Field>
						<Form.Actions span={6}>
							<Button loading={loading} primary type="submit">
								Finish
							</Button>
						</Form.Actions>
					</Form.Controls>
				</Form>
			</Card.Content>
		</Card>
	);
}

export default OnboardingCard;
