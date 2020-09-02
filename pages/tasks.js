import React from "react";
import { requireAuth } from "utils/auth";
import DayView from "components/tasks/DayView";

function TasksPage() {
	return <DayView />;
}

TasksPage.getInitialProps = async () => ({
	layout: {
		layout: "app",
		contained: false,
	},
});

export default requireAuth(TasksPage);
