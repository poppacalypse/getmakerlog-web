import React, { useState } from "react";
import Card from "components/ui/Card";
import { Activity as ActivityContainer } from "utils/getstream";
import UserMedia from "components/ui/UserMedia";
import { Link } from "routes";
import pluralize from "pluralize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLogger } from "utils/logging";
import Task from "components/tasks/Task";
import Button from "components/ui/Button";
import NotImplemented from "components/error/NotImplemented";
import TaskActions from "components/tasks/TaskActions";
import ErrorCard from "components/ui/ErrorCard";
import { useAuth } from "stores/AuthStore";

const log = getLogger("Activity");

// TODO: Fix ItemLink routes.

function ItemLink({ type, item, children, loggedInOnly = false }) {
	const { isLoggedIn } = useAuth();

	if (!item) return children;

	if (loggedInOnly && !isLoggedIn) {
		return (
			/*<Link route="start">*/
			<a target="_blank" rel="noopener noreferrer">
				{children}
			</a>
			/*</Link> */
		);
	}

	switch (type) {
		case "task":
			return (
				/* <Link route="task-page" params={{ id: item.id }}> */
				<a target="_blank" rel="noopener noreferrer">
					{children}
				</a>
				/*</Link>*/
			);

		case "thread":
			return (
				/* <Link
					route="discussion-page"
					params={{ slug: item.slug }}
				> */
				<a target="_blank" rel="noopener noreferrer">
					{children}
				</a>
				/* </Link>*/
			);

		case "reply":
			return (
				/* <Link
					href={`/discussions/${item.parent}/#reply-${item.id}`}
				>*/
				<a target="_blank" rel="noopener noreferrer">
					{children}
				</a>
				/* </Link>*/
			);

		default:
			return children;
	}
}

function getTargetTitle(type, target) {
	if (!target) return null;

	if (type === "thread") {
		return `"${target.title}"`;
	}

	return null;
}

function getHumanTargetType(activity) {
	let getPrefix = (count) => (count == 1 ? "a" : count);
	if (activity.getType() === "aggregated") {
		const count = activity.getRawChildren().length;
		const targetType = activity.childrenHaveSameTargetType()
			? activity.getRawChildren()[0].target_type
			: null;
		const target = activity.childrenHaveSameTargetType()
			? activity.getTargetObject()
			: null;
		if (!targetType) {
			return null;
		}
		const typeText = pluralize(targetType, count);
		const targetTitle = getTargetTitle(targetType, target);
		if (targetTitle) {
			return count == 1 ? (
				<ItemLink item={target} type={targetType}>
					{targetTitle}
				</ItemLink>
			) : (
				`${targetTitle}`
			);
		}
		return count == 1 ? (
			<ItemLink item={target} type={targetType}>
				{getPrefix(count)} {typeText}
			</ItemLink>
		) : (
			`${getPrefix(count)} ${typeText}`
		);
	} else {
		if (!activity.getTarget() || !activity.getTargetType()) {
			return null;
		}
		const target = activity.getTargetObject();
		const targetType = activity.getTargetType();
		const typeText = pluralize(targetType, 1);
		const targetTitle = getTargetTitle(targetType, target);
		if (targetTitle) {
			return (
				<ItemLink item={target} type={targetType}>
					{targetTitle}
				</ItemLink>
			);
		}
		return (
			<ItemLink item={target} type={targetType}>
				{getPrefix(count)} {typeText}
			</ItemLink>
		);
	}
}

function getHumanActivityObject(activity) {
	let getPrefix = (count) => (count == 1 ? "a" : count);
	if (activity.getType() === "aggregated") {
		const count = activity.getRawChildren().length;
		const objectType = activity.childrenHaveSameObjectType()
			? activity.getObject().type
			: "thing";
		const object = activity.childrenHaveSameObjectType()
			? activity.getObject().object
			: null;
		return count == 1 ? (
			<ItemLink item={object} type={objectType}>
				{getPrefix(count)} {pluralize(objectType, count)}
			</ItemLink>
		) : (
			`${getPrefix(count)} ${pluralize(objectType, count)}`
		);
	} else {
		return (
			<ItemLink
				item={activity.getObject().object}
				type={activity.getObjectType()}
			>
				{getPrefix(1)} {pluralize(activity.getObjectType(), 1)}
			</ItemLink>
		);
	}
}

const ActivityTypeUnknown = ({ activity }) => {
	return (
		<ErrorCard
			title="Unknown activity object type."
			message="
		Psst, if you see this in prod, wake up Sergio and tell him
		everything broke again."
		/>
	);
};

const ActivityDeleted = ({ activity }) => {
	return <div className="ActivityItemContainer">Content deleted.</div>;
};

