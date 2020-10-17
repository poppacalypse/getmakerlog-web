import React, { useCallback, useState } from "react";
import { useRef, useEffect } from "react";
import { MobXProviderContext } from "mobx-react";
import { useDropzone } from "react-dropzone";

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

export function useImageUpload() {
	const [attachmentState, setAttachmentState] = useState({
		attachment: null,
		name: null,
		preview: null,
	});

	const onDrop = useCallback((acceptedFiles) => {
		const reader = new FileReader();
		const attachment = acceptedFiles[0];

		reader.onloadend = () => {
			setAttachmentState({
				attachment,
				name: attachment.name,
				preview: reader.result,
			});
		};

		if (attachment) {
			reader.readAsDataURL(attachment);
		}
	}, []);

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		accept: "image/jpeg, image/png",
	});

	return {
		getRootProps,
		getInputProps,
		open,
		isDragActive,
		attachmentState,
	};
}

export function useEventListener(eventName, handler, element = window) {
	// Create a ref that stores handler
	const savedHandler = useRef();

	// Update ref.current value if handler changes.
	// This allows our effect below to always get latest handler ...
	// ... without us needing to pass it in effect deps array ...
	// ... and potentially cause effect to re-run every render.
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(
		() => {
			// Make sure element supports addEventListener
			// On
			const isSupported = element && element.addEventListener;
			if (!isSupported) return;

			// Create event listener that calls handler function stored in ref
			const eventListener = (event) => savedHandler.current(event);

			// Add event listener
			element.addEventListener(eventName, eventListener);

			// Remove event listener on cleanup
			return () => {
				element.removeEventListener(eventName, eventListener);
			};
		},
		[eventName, element] // Re-run if eventName or element changes
	);
}
