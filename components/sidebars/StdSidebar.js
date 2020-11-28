import React from "react";
import AdSidebarCard from "./AdSidebarCard";
import FeedbackCard from "./FeedbackCard";
import LaunchRemainingCard from "./LaunchRemainingCard";

function StdSidebar() {
	return (
		<>
			<AdSidebarCard />
			<LaunchRemainingCard />
			<FeedbackCard />
		</>
	);
}

export default StdSidebar;
