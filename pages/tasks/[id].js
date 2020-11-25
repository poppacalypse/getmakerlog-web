import Task from "components/tasks/Task";
import TaskComments from "components/tasks/TaskComments";
import Card from "components/ui/Card";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import ProfileLayout from "components/users/ProfileLayout";
import { useRouter } from "next/router";
import { getTask, TASK_QUERIES, useTask } from "queries/tasks";
import React from "react";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/dist/hydration/react-query-hydration.development";
import { Link } from "routes";
import TimeAgo from "react-timeago";
import { getErrorResponse } from "utils/error";

function TaskPage() {
	const router = useRouter();
	const { id } = router.query;
	const { isLoading, data: task, error } = useTask(id);

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	if (isLoading) return <Spinner text="Loading user..." />;

	return (
		<ProfileLayout
			user={task.user}
			headerProps={{
				bottomNav: (
					<Link
						route="profile"
						params={{ username: task.user.username }}
					>
						<a className="block pb-4 text-xs">View full profile</a>
					</Link>
				),
			}}
		>
			<Card>
				<Card.Content>
					<Task task={task} />
					<div
						className="mb-2 last:mb-0"
						style={{ marginTop: "-0.5em" }}
					>
						<small className="text-xs text-gray-300">
							Added <TimeAgo date={task.created_at} />{" "}
							{task.done_at ? (
								<>
									· Completed <TimeAgo date={task.done_at} />
								</>
							) : null}
						</small>
					</div>
					<TaskComments task={task} />
				</Card.Content>
			</Card>
		</ProfileLayout>
	);
}

TaskPage.getInitialProps = async ({ res, query: { id } }) => {
	const queryCache = makeQueryCache();

	try {
		await queryCache.prefetchQuery(
			[TASK_QUERIES.getTask, { id }],
			getTask,
			{},
			{ throwOnError: true }
		);

		return {
			dehydratedState: dehydrate(queryCache),
			layout: {
				allowGuest: true,
				contained: false,
			},
		};
	} catch (e) {
		return getErrorResponse(e, res);
	}
};

export default TaskPage;
