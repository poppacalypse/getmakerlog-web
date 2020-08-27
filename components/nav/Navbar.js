import React from "react";
import Button from "components/ui/Button";
import Avatar from "components/ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "routes";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";

function Navbar({ app = false }) {
	const { isLoggedIn, user } = useAuth();
	const { mobileSidebarOpen, toggleMobileSidebar } = useRoot();

	return (
		<nav
			className={
				"h-16 bg-white border-b border-gray-200  px-4 flex flex-row left-0  w-full top-0 z-50 " +
				(app ? "fixed" : "")
			}
		>
			<div className="navbar-left flex-none flex flex-row md:w-72">
				{app && isLoggedIn && (
					<a
						className="flex flex-center items-center justify-center mr-4 md:hidden"
						onClick={() => toggleMobileSidebar()}
					>
						<FontAwesomeIcon
							icon={mobileSidebarOpen ? "times" : "bars"}
						/>
					</a>
				)}
				<Link route="home">
					<a className="logo flex flex-center items-center justify-center mr-4 text-green-500">
						<FontAwesomeIcon icon="check-circle" />
					</a>
				</Link>
			</div>
			<div className="navbar-middle self-center w-full h-full flex justify-center">
				{app ? (
					<div className="menu max-w-3xl fixed w-full left-0 bottom-0 flex items-center bg-white border-t border-gray-200 md:border-t-0 md:bg-transparent md:static md:h-full flex-grow">
						<Link route="home">
							<a className="p-4 md:p-0 hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold border-b-2 border-green-500 text-green-500 h-full flex items-center justify-center  transition ease-in-out duration-150">
								Explore
							</a>
						</Link>
						<div className="p-4 md:p-0 hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
							Stories
						</div>
						<div className="p-4 md:p-0 hover:bg-green-100 cursor-pointer flex-1 text-center font-semibold text-gray-700 h-full flex items-center justify-center  transition ease-in-out duration-150">
							More
						</div>
					</div>
				) : null}
			</div>
			<div className="navbar-right flex-none flex items-center flex-row justify-end md:w-72">
				{isLoggedIn ? (
					<>
						<div className="px-4 text-center font-semibold text-gold-600 h-full flex items-center justify-center">
							Get Gold
						</div>
						<div className="pl-4">
							<Avatar user={user} size={8} />
						</div>
					</>
				) : (
					<Button primary>Join Makerlog</Button>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
