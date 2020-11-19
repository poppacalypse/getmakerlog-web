import React from "react";
import { isOcurring } from "utils/events";

export default function EventDateIcon({ event }) {
	const startingDate = new Date(event.starts_at);
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 w-14 h-14 rounded-md">
			{isOcurring(event) ? (
				<h4 className="font-bold text-red-500">LIVE</h4>
			) : (
				<>
					<p className="text-xs">
						{startingDate.toLocaleString("default", {
							month: "short",
						})}
					</p>
					<h4 className="font-bold">{startingDate.getDate()}</h4>
				</>
			)}
		</div>
	);
}