function ActivityObject({ activity, ...props }) {
	const { user } = useAuth();
	if (!activity.getObject()) return <ActivityDeleted />;
	const { object, type } = activity.getObject();
	const target = activity.getTarget();

	switch (type) {
		case "task":
			// Render without attachments because we're rendering them apart.
			return <Task withAttachments={false} task={object} />;

		default:
			return <ActivityTypeUnknown />;
	}
}

const ActivityObjectGroup = ({ activities }) => {
	if (activities.length === 0) return null;
	/*
    if (activities.every((a) => a.getObjectType() === "task")) {
		return <TaskActivityGroup activities={activities} />;
    }
    */
	return activities.map((a) => <ActivityObject key={a.id} activity={a} />);
};

function TaskActivityControls({ task }) {
	return (
		<div className="actions p-4 pt-0">
			<TaskActions task={task} />
		</div>
	);
}

const ActivityControls = ({ activity }) => {
	if (!activity.getObject() || activity.getType() === "aggregated")
		return null;
	const { object, type } = activity.getObject();

	switch (type) {
		case "task":
			return <TaskActivityControls task={object} />;
		default:
			return null;
	}
};

const ActivityAttachment = ({ activity }) => {
	const attachment = activity.getObjectAttachment();
	if (!attachment) return null;
	if (activity.getObjectType() === "task") {
		return (
			<div className="attachment mb-4 bg-gray-100 border border-r-0 border-l-0 border-gray-200 bg-center">
				<img
					className="block max-w-full w-full"
					src={attachment}
					alt={"Attachment to task."}
				/>
			</div>
		);
	}
};

function Activity({ activity, ...props }) {
	activity = new ActivityContainer(activity);
	if (!activity.check()) {
		log(`An activity failed a integrity check. ${activity.getId()}`);
		return null;
	}
	return (
		<Card>
			<div className="actor p-4 pb-0 text-gray-50 flex">
				{activity.getActorObject() &&
					activity.getActorObject().username && (
						<UserMedia
							user={activity.getActorObject()}
							action={
								<>
									{`${activity.getVerb()} `}
									{getHumanTargetType(activity) ||
										getHumanActivityObject(activity)}
								</>
							}
						/>
					)}
				<div className="flex-grow"></div>
				<div className="text-gray-300">
					<FontAwesomeIcon icon="caret-down" />
				</div>
			</div>
			<Card.Content>
				{activity.getType() === "aggregated" ? (
					<ActivityObjectGroup activities={activity.getChildren()} />
				) : (
					<ActivityObject activity={activity} />
				)}
			</Card.Content>
			<ActivityAttachment activity={activity} />
			<ActivityControls activity={activity} />
		</Card>
	);
}

export default Activity;

/*

<div className="editor bg-white rounded-md mb-4 shadow-xs">
	<div className="Post">
		<div className="actor p-4 text-gray-50 flex">
			<UserMedia
				action="completed a task"
				user={{
					id: 5,
					username: "sergio",
					streak: 50,
					avatar:
						"https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/22/IMG-20200623-WA0106.jpg",
				}}
			/>
			<div className="flex-grow"></div>
			<div className="text-gray-300">
				<FontAwesomeIcon icon="caret-down" />
			</div>
		</div>
		<div className="object px-4 py-4 pt-0 ">
			<div className="task text-lg font-semibold mb-1 text-gray-900">
				<span className="text-green-500">
					<FontAwesomeIcon icon="check-circle" />
				</span>{" "}
				Did something pretty cool.
			</div>
			<p className="text-gray-800 ml-2 p-4 border-l border-gray-200">
				I love doing what I do. Today I basically completed an amazing
				new part of the Makerlog infrastructure, and I'm really happy
				about it. I'm making a lot of progress lately!
			</p>
		</div>
		<div className="attachment bg-gray-100 border border-r-0 border-l-0 border-gray-200 bg-center">
			<img
				className="block"
				src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
				alt=""
			/>
		</div>
		<div className="actions p-4">
			<span className="inline-flex rounded-md shadow-sm">
				<button
					type="button"
					className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
				>
					<span className="-ml-0.5 mr-2 h-4 w-4">
						<FontAwesomeIcon icon="star" />
					</span>
					Praise
					<div className="ml-2 flex relative z-0 overflow-hidden">
						<img
							className="relative z-30 inline-block h-4 w-4 rounded-full text-white shadow-solid"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
						<img
							className="relative z-20 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
						<img
							className="relative z-10 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
							src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
							alt=""
						/>
						<img
							className="relative z-0 -ml-1 inline-block h-4 w-4 rounded-full text-white shadow-solid"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
				</button>
				<button
					type="button"
					className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
				>
					<span className="-ml-0.5 mr-2 h-4 w-4">
						<FontAwesomeIcon icon="comment" />
					</span>
					Comment
				</button>

				<button
					type="button"
					className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
				>
					<span className="-ml-0.5 mr-2 h-4 w-4">
						<FontAwesomeIcon icon="ellipsis-v" />
					</span>
					More
				</button>
			</span>
		</div>
	</div>
</div>;

*/
