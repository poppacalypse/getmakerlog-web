import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";

function ObjectLayoutContainer(props) {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full h-full flex flex-col">
			<div className="w-full flex-grow max-w-3xl mx-auto bg-gray-50 border-b border-r border-l border-gray-200 p-4">
				{props.children}
			</div>
		</div>
	);
}

function ObjectLayout(props) {
	return (
		<div>
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<nav className="h-16 flex flex-row left-0 w-full top-0 z-50">
					<div className=" max-w-7xl mx-auto sm:px-6 lg:px-8 flex-grow ">
						<div className="max-w-3xl mx-auto flex py-4 px-4  bg-white border-b border-l border-r border-gray-200 ">
							<div className="navbar-left flex-1 flex flex-row">
								<div className="flex flex-center items-center justify-center mr-4 md:hidden">
									<FontAwesomeIcon icon="bars" />
								</div>
								<div className="logo flex flex-center items-center justify-center mr-4 text-green-500">
									<FontAwesomeIcon icon="check-circle" />
								</div>
							</div>
							<div className="navbar-middle flex-grow"></div>
							<div className="navbar-right flex-initial md:flex-1 flex items-center flex-row justify-end">
								<Button primary>Join Makerlog</Button>
							</div>
						</div>
					</div>
				</nav>

				{props.children}
			</div>
		</div>
	);
}

ObjectLayout.Container = ObjectLayoutContainer;

export default ObjectLayout;
