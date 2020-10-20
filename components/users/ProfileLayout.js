import Container from "components/ui/Container";
import NarrowLayout from "layouts/NarrowLayout";
import { useUserStats } from "queries/stats";
import React from "react";
import ProfileHeader from "./ProfileHeader";

export default function ProfileLayout({
	user,
	headerProps = {},
	layoutProps = {},
	children,
}) {
	// not terribly essential, not to worried about error states
	const { data: stats } = useUserStats(user.username);

	return (
		<div>
			<ProfileHeader
				{...headerProps}
				user={user}
				stats={stats ? stats : null}
			/>

			<Container className="py-4">
				<NarrowLayout {...layoutProps}>{children}</NarrowLayout>
			</Container>
		</div>
	);
}
