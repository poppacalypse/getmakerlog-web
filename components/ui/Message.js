import React from "react";

// TODO: Fix PostCSS erasing these classnames
function getClassForProps(props) {
	if (props.danger) {
		return "border-red-200 bg-red-50";
	} else if (props.success) {
		return "border-green-200 bg-green-50";
	} else if (props.warning) {
		return "border-yellow-200 bg-yellow-50";
	} else {
		return "border-blue-200 bg-blue-50";
	}
}

function getStrongTextColor(props) {
	if (props.danger) {
		return "text-red-800";
	} else if (props.success) {
		return "text-green-800";
	} else if (props.warning) {
		return "text-yellow-800";
	} else {
		return "text-blue-800";
	}
}

function getSemiStrongTextColor(props) {
	if (props.danger) {
		return "text-red-700";
	} else if (props.success) {
		return "text-green-700";
	} else if (props.warning) {
		return "text-yellow-700";
	} else {
		return "text-blue-700";
	}
}

function Message({
	title = null,
	titleHint = null,
	className = "",
	children,
	...props
}) {
	return (
		<div
			className={
				`rounded-md border p-4 mb-4 last:mb-0 ` +
				getClassForProps(props) +
				` ${className}`
			}
		>
			<div className="flex">
				<div>
					{title !== null && (
						<h5
							title={titleHint}
							className={
								`mb-2 leading-5 font-medium last:mb-0 ` +
								getStrongTextColor(props)
							}
						>
							{title}
						</h5>
					)}
					{children && (
						<div
							className={
								`text-sm leading-5 ` +
								getSemiStrongTextColor(props)
							}
						>
							{children}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Message;
