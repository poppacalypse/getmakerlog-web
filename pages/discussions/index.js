import React from "react";
import Button from "components/ui/Button";
import AppLayout from "layouts/AppLayout";
import StickyNav from "components/ui/StickyNav";
import LatestDiscussions from "components/discussions/LatestDiscussions";

function DiscussionsPage() {
	return (
		<AppLayout.WithTopBar
			topBar={
				<StickyNav sticky={false}>
					<div className="flex flex-row items-center">
						<h2 className="font-bold">Discussions</h2>
						<div className="flex-grow"></div>
						<div>
							<Button secondary>New discussion</Button>
						</div>
					</div>
				</StickyNav>
			}
		>
			<LatestDiscussions />
		</AppLayout.WithTopBar>
	);
}

DiscussionsPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
			contained: false,
		},
	};
};

export default DiscussionsPage;
