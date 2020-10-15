import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessageList from "components/error/ErrorMessageList";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import Form from "components/ui/Form";
import React, { useState } from "react";
import { useAuth } from "stores/AuthStore";
import { patchUser, requiresOnboarding } from "utils/auth";
import { useImageUpload } from "utils/hooks";

function OnboardingCard() {
	const { isLoggedIn, user, setUser } = useAuth();
	const { getInputProps, open, attachmentState } = useImageUpload();
	const [payload, setPayload] = useState({
		first_name: user && user.first_name ? user.first_name : "",
		last_name: user && user.last_name ? user.last_name : "",
		email: user && user.email ? user.email : "",
	});
	const [loading, setLoading] = useState(false);
	const [errorMessages, setErrorMessages] = useState(null);

	if (!isLoggedIn || !requiresOnboarding(user)) return null;

	async function onSubmit() {
		try {
			let finalPayload = { ...payload };
			setLoading(true);
			setErrorMessages(null);
			if (attachmentState.attachment)
				finalPayload.avatar = attachmentState.attachment;
			const user = await patchUser(finalPayload);
			setUser(user);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setErrorMessages(e);
		}
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
							<div className="flex items-center">
								<div className="flex-none mr-2">
									<img
										className={`h-8 w-8 rounded-full`}
										src={
											attachmentState.preview
												? attachmentState.preview
												: user.avatar
										}
									/>
								</div>
								<div>
									<input {...getInputProps()}></input>
									<Button sm onClick={open}>
										<Button.Icon>
											<FontAwesomeIcon icon="camera" />
										</Button.Icon>
										{attachmentState.name
											? attachmentState.name
											: "Upload"}
									</Button>
								</div>
							</div>
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
