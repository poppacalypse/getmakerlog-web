import axios from "vendor/axios";
import nookies from "nookies";
import { getRootStore as root } from "./RootStore";
import { getAuthStore as auth } from "./AuthStore";
import { getUser } from "utils/auth";

export async function onStoreInit(ctx) {
  /**
   * This is where the magic happens. Update your stores here.
   */
  let cookies = nookies.get(ctx);
  let token = cookies.token;
  if (token && token !== "" && token !== "null") {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    await ctx.store.auth.loginWithToken(token, ctx);
    if (!ctx.store.auth.isLoggedIn) {
      ctx.store.auth.logout(ctx);
      delete axios.defaults.headers.common["Authorization"];
    }
  } else {
    ctx.store.auth.logout(ctx);
    delete axios.defaults.headers.common["Authorization"];
  }
}

const config = {
  stores: {
    root,
    auth,
  },
  persist: [],
};

export default config;
