import Button from "components/ui/Button";
import Container from "components/ui/Container";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { Link } from "routes";
import { useRoot } from "stores/RootStore";

export const ERROR_LAYOUT_PROPS = {
	contained: false,
	bgClassName: "bg-white",
	contentClassName: "flex flex-col justify-center",
};

function Error({ statusCode, ...props }) {
	const { toggleFeedback } = useRoot();

	return (
		<Container className="relative flex flex-col justify-center flex-grow h-full">
			<Image
				className="h-8 transform -rotate-12"
				src="/img/nyan.png"
				unsized
				alt="A Nyan cat."
			/>
			<h1>Oh no! Something went wrong.</h1>
			<p className="mb-8 text-gray-700">
				{statusCode
					? statusCode === 403
						? "You're not allowed to perform this action."
						: `A ${statusCode} error occurred on the server.`
					: "An unexpected error occurred on the client."}
			</p>
			<div className="mb-8 space-y-2 sm:space-x-2 sm:space-y-0">
				<Button secondary onClick={toggleFeedback}>
					Report an issue
				</Button>
				<Link route="index">
					<Button onClick={toggleFeedback}>Go home</Button>
				</Link>
			</div>
			{props.errorMessage && (
				<p className="help">
					Ref: {props.errorMessage} ({statusCode})
				</p>
			)}
			<NextSeo title="Oops!" />
		</Container>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {
		statusCode,
		err,
		layout: ERROR_LAYOUT_PROPS,
	};
};

export default Error;
