import React from "react";
import processString from "react-process-string";
import OutboundLink from "components/seo/OutboundLink";
import urlRegex from "url-regex";
import ProductTag from "components/products/ProductTag";
import { findProductInTaskSet } from "utils/tasks";
import mentionsRegex from "mentions-regex";
import hashtagRegex from "hashtag-regex";
import { Link } from "routes";

const URLComponent = (key, result) => {
	return (
		<OutboundLink icon to={result[0]} key={key}>
			{result[0]}
		</OutboundLink>
	);
};

const HashtagComponent = (key, result, task) => {
	const tag = result[0].replace("#", "");
	if (!task.product_set) return <span key={key}>#{tag}</span>;
	const product = findProductInTaskSet(task, tag);
	if (!product) return <span key={key}>#{tag}</span>;
	return <ProductTag product={product} tag={tag} key={key} />;
};

const MentionComponent = (key, result) => {
	return (
		<Link route="not-implemented" key={key}>
			<a>{result[0]}</a>
		</Link>
	);
};

function TaskTextRenderer({ task }) {
	return processString([
		{
			regex: urlRegex(),
			fn: URLComponent,
		},
		{
			regex: hashtagRegex(),
			fn: (key, result) => HashtagComponent(key, result, task),
		},
		{
			regex: mentionsRegex(),
			fn: MentionComponent,
		},
	])(task.content);
}

export default TaskTextRenderer;
