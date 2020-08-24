import React from "react";

export function FormActions({
	children,
	span = null,
	justifyEnd = true,
	className = "",
}) {
	return (
		<div
			className={
				"mt-4 border-t border-gray-200 pt-4 " +
				(span ? ` col-span-${span} ` : ``) +
				className
			}
		>
			<div className={`flex ${justifyEnd ? "justify-end" : ""}`}>
				{children}
			</div>
		</div>
	);
}

export function FormField({
	children,
	span = 4,
	name = "",
	label = "",
	help = null,
	error = null,
	className = "",
	...props
}) {
	return (
		<div className={`col-span-${span} ` + className}>
			{label ? (
				<label
					htmlFor={name}
					className="block text-sm font-medium leading-5 text-gray-700"
				>
					{label}
				</label>
			) : null}
			<div className="mt-1 w-full">{children}</div>
			{help || error ? (
				<p
					className={`mt-2 text-sm text-${
						error ? "red" : "gray"
					}-500`}
				>
					{error || help}
				</p>
			) : null}
		</div>
	);
}

export function FormControls({ children, className = "" }) {
	return (
		<div
			className={
				"grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6 " + className
			}
		>
			{children}
		</div>
	);
}

function Form({ onSubmit = () => {}, children, ...props }) {
	return <form onSubmit={props.onSubmit}>{children}</form>;
}

Form.Controls = FormControls;
Form.Actions = FormActions;
Form.Field = FormField;

export default Form;
