import React from "react";

function DiscussionThreadPage() {
	return <div></div>;
}

DiscussionThreadPage.getInitialProps = async () => {
	return {
		layout: {
			layout: "app",
			allowGuest: true,
		},
	};
};

export default DiscussionThreadPage;
