import Ad from "components/ads/Ad";
import React from "react";
import { Link } from "routes";

function StdSidebar() {
	return (
		<div>
			<div className="inline-flex flex-row w-full">
				<h3
					className="flex-none mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase leading-4"
					id="projects-headline"
				>
					Indie ad
				</h3>
				<span className="flex-grow"></span>
				<h3
					className="flex-none mb-2 text-xs text-gray-500 leading-4"
					id="projects-headline"
				>
					<Link route="not-implemented">Advertise here!</Link>
				</h3>
			</div>
			<Ad />
		</div>
	);
}

export default StdSidebar;
