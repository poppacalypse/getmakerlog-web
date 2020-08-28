import React from "react";

function Avatar({ size, user, className = "" }) {
	return (
		<img
			className={`h-${size} w-${size} rounded-full ` + className}
			src={user.avatar}
			alt={user.username}
		/>
	);
}

export default Avatar;
