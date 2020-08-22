import React from "react";
import omit from "lodash/omit";
import Spinner from "./Spinner";

function getClassNames(props) {
  let classNames = `
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
      " bg-main-600 hover:bg-main-500 active:bg-main-700 text-white";
  } else if (props.secondary) {
    classNames +=
      " text-main-700 bg-main-100 hover:bg-main-50 focus:border-main-300 active:bg-main-200 ";
  } else {
    classNames +=
      " border-gray-300 text-gray-700 bg-white hover:text-gray-500 active:text-gray-800 active:bg-gray-50 ";
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
  if (props.primary || props.secondary) return "#fff";
  return "#00AD71";
}

function Button(props) {
  return (
    <button
      type="button"
      disabled={props.disabled ? props.disabled : props.loading ? true : false}
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
      ])}
    >
      {props.loading ? (
        <span className="absolute pin-c-x">
          <Spinner
            small
            size={getSizeForSpinner(props)}
            color={getSpinnerColor(props)}
          />
        </span>
      ) : null}
      {props.children}
    </button>
  );
}

export default Button;
