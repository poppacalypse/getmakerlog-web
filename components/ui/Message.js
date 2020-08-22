import React from "react";

function getColorForProps(props) {
	if (props.danger) {
		return "red";
	} else if (props.success) {
		return "green";
	} else if (props.warning) {
		return "yellow";
	} else {
		return "blue";
	}
}

function Message({ title = null, className = "", children, ...props }) {
	const color = getColorForProps(props);
	return (
		<div
			className={
				`rounded-md border border-${color}-200 bg-${color}-50 p-4 mb-4 last:mb-0 ` +
				className
			}
		>
			<div className="flex">
				<div>
					{title !== null && (
						<h5
							className={`mb-2 leading-5 font-medium text-${color}-800 last:mb-0`}
						>
							{title}
						</h5>
					)}
					{children && (
						<div className={`text-sm leading-5 text-${color}-700`}>
							{children}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Message;
