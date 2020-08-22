import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";

function HomePage(props) {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col">
			<div className="flex-grow container mx-auto flex flex-col">
				<div className="flex flex-col h-64 bg-people border-l border-r border-gray-200 px-4 bg-transparent">
					<nav className="h-16 flex flex-row left-0 w-full top-0 z-50">
						<div className="navbar-left flex-1 flex flex-row">
							<div className="logo flex flex-center items-center justify-center mr-4 text-white">
								<FontAwesomeIcon icon="check-circle" />
							</div>
						</div>
						<div className="navbar-middle flex-grow"></div>
						<div className="navbar-right flex-initial md:flex-1 flex items-center flex-row justify-end">
							<Button>Join Makerlog</Button>
						</div>
					</nav>

					<h1 className="text-white text-4xl">
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
