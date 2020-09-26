import React from "react";
import { requireAuth } from "utils/auth";
import DayView from "components/tasks/DayView";
import NarrowLayout from "layouts/NarrowLayout";

function TasksPage() {
	return (
		<NarrowLayout rightSidebar={null}>
			<DayView />
		</NarrowLayout>
	);
}

TasksPage.getInitialProps = async () => ({
	layout: {
		layout: "app",
		contained: false,
	},
});

export default requireAuth(TasksPage);
