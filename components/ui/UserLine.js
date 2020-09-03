import React from "react";
import FullName from "components/users/FullName";

function UserLine({ user, className = "", style = {} }) {
	return (
		<div style={style} className={"mb-1 text-xs font-medium " + className}>
			<FullName user={user} />{" "}
			<span className="text-gray-500">@{user.username}</span>
		</div>
	);
}

export default UserLine;
