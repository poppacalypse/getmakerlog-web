import React from "react";
import Button from "components/ui/Button";
import LatestThreads from "components/discussions/LatestThreads";
import PageHeader from "components/ui/PageHeader";
import NarrowLayout from "layouts/NarrowLayout";

function DiscussionsPage() {
	return (
		<NarrowLayout>
			<PageHeader>
				<h2 className="font-bold">Discussions</h2>
				<div className="flex-grow"></div>
				<div>
					<Button secondary>New discussion</Button>
				</div>
			</PageHeader>
			<LatestThreads />
		</NarrowLayout>
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
