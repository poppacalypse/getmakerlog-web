import config, { isServer } from "config";
import { getLogger } from "utils/logging";

const log = getLogger("GA");

export const pageview = (url) => {
	if (isServer || !window.gtag) {
		log(`!!Pageview ran on server. (${url})`);
		return;
	}
	log(`Pageview recorded. (${url})`);
	window.gtag("config", config.GA_UA, {
		page_path: url,
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	if (isServer || !window.gtag) {
		log(`!!Event ran on server. (${action})`);
		return;
	}
	log(`Event recorded. (${action})`);
	window.gtag("event", action, {
		event_category: category,
		event_label: label,
		value: value,
	});
};
