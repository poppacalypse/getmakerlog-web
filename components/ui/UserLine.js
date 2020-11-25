import React from "react";
import FullName from "components/users/FullName";
import Avatar from "./Avatar";
import { Link } from "routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserLine({ user, className = "", withAvatar = true, style = {} }) {
	return (
		<Link route="profile" params={{ username: user.username }}>
			<a>
				<div
					style={style}
					className={
						"mb-1 text-xs text-gray-900 font-medium flex flex-row items-center" +
						className
					}
				>
					{withAvatar ? (
						<div className="mr-2">
							<Avatar size={6} user={user} />
						</div>
					) : null}
					<div className="space-x-1">
						<FullName user={user} />{" "}
						{user.is_staff ? (
							<span className="text-xs text-green-500 text-uppercase">
								<FontAwesomeIcon icon="check-circle" /> Staff
							</span>
						) : null}
						{user.verified && !user.is_staff ? (
							<span className="text-xs text-green-500 text-uppercase">
								<FontAwesomeIcon icon="check-circle" /> Verified
							</span>
						) : null}
						<span className="text-gray-500">@{user.username}</span>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default UserLine;
