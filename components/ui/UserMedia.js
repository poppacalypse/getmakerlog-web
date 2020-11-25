import React from "react";
import FullName from "components/users/FullName";
import Streak from "./Streak";
import Avatar from "./Avatar";
import { isNewUser } from "utils/user";
import { Link } from "routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserMedia({
	user,
	action = null,
	actions = null,
	extra = null,
	extraStreakText = true,
	truncateName = false,
}) {
	return (
		<div className="flex items-center justify-between space-x-3">
			<Link route="profile" params={{ username: user.username }}>
				<a className="flex-shrink-0">
					<Avatar size={10} user={user} />
				</a>
			</Link>
			<div className="flex-1" style={{ minWidth: 0 }}>
				<h2 className="text-sm font-medium text-gray-900 leading-5">
					<Link route="profile" params={{ username: user.username }}>
						<a className="text-gray-900 unstyled-a">
							<FullName
								className={truncateName ? "block truncate" : ""}
								user={user}
							/>
						</a>
					</Link>{" "}
					{action ? (
						<span className="text-gray-700">{action}</span>
					) : null}
				</h2>
				<p className="text-sm text-gray-500 truncate leading-5 space-x-2">
					{!truncateName && user.is_staff ? (
						<span className="text-xs text-green-500 text-uppercase">
							<FontAwesomeIcon icon="check-circle" /> Staff
						</span>
					) : null}
					{!truncateName && user.verified && !user.is_staff ? (
						<span className="text-xs text-blue-500 text-uppercase">
							<FontAwesomeIcon icon="check-circle" /> Verified
						</span>
					) : null}
					{!truncateName &&
					user.gold &&
					!user.verified &&
					!user.is_staff ? (
						<span className="text-xs text-yellow-500 text-uppercase">
							<FontAwesomeIcon icon="check-circle" /> Patron
						</span>
					) : null}
					<span>@{user.username}</span>
					<span>
						<Streak text={extraStreakText} days={user.streak} />
					</span>
					{isNewUser(user) && (
						<span>
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
