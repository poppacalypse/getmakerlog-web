import URLComponent from "components/renderers/URLComponent";
import ReactMarkdown from "react-markdown";
import linkifyRegex from "remark-linkify-regex";
import mentionsRegex from "mentions-regex";
import MentionComponent from "components/renderers/MentionComponent";

function DiscussionsTextRenderer({ object }) {
	// Hack to preserve newlines.
	// https://github.com/remarkjs/react-markdown/issues/278
	return (
		<ReactMarkdown
			linkTarget="_blank"
			renderers={{
				link: ({ href, ...props }) => {
					if (href.startsWith("@")) {
						// It's a mention
						return MentionComponent(href, [href]);
					} else {
						// aw. ful.
						return URLComponent(href, [
							props.children[0]
								? props.children[0].props.value
								: href,
						]);
					}
				},
			}}
			source={object.body.replace(/\n/gi, "\n &nbsp;")}
			plugins={[linkifyRegex(mentionsRegex())]}
		/>
	);
}

export default DiscussionsTextRenderer;
