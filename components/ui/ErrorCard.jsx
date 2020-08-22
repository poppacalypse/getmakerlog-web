import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import Button from "./Button";

function getMessageForError(code) {
	switch (code) {
		case 400:
			return "A request error ocurred.";

		case 403:
			return "You must sign in to do this.";
		case 500:
			return "A server error ocurred.";

		default:
			return "An unknown error ocurred.";
	}
}

function getActionsForError(code) {
	switch (code) {
		case 400:
			return <Button>Report error</Button>;

		case 403:
			return <Button primary>Sign in</Button>;
		case 500:
			return <Button>Report error</Button>;

		default:
			return <Button>Report error</Button>;
	}
}

class ErrorCard extends Component {
	render() {
		return (
			<Card className="relative overflow-hidden">
				<Card.Content>
					<div className="nyan absolute right-2 top-6 opacity-50">
						<img
							className="h-20 transform -rotate-45"
							style={{ "--transform-rotate": "-25deg" }}
							src="/img/nyan.png"
							alt=""
						/>
					</div>
					<h1 className="text-xl font-bold text-gray-900">
						Oops, something went wrong.
					</h1>
					<p className="mb-4 text-gray-700">
						{this.props.message
							? this.props.message
							: this.props.statusCode
							? getMessageForError(this.props.statusCode)
							: "An unknown error ocurred."}
					</p>
					{this.props.actions
						? this.props.actions
						: this.props.statusCode
						? getActionsForError(this.props.statusCode)
						: null}
				</Card.Content>
			</Card>
		);
	}
}

export default ErrorCard;
