import React, { useState, useRef } from "react";
import { Transition } from "@tailwindui/react";
import { useOutsideClick } from "utils/hooks";

function DropdownItemIcon({ children }) {
	return (
		<span className="mr-3 h-3 w-3 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
			{children}
		</span>
	);
}

function DropdownItem({ children, ...props }) {
	return (
		<div
			{...props}
			className="cursor-pointer block px-3.5 py-1.5 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
		>
			{children}
		</div>
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
			onClick={(e) => setOpen(!open)}
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
						className={`origin-${origin} absolute right-0 mt-2 w-56 rounded-md shadow-lg`}
					>
						<div className="rounded-md bg-white shadow-xs">
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
