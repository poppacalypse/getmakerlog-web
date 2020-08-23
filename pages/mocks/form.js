import React from "react";
import AppLayout from "layouts/AppLayout";
import Message from "components/ui/Message";
import Card from "components/ui/Card";
import Button from "components/ui/Button";
import ErrorMessageList from "components/error/ErrorMessageList";
import { StdErrorCollection } from "utils/error";
import Form from "components/ui/Form";

const fieldErrors = new StdErrorCollection({
	password: "Wrong password input",
	bitches: "Many of them",
});

function FormPage() {
	return (
		<AppLayout>
			<Card>
				<Card.Content>
					<ErrorMessageList error={fieldErrors} />
					<Form>
						<Form.Controls>
							<Form.Field label="Email address" help="Ayy lmao">
								<input />
							</Form.Field>
						</Form.Controls>
						<Form.Actions>
							<Button primary>Submit</Button>
						</Form.Actions>
					</Form>
				</Card.Content>
			</Card>
		</AppLayout>
	);
}

export default FormPage;
