import React from "react";
import FullName from "components/users/FullName";
import Streak from "./Streak";
import Avatar from "./Avatar";
import { isNewUser } from "utils/user";
import { Link } from "routes";

function UserMedia({
	user,
	action = null,
	actions = null,
	extra = null,
	extraStreakText = true,
}) {
	return (
		<div className="flex items-center justify-between space-x-3">
			<Link route="profile" params={{ username: user.username }}>
				<a className="flex-shrink-0">
					<Avatar size={10} user={user} />
				</a>
			</Link>
			<div className="flex-1">
				<h2 className="text-sm font-medium text-gray-900 leading-5">
					<Link route="profile" params={{ username: user.username }}>
						<a className="text-gray-900 unstyled-a">
							<FullName user={user} />
						</a>
					</Link>{" "}
					{action ? (
						<span className="text-gray-700">{action}</span>
					) : null}
				</h2>
				<p className="text-sm text-gray-500 truncate leading-5">
					<span className="mr-2">@{user.username}</span>
					<span className="mr-2">
						<Streak text={extraStreakText} days={user.streak} />
					</span>
					{isNewUser(user) && (
						<span className="mr-2">
							<small>👋</small> Say hi!
						</span>
					)}
					{extra ? extra : null}
				</p>
				{actions ? actions : null}
			</div>
		</div>
	);
}

export default UserMedia;
