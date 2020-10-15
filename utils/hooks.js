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
