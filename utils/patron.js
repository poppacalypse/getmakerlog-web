import { isServer } from "config";

export function isPatron(user) {
	if (!user) return false;
	return !!user.gold || !!user.patron;
}

export function isDarkMode(user) {
	if (!user) return false;
	return isPatron(user) && user.dark_mode;
}

export function isAdsDisabled(user) {
	if (!user) return false;
	return isPatron(user) && !user.ads_enabled;
}

export function setDarkMode(user) {
	if (isServer) return;
	document.documentElement.classList.toggle("dark", isDarkMode(user));
}
