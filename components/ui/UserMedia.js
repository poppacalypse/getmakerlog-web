import React from "react";
import FullName from "components/users/FullName";
import Streak from "./Streak";
import Avatar from "./Avatar";

function UserMedia({
	user,
	action = null,
	actions = null,
	extra = null,
	extraStreakText = true,
}) {
	return (
		<div className="flex items-center justify-between space-x-3">
			<Avatar size={10} user={user} className="flex-shrink-0" />
			<div className="flex-1">
				<h2 className="text-gray-900 text-sm leading-5 font-medium">
					<FullName user={user} />{" "}
					{action ? (
						<span className="text-gray-700">{action}</span>
					) : null}
				</h2>
				<p className="text-gray-500 text-sm leading-5 truncate">
					<span className="mr-2">@{user.username}</span>
					<span className="mr-2">
						<Streak text={extraStreakText} days={user.streak} />
					</span>
					{extra ? extra : null}
				</p>
				{actions ? actions : null}
			</div>
		</div>
	);
}

export default UserMedia;
