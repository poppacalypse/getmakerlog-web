import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";

function HomePage(props) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<div className="container flex flex-col flex-grow mx-auto">
				<div className="flex flex-col h-64 px-4 bg-transparent border-l border-r border-gray-200 bg-people">
					<nav className="top-0 left-0 z-50 flex flex-row w-full h-16">
						<div className="flex flex-row flex-1 navbar-left">
							<div className="flex items-center justify-center mr-4 text-white logo flex-center">
								<FontAwesomeIcon icon="check-circle" />
							</div>
						</div>
						<div className="flex-grow navbar-middle"></div>
						<div className="flex flex-row items-center justify-end flex-initial navbar-right md:flex-1">
							<Button>Join Makerlog</Button>
						</div>
					</nav>

					<h1 className="text-4xl text-white">
						The home of the maker community
					</h1>
					<h2 className="text-gray-100">
						Makerlog helps you ship faster and stay accountable by
						committing to build in public.
					</h2>
				</div>

				{props.children}
			</div>
		</div>
	);
}

export default HomePage;
