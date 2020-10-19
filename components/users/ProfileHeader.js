import Avatar from "components/ui/Avatar";
import Container from "components/ui/Container";
import React from "react";
import FullName from "./FullName";

function ProfileHeader({
	user,
	stats = null,
	bottomNav = null,
	halfWidth = false,
}) {
	return (
		<>
			<div className="bg-white border-b">
				{!user.header ? (
					<div className="flex items-center justify-center object-cover w-full h-64 bg-green-500"></div>
				) : (
					<img
						src={user.header}
						className={`object-cover w-full ${
							halfWidth ? "h-32" : "h-64"
						}`}
						alt=""
					/>
				)}
			</div>
			<div className="relative text-center border-b border-l border-r border-gray-200 bg-gray-50">
				<Container>
					<div
						className="absolute left-0 flex items-center justify-center w-full"
						style={{ top: "-4rem" }}
					>
						<Avatar
							className="border border-green-500"
							user={user}
							size={32}
						/>
					</div>
					<div className="flex-1 min-w-0 py-4 pt-20">
						<h2 className="mb-2 text-xl font-bold text-gray-900 sm:truncate">
							<FullName user={user} />
							<div className="text-sm font-normal text-gray-500">
								@{user.username}
							</div>
						</h2>
						{user.description !== null && (
							<p className="mb-1 text-gray-700">
								{user.description}
							</p>
						)}
						<small className="text-sm text-gray-500 space-x-3">
							<span>🔥 {user.streak} day streak</span>
							{stats && (
								<span>🛠 {stats.products_made} products</span>
							)}
							{stats && (
								<span>👏 {stats.praise_received} praise</span>
							)}
						</small>
					</div>
					{bottomNav}
				</Container>
			</div>
		</>
	);
}

export default ProfileHeader;
