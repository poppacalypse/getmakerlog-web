import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Container from "components/ui/Container";
import React from "react";

function PatronPage() {
	return (
		<div>
			<div className="py-24 text-center bg-white border-b border-gray-200">
				<Container>
					<small className="font-medium text-green-500">
						<FontAwesomeIcon icon="check-circle" /> Patrons
					</small>
					<h1>Become a Makerlog Patron</h1>
					<p className="mb-4 text-gray-700">
						Support the maker movement and get exclusive perks.
					</p>
					<div className="flex justify-center space-x-2">
						<Button>todo: add pricing buttons here</Button>
					</div>
				</Container>
			</div>
		</div>
	);
}

PatronPage.getInitialProps = async () => {
	return {
		layout: {
			contained: false,
		},
	};
};

export default PatronPage;
