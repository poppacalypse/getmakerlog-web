import React, { useRef, useEffect } from "react";
import { usePrevious } from "utils/hooks";
import Form from "components/ui/Form";
import Avatar from "components/ui/Avatar";
import Spinner from "components/ui/Spinner";
import { useAuth } from "stores/AuthStore";

// TODO: Guest state.

function CommentInput({
	value,
	onChange,
	onSubmit,
	loading,
	disabled,
	focused,
	...props
}) {
	const { user, isLoggedIn } = useAuth();
	const textInput = useRef(null);
	const prevFocused = usePrevious(focused);

	useEffect(() => {
		// Focus on state change.
		if (!prevFocused && focused) {
			textInput.current.focus();
		}
	}, [focused]);

	if (!isLoggedIn) return null;

	return (
		<Form className="flex w-full items-center" onSubmit={onSubmit}>
			<div className="flex-none mr-2">
				<Avatar size={8} user={user} />
			</div>
			<div className="flex-grow mr-2">
				<input
					onChange={onChange}
					value={value}
					disabled={loading}
					placeholder="Say something nice..."
					autoFocus={focused}
					ref={textInput}
				/>
			</div>
			{loading && (
				<div className="flex-none">
					<Spinner small />
				</div>
			)}
		</Form>
	);
}

export default CommentInput;
