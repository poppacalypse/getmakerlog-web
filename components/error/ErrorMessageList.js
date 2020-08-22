import React from "react";
import { StdErrorCollection } from "vendor/error";
import OutboundLink from "components/seo/OutboundLink";
import { isDev } from "config";
import Message from "components/ui/Message";
import Button from "components/ui/Button";
import ErrorCard from "components/ui/ErrorCard";

// Test error display
/* const messageError = new StdErrorCollection("Something went wrong.");
const multipleErrors = new StdErrorCollection([
    "Many things went wrong",
    "Multiple things went wrong"
]);
const fieldErrors = new StdErrorCollection({
    password: "Wrong password input",
    bitches: "Many of them"
});
const jsError = new StdErrorCollection(new Error("Hai"));
*/

function renderError(error) {
	switch (error.type) {
		case "field":
			return (
				<>
					<strong>
						{error.fieldName.replace("project", "hashtag")}
					</strong>
					: {error.message}{" "}
					{error.link !== null ? (
						<OutboundLink to={error.link}>Read more</OutboundLink>
					) : (
						""
					)}
				</>
			);

		case "unknown":
			return (
				<>
					{error.message}
					{isDev && (
						<>
							<br />
							<pre>{error.stack}</pre>
						</>
					)}
				</>
			);
		default:
			return error.message;
	}
}

function renderMultipleErrors(error) {
	let res = [];
	error.errors.map((e) => (res = [...res, renderError(e)]));
	return (
		<ul className="list-disc pl-5">
			{res.map((r, idx) => (
				<li key={idx}>{r}</li>
			))}
		</ul>
	);
}

const ErrorMessageList = ({ error = null }) => {
	if (error === null || !(error.type === "StdErrorCollection")) return null;
	console.log(error);

	if (error.getUnknownErrors().length) {
		return (
			<>
				<Message
					className="relative overflow-hidden"
					danger
					title="An unknown error ocurred."
				>
					<div className="nyan absolute right-2 top-6 opacity-50">
						<img
							className="h-20 transform -rotate-45"
							style={{ "--transform-rotate": "-25deg" }}
							src="/img/nyan.png"
							alt=""
						/>
					</div>
					{error.getUnknownErrors()[0].link !== null ? (
						<Button
							sm
							anchor
							href={error.getUnknownErrors()[0].link}
						>
							Report error
						</Button>
					) : null}
				</Message>
			</>
		);
	}

	return (
		<Message
			danger
			title={
				error.message ? error.message : "Oops, something went wrong."
			}
		>
			{error.errors.length > 1 && renderMultipleErrors(error)}
		</Message>
	);
};

export default ErrorMessageList;
