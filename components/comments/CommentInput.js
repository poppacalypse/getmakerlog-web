import React, { useRef, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { usePrevious } from "utils/hooks";
import Form from "components/ui/Form";
import Avatar from "components/ui/Avatar";
import Spinner from "components/ui/Spinner";

// TODO: Guest state.

function CommentInput({
	value,
	onChange,
	onSubmit,
	loading,
	disabled,
	auth,
	focused,
	...props
}) {
	const textInput = useRef(null);
	const prevFocused = usePrevious(focused);

	useEffect(() => {
		// Focus on state change.
		if (!prevFocused && focused) {
			textInput.current.focus();
		}
	}, [focused]);

	return (
		<Form className="flex w-full items-center" onSubmit={onSubmit}>
			<div className="flex-none mr-2">
				<Avatar size={8} user={auth.user} />
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

export default inject("auth")(observer(CommentInput));
