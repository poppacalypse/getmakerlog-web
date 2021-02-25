import Activity from "components/stream/Activity";
import React from "react";

function makeStubActivity(task) {
	return {
		actor: {
			id: `accounts-User-${task.user.id}`,
			collection: "enrichment_store",
			foreign_id: `enrichment_store:accounts-User-${task.user.id}`,
			data: task.user,
			created_at: "2020-10-23T00:37:07.844368Z",
			updated_at: "2020-11-19T19:33:22.228107Z",
		},
		actor_type: "user",
		foreign_id: `projects.Task:${task.id}`,
		id: `stub-${task.id}`,
		object: {
			id: `projects-Task-${task.id}`,
			collection: "enrichment_store",
			foreign_id: `enrichment_store:projects-Task-${task.id}`,
			data: task,
			created_at: task.created_at,
			updated_at: task.updated_at,
		},
		object_type: "task",
		origin: null,
		target: "",
		target_type: null,
		time: task.created_at,
		verb: "complete",
	};
}

export default function StubTaskActivity({ task, embed = false }) {
	// Emulates the form of an activity to pretend that we have better algorithms for ranking in place...
	// Like a real bysh.
	return <Activity embed={embed} activity={makeStubActivity(task)} />;
}
