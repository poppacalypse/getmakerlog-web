import React from "react";
import { imageUrl } from "vendor/imagekit";

function Avatar({ size, user, className = "" }) {
	const optSize = size >= 48 ? 128 : 48;
	return (
		<img
			className={`h-${size} w-${size} rounded-full ` + className}
			src={imageUrl(user.avatar, optSize)}
			alt={user.username}
		/>
	);
}

export default Avatar;
