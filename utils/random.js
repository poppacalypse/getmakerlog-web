import config from "config";

export function buildAbsoluteUrl(path) {
	return `${config.BASE_URL}${path}`;
}
