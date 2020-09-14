import React from "react";
import Modal from "components/ui/Modal";
import Editor from "./Editor";
import { useHotkeys } from "react-hotkeys-hook";

function EditorModal({ open, onClose }) {
	useHotkeys("command+b,ctrl+B", () => onClose());

	return (
		<Modal open={open} onClose={onClose}>
			<Editor onFinish={onClose} />
		</Modal>
	);
}

export default EditorModal;
