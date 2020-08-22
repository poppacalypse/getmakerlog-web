import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable, computed, flow } from "mobx";
import { getToken, getUser } from "utils/auth";
import { setCookie } from "nookies";
import { isServer } from "config";

class AuthStore extends BaseStore {
  @observable loading = false;
  @observable token = null;
  @observable user = null;
  @observable errorMessages = null;

  @action setToken(value) {
    this.token = value;
  }

  @action setUser(value) {
    this.user = value;
  }

  @computed get isLoggedIn() {
    return this.token && this.user;
  }

  loginWithCredentials = flow(function* (username, password, ctx = null) {
    try {
      this.loading = true;
      this.errorMessages = null;
      this.token = yield getToken(username, password);
      setCookie(isServer && ctx !== null ? ctx : null, "token", this.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      this.user = yield getUser();
      this.loading = false;
      return true;
    } catch (e) {
      console.log(`Makerlog (AuthStore.loginWithCredentials): ${e.message}`);
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
      this.errorMessages = null;
      this.token = token;
      setCookie(isServer && ctx !== null ? ctx : null, "token", this.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      this.user = yield getUser();
      this.loading = false;
      return true;
    } catch (e) {
      console.log(`Makerlog (AuthStore.loginWithToken): ${e.message}`);
      this.loading = false;
      this.errorMessages = e;
      this.token = null;
      this.user = null;
      return false;
    }
  });

  @action
  logout(ctx = null) {
    setCookie(isServer && ctx !== null ? ctx : null, "token", "", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    this.token = null;
    this.user = null;
  }
}

export const getAuthStore = getOrCreateStore("auth", AuthStore);
