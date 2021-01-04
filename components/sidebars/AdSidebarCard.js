import Ad from "components/ads/Ad";
import Card from "components/ui/Card";
import config from "config";
import React from "react";
import { Link } from "routes";
import SidebarItem from "./SidebarItem";

export default function AdSidebarCard() {
	if (config.IS_WL) return null;

	return (
		<SidebarItem
			title="Indie ad"
			titleRight={
				<h3
					className="flex-none mb-2 text-xs text-gray-500 leading-4"
					id="projects-headline"
				>
					<Link route="book-ad">Advertise here!</Link>
				</h3>
			}
		>
			<Card>
				<Card.Content>
					<Ad />
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
