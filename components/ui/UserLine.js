import React from "react";
import FullName from "components/users/FullName";

function UserLine({ user }) {
	return (
		<div className="mb-1 text-xs font-medium">
			<FullName user={user} />{" "}
			<span className="text-gray-500">@{user.username}</span>
		</div>
	);
}

export default UserLine;
