import orderBy from "lodash/orderBy";

export function getTwitterShareUrl(tasks, me = null) {
	// We assume it has been serialized and validated.
	if (tasks.length === 0) return null;
	let user = tasks[0].user;
	let name = user.twitter_handle ? `@${user.twitter_handle}` : user.username;
	let text = `Done today by ${name} on @GetMakerlog:\n`;
	if (me && me.id === user.id) {
		text = `Done today on @GetMakerlog:\n`;
	}
	orderBy(tasks, "created_at", "asc").map((task) => {
		text = text + `\n✅ ${task.content}`;
		return true;
	});
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
