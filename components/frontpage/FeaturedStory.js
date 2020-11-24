import PostCard from "components/stories/PostCard";
import React from "react";

export default function FeaturedStory({ frontpage }) {
	if (!(frontpage && frontpage.featuredPost)) return null;

	return (
		<div className="mb-4">
			<h3 className="mb-2 font-semibold">On Makerlog Stories</h3>
			<PostCard post={frontpage.featuredPost} />
		</div>
	);
}
