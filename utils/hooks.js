import React from "react";
import { useRef, useEffect } from "react";
import { MobXProviderContext } from "mobx-react";

export function useStores() {
	return React.useContext(MobXProviderContext);
}

export function useOutsideClick(ref, callback, tracking) {
	useEffect(() => {
		if (!tracking) return;

		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				callback();
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [callback, ref, tracking]);
}

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
