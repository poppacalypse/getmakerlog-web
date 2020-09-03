import React, { useState } from "react";
import Card from "components/ui/Card";
import Avatar from "components/ui/Avatar";
import { useAuth } from "stores/AuthStore";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskEditor() {
	const { user } = useAuth();
	const [content, setContent] = useState("");

	return (
		<div>
			<div className="flex items-center input-flex">
				<span className="relative flex-none mr-2">
					<Avatar size={8} user={user} />
					<FontAwesomeIcon
						className="absolute text-green-500 bg-white rounded-full"
						style={{ right: "-4px", top: "-4px" }}
						icon="check-circle"
					/>
				</span>
				<input
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-grow w-full"
					type="text"
					placeholder="Start typing something you've done or made..."
				/>
			</div>
			{content.length > 0 && (
				<>
					<textarea
						rows={4}
						className="w-full mt-2"
						placeholder="Write a description or drop images here..."
					/>
					<div className="flex flex-row w-full mt-4">
						<div className="flex-none mr-2">
							<Button sm>
								Completed
								<Button.Icon right>
									<FontAwesomeIcon icon="caret-down" />
								</Button.Icon>
							</Button>
						</div>
						<div className="flex-grow"></div>
						<div className="flex-none">
							<Button primary sm>
								Post
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function Editor() {
	/**
	 * Four tabs!
	 * - Completed
	 * - In Progress
	 * - Remaining
	 * - Discussion
	 */
	const [tab, setTab] = useState(0);

	return (
		<Card>
			<Card.Content>
				<div className="mb-2">
					<small className="inline-flex">
						<a
							onClick={() => setTab(0)}
							className={
								"mr-2 font-medium cursor-pointer " +
								(tab == 0 ? "text-green-700" : "text-gray-500")
							}
						>
							Task
						</a>
						<a
							onClick={() => setTab(1)}
							className={
								"mr-2 font-medium cursor-pointer " +
								(tab == 1 ? "text-green-700" : "text-gray-500")
							}
						>
							Discussion
						</a>
					</small>
				</div>
				{tab === 0 && <TaskEditor />}
			</Card.Content>
		</Card>
	);
}

export default Editor;
