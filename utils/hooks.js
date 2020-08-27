import React from "react";
import { useRef, useEffect } from "react";
import { MobXProviderContext } from "mobx-react";

export function useStores() {
	return React.useContext(MobXProviderContext);
}

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
