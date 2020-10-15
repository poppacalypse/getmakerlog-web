import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable, computed, flow } from "mobx";
import { getToken, getUser } from "utils/auth";
import { setCookie } from "nookies";
import { isServer } from "config";
import { getLogger } from "utils/logging";
import { Router } from "routes";
import { useStores } from "utils/hooks";
import { useObserver } from "mobx-react";

const log = getLogger("AuthStore");

class AuthStore extends BaseStore {
	@observable loading = false;
	@observable token = null;
	@observable user = null;
	@observable errorMessages = null;

	@action.bound setToken(value) {
		this.token = value;
	}

	@action.bound setUser(value) {
		// temporarily set user as "requiring setup"
		this.user = value;
	}

	@computed get isLoggedIn() {
		return this.token && this.user;
	}

	loginWithCredentials = flow(function* (username, password, ctx = null) {
		try {
			this.loading = true;
			// this.errorMessages = null;
			this.token = yield getToken(username, password);
			setCookie(
				isServer && ctx !== null ? ctx : null,
				"token",
				this.token,
				{
					maxAge: 30 * 24 * 60 * 60,
					path: "/",
				}
			);
			this.user = yield getUser();
			this.loading = false;
			this.errorMessages = null;
			if (!ctx) log("Logged in with credentials.");
			return true;
		} catch (e) {
			log(e.message);
			this.loading = false;
			this.errorMessages = e;
			this.token = null;
			this.user = null;
			return false;
		}
	});

	loginWithToken = flow(function* (token, ctx = null) {
		try {
			this.loading = true;
			// this.errorMessages = null;
			this.token = token;
			setCookie(
				isServer && ctx !== null ? ctx : null,
				"token",
				this.token,
				{
					maxAge: 30 * 24 * 60 * 60,
					path: "/",
				}
			);
			this.user = yield getUser();
			this.loading = false;
			this.errorMessages = null;
			if (!ctx) log("Logged in with token.");
			return true;
		} catch (e) {
			log(e.message);
			this.loading = false;
			this.errorMessages = e;
			this.token = null;
			this.user = null;
			return false;
		}
	});

	@action.bound
	logout(ctx = null) {
		if (!ctx) log("Logging out.");
		this.token = null;
		this.user = null;
		if (!isServer) {
			Router.pushRoute("index");
		}
		setCookie(isServer && ctx !== null ? ctx : null, "token", "", {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
	}
}

export const getAuthStore = getOrCreateStore("auth", AuthStore);

// Hooks

export function useAuth() {
	const { auth } = useStores();
	return useObserver(() => ({
		loading: auth.loading,
		user: auth.user,
		token: auth.token,
		isLoggedIn: auth.isLoggedIn,
		errorMessages: auth.errorMessages,
		setUser: auth.setUser.bind(auth),
		loginWithCredentials: auth.loginWithCredentials.bind(auth),
		loginWithToken: auth.loginWithToken.bind(auth),
		logout: auth.logout.bind(auth),
	}));
}
