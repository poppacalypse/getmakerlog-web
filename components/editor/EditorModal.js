import React from "react";
import Modal from "components/ui/Modal";
import Editor from "./Editor";

function EditorModal({ open, onClose }) {
	return (
		<Modal open={open} onClose={onClose}>
			<Editor onFinish={onClose} />
		</Modal>
	);
}

export default EditorModal;
