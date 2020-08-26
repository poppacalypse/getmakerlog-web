import React from "react";
import FullName from "components/users/FullName";

function UserLine({ user }) {
	return (
		<div className="text-xs font-medium mb-1">
			<FullName user={user} />{" "}
			<span className="text-gray-500">@{user.username}</span>
		</div>
	);
}

export default UserLine;
