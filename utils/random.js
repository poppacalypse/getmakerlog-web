import config from "config";
import flatten from "lodash/flatten";

export function buildAbsoluteUrl(path) {
	return `${config.BASE_URL}${path}`;
}

export function buildSocketUrl(path) {
	return `${config.WS_URL}${path}`;
}

export function extractResultsFromGroups(data) {
	return data ? flatten(data ? data.map(({ results }) => results) : []) : [];
}

export function onCmdEnter(e, callback) {
	if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
		e.preventDefault();
		callback();
	}
}

export function makeTwitterShareUrl(text) {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
