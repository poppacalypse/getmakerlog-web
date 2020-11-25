import React from "react";
import omit from "lodash/omit";
import Spinner from "./Spinner";

function getClassNames(props) {
	let classNames = `
	appearance-none
    inline-flex 
    items-center 
    border border-transparent 
    font-medium 
    rounded-md 
    focus:outline-none 
    relative
    transition ease-in-out duration-150 `;

	if (props.xs) {
		classNames += " px-2.5 py-1.5 text-xs leading-4 ";
	} else if (props.sm) {
		classNames += " px-3 py-2 text-sm leading-4";
	} else if (props.lg) {
		classNames += " px-4 py-2 text-base leading-6 ";
	} else if (props.xl) {
		classNames += " px-6 py-3 text-base leading-6 ";
	} else {
		classNames += " px-4 py-2 text-sm leading-5 ";
	}

	if (props.primary) {
		classNames +=
			" bg-green-600 hover:bg-green-500 active:bg-green-700 text-white";
	} else if (props.secondary) {
		classNames +=
			" text-green-700 bg-green-100 border border-green-200 hover:bg-green-50 focus:border-green-300 active:bg-green-200 ";
	} else if (props.danger) {
		classNames +=
			" text-red-700 bg-red-100 border border-red-200 hover:bg-red-50 focus:border-red-300 active:bg-red-200 ";
	} else {
		classNames +=
			" border-gray-300 text-gray-700 bg-white hover:text-gray-500 active:text-gray-800 active:bg-gray-50 ";
	}

	if (props.disabled) {
		classNames += " opacity-75 cursor-not-allowed ";
	}

	classNames += props.className ? props.className : "";
	return classNames;
}

function getSizeForSpinner(props) {
	if (props.xl) return 35;
	if (props.lg) return 30;
	if (props.sm) return 15;
	if (props.xs) return 10;
	return 20;
}

function getSpinnerColor(props) {
	if (props.primary || props.secondary || props.danger) return "#fff";
	return "#00AD71";
}

function ButtonIcon({ children, right = false }) {
	return (
		<span
			className={right ? "w-4 h-4 ml-2 -mr-0.5" : "w-4 h-4 mr-2 -ml-0.5"}
		>
			{children}
		</span>
	);
}

class Button extends React.Component {
	render() {
		const props = this.props;
		const Tag = props.anchorElem ? `a` : `button`;

		const extraProps = {};
		if (props.anchorElem) {
			extraProps.href = props.href;
			extraProps.target = props.target;
		}

		return (
			<Tag
				type="button"
				disabled={
					props.disabled
						? props.disabled
						: props.loading
						? true
						: false
				}
				className={getClassNames(props)}
				style={props.loading ? { color: "transparent" } : {}}
				{...omit(props, [
					"className",
					"loading",
					"disabled",
					"primary",
					"sm",
					"secondary",
					"lg",
					"xs",
					"xl",
					"anchorElem",
					"div",
					"danger",
				])}
				{...extraProps}
			>
				{props.loading ? (
					<Spinner
						className="absolute pin-c-x"
						small
						size={getSizeForSpinner(props)}
						color={getSpinnerColor(props)}
					/>
				) : null}
				{props.children}
			</Tag>
		);
	}
}

Button.Icon = ButtonIcon;

export default Button;
