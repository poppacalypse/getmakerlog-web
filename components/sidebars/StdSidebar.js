import Ad from "components/ads/Ad";
import React from "react";
import { Link } from "routes";
import SidebarItem from "./SidebarItem";

function StdSidebar() {
	return (
		<SidebarItem
			title="Indie ad"
			titleRight={
				<h3
					className="flex-none mb-2 text-xs text-gray-500 leading-4"
					id="projects-headline"
				>
					<Link route="not-implemented">Advertise here!</Link>
				</h3>
			}
		>
			<Ad />
		</SidebarItem>
	);
}

export default StdSidebar;
