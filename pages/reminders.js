import ErrorMessageList from "components/error/ErrorMessageList";
import RemindersCard from "components/reminders/RemindersCard";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import Form from "components/ui/Form";
import Message from "components/ui/Message";
import PageHeader from "components/ui/PageHeader";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import {
	useDeleteReminder,
	useReminders,
	useUpdateReminder,
} from "queries/reminders";
import React, { useState } from "react";
import { requireAuth } from "utils/auth";

function RemindersSettings({ reminders, onDelete = () => {} }) {
	const reminder = reminders[0];
	const [mutate, { isLoading, isSuccess, error }] = useUpdateReminder();
	const [deleteMutation, { isLoading: isDeleting }] = useDeleteReminder();
	const [payload, setPayload] = useState({
		time: reminder.time ? reminder.time : "18:00",
	});

	const onSave = async () => {
		await mutate({ id: reminder.id, payload });
	};

	const onClickDelete = async () => {
		await deleteMutation({ id: reminder.id });
		if (onDelete) onDelete();
	};

	return (
		<Card>
			<Card.Content>
				{error && <ErrorMessageList error={error} />}
				{isSuccess && <Message success>Saved.</Message>}
				<Form
					onSubmit={() => {
						onSave();
					}}
				>
					<Form.Group
						title="General"
						subtitle="At what time should we remind you?"
					>
						<Form.Field span={12} label="Time">
							<div className="flex space-x-2">
								<input
									value={payload.time}
									onChange={(e) =>
										setPayload({ time: e.target.value })
									}
									type="time"
									className="max-w-xs"
								/>
								<Button
									loading={isLoading}
									secondary
									type="submit"
								>
									Save
								</Button>
							</div>
						</Form.Field>
					</Form.Group>
					<Form.Group title="Danger zone" subtitle="Here be dragons.">
						<Form.Field span={12}>
							<Button
								danger
								onClick={onClickDelete}
								loading={isDeleting}
							>
								Stop daily reminders
							</Button>
							<p className="help">
								This button will completely stop any reminders
								associated to your account.
							</p>
						</Form.Field>
					</Form.Group>
				</Form>
			</Card.Content>
		</Card>
	);
}

function RemindersPage() {
	const { isLoading, data, error, refetch } = useReminders();
	return (
		<NarrowLayout rightSidebar={null}>
			<PageHeader>
				<h2 className="mb-2 font-bold">Reminders</h2>
			</PageHeader>
			{isLoading && <Spinner text="Loading reminders..." />}
			{error && <ErrorMessageList error={error} />}
			{data && data.length === 0 ? (
				<RemindersCard force onCreated={refetch} />
			) : data ? (
				<RemindersSettings reminders={data} onDelete={refetch} />
			) : null}
			<NextSeo title="Reminders" />
		</NarrowLayout>
	);
}

export default requireAuth(RemindersPage);
