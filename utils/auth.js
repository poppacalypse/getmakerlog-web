import axios, { axiosWrapper } from "./axios";
import nookies from "nookies";
import { Component } from "react";
import { Router } from "routes";

export async function getToken(username, password) {
	const { data } = await axiosWrapper(axios.post, "/api-token-auth/", {
		username,
		password,
	});
	return data.token;
}

export async function getUser() {
	const { data } = await axiosWrapper(axios.get, "/me/privileged/");
	return data;
}

export const auth = (ctx) => {
	const { token } = nookies.get(ctx);

	if (ctx.req && (!token || token === "")) {
		ctx.res.writeHead(302, { Location: "/login" });
		ctx.res.end();
		return;
	}

	if (!token || token === "") {
		Router.pushRoute("login");
	}

	return token;
};

export const unauthed = (ctx) => {
	const { token } = nookies.get(ctx);

	if (ctx.req && token && token !== "") {
		ctx.res.writeHead(302, { Location: "/" });
		ctx.res.end();
		return;
	}

	if (token && token !== "") {
		Router.pushRoute("home");
	}

	return token;
};

const getDisplayName = (Component) =>
	Component.displayName || Component.name || "Component";

export const requireAuth = (WrappedComponent) =>
	class extends Component {
		static displayName = `withAuthSync(${getDisplayName(
			WrappedComponent
		)})`;

		static async getInitialProps(ctx) {
			auth(ctx);

			const componentProps =
				WrappedComponent.getInitialProps &&
				(await WrappedComponent.getInitialProps(ctx));

			return { ...componentProps };
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};

export const requireUnauthed = (WrappedComponent) =>
	class extends Component {
		static displayName = `withAuthSync(${getDisplayName(
			WrappedComponent
		)})`;

		static async getInitialProps(ctx) {
			unauthed(ctx);

			const componentProps =
				WrappedComponent.getInitialProps &&
				(await WrappedComponent.getInitialProps(ctx));

			return { ...componentProps };
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
