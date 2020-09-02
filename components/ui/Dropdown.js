import React, { useState, useRef } from "react";
import { Transition } from "@tailwindui/react";
import { useOutsideClick } from "utils/hooks";

function DropdownItemIcon({ children }) {
	return (
		<span className="w-3 h-3 mr-3 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
			{children}
		</span>
	);
}

function DropdownItem({ children, elem = "a", ...props }) {
	const Elem = elem;
	return (
		<Elem
			{...props}
			className="block text-sm text-gray-700 cursor-pointer px-3.5 py-1.5 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
		>
			{children}
		</Elem>
	);
}

function Dropdown({ children, items, origin = "top-right" }) {
	const [open, setOpen] = useState(false);

	const dropdownRef = useRef();

	useOutsideClick(
		dropdownRef,
		() => {
			setOpen(!open);
		},
		open
	);

	return (
		<div
			className="relative"
			onClick={() => setOpen(!open)}
			ref={dropdownRef}
		>
			<div>{children}</div>

			<Transition
				show={open}
				enter="transition ease-out duration-75 transform"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75 transform"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				{(ref) => (
					<div
						ref={ref}
						className={`origin-${origin} absolute right-0 mt-2 w-56 rounded-md shadow-lg z-20`}
					>
						<div className="bg-white rounded-md shadow-xs">
							<div
								className="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu"
							>
								{items}
							</div>
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
}

Dropdown.Item = DropdownItem;
Dropdown.Item.Icon = DropdownItemIcon;

export default Dropdown;
