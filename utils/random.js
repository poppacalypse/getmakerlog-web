import config from "config";
import flatten from "lodash/flatten";

export function buildAbsoluteUrl(path) {
	return `${config.BASE_URL}${path}`;
}

export function extractResultsFromGroups(data) {
	return flatten(data ? data.map(({ results }) => results) : []);
}
