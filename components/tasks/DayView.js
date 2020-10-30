import React, { useState } from "react";
import { differenceInCalendarDays, format, subDays, addDays } from "date-fns";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/ui/Card";
import { useTasks } from "queries/tasks";
import Spinner from "components/ui/Spinner";
import Task from "./Task";
import {
	groupTasksByDone,
	DoneStates,
	getHumanStateFromDoneState,
} from "utils/tasks";
import ErrorCard from "components/ui/ErrorCard";
import PageHeader from "components/ui/PageHeader";

function getRelativeDate(date) {
	const calendarDate = format(date, "MMMM d, yyyy");
	const diff = differenceInCalendarDays(new Date(), date);
	const dayOfWeek = format(date, "EEEE");

	if (diff === 0) return "Today";
	if (diff === 1) return "Yesterday";
	if (diff >= 2 && diff <= 6) return `${dayOfWeek}`;
	if (diff > 6 && diff <= 12) return `Last ${dayOfWeek}`;

	return calendarDate;
}

function TaskGroupCard({ isLoading, failed, onRetry, tasks, doneState }) {
	return (
		<>
			<h3 className="mb-2 text-sm font-medium text-gray-700 leading-4">
				{getHumanStateFromDoneState(doneState)}{" "}
				<span className="text-gray-500">{tasks.length}</span>
			</h3>
			{failed && !isLoading ? (
				<ErrorCard
					message="Your tasks couldn't get loaded."
					actions={<Button onClick={onRetry}>Retry</Button>}
				/>
			) : (
				<Card>
					<Card.Content>
						{isLoading && (
							<Spinner small text="Loading your tasks..." />
						)}
						{!isLoading && !failed && tasks.length === 0 ? (
							<span className="text-gray-500">
								Nothing to see here...
							</span>
						) : null}
						{tasks &&
							!failed &&
							!isLoading &&
							tasks.map((t) => (
								<div key={t.id} className="mb-2 last:mb-0">
									<Task
										task={t}
										withAttachments={false}
										withActions={true}
									/>
								</div>
							))}
					</Card.Content>
				</Card>
			)}
		</>
	);
}

function DayView() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const { data, isLoading, error, refetch } = useTasks(
		currentDate,
		currentDate
	);

	const rewindDate = () => {
		setCurrentDate(subDays(currentDate, 1));
	};

	const forwardDate = () => {
		setCurrentDate(addDays(currentDate, 1));
	};

	const taskGroups = groupTasksByDone(data ? data : []);

	return (
		<div>
			<PageHeader>
				<div>
					<h2 className="mb-2 font-bold">
						{getRelativeDate(currentDate)}
					</h2>
					<div className="flex flex-row w-full">
						<div className="flex-none mr-2">
							<Button sm onClick={rewindDate}>
								<Button.Icon>
									<FontAwesomeIcon icon="chevron-left" />
								</Button.Icon>
								{getRelativeDate(subDays(currentDate, 1))}
							</Button>
						</div>
						<div className="flex-grow"></div>
						<div className="flex-none">
							{differenceInCalendarDays(
								new Date(),
								currentDate
							) == 0 ? null : (
								<Button sm onClick={forwardDate}>
									{getRelativeDate(addDays(currentDate, 1))}
									<Button.Icon right>
										<FontAwesomeIcon icon="chevron-right" />
									</Button.Icon>
								</Button>
							)}
						</div>
					</div>
				</div>
			</PageHeader>
			<TaskGroupCard
				isLoading={isLoading}
				failed={error}
				onRetry={refetch}
				tasks={taskGroups[DoneStates.IN_PROGRESS]}
				doneState={DoneStates.IN_PROGRESS}
			/>
			<TaskGroupCard
				isLoading={isLoading}
				failed={error}
				onRetry={refetch}
				tasks={taskGroups[DoneStates.REMAINING]}
				doneState={DoneStates.REMAINING}
			/>
			<TaskGroupCard
				isLoading={isLoading}
				failed={error}
				onRetry={refetch}
				tasks={taskGroups[DoneStates.DONE]}
				doneState={DoneStates.DONE}
			/>
		</div>
	);
}

export default DayView;
