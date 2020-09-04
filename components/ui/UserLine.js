import React from "react";
import FullName from "components/users/FullName";
import Avatar from "./Avatar";

function UserLine({ user, className = "", withAvatar = true, style = {} }) {
	return (
		<div
			style={style}
			className={
				"mb-1 text-xs font-medium flex flex-row items-center" +
				className
			}
		>
			{withAvatar ? (
				<div className="mr-2">
					<Avatar size={6} user={user} />
				</div>
			) : null}
			<div>
				<FullName user={user} />{" "}
				<span className="text-gray-500">@{user.username}</span>
			</div>
		</div>
	);
}

export default UserLine;
