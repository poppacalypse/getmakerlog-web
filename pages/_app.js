import "../styles/index.css";
import "../styles/images.css";
import "../utils/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "mobx-react-lite/batchingForReactDom";
import "axios-debug-log";

import React from "react";
import App from "next/app";
import { Provider, useStaticRendering } from "mobx-react";

import { isServer, isDev } from "../config";
import config, { onStoreInit } from "stores";
import { configureMobx } from "utils/mobx";
import Shell from "layouts/Shell";
import { ReactQueryDevtools } from "react-query-devtools";
import NProgressContainer from "vendor/nprogress";
import { configure } from "mobx";

if (isDev && !isServer) {
	localStorage.debug = "makerlog*,axios";
}

configure({ enforceActions: "observed" });

// This is not a hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer); // NOT `true` value

class Makerlog extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		/* 
		THIS IS DANGEROUS!

		onStoreInit MUST run before getInitialProps, otherwise cross-request state pollution may occur!
		
		onStoreInit flushes previos request state (tokens) and clears stores. 

		This could be a serious security issue. 
		Do not touch this initialization code.
		*/

		if (onStoreInit && isServer) {
			// Loads onStoreInit - this is the place to put your cookie things.
			await onStoreInit(ctx);
		}

		if (typeof Component.getInitialProps === "function") {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;
		const { statusCode } = pageProps;
		const layoutProps = pageProps.layout ? pageProps.layout : {};

		return (
			<Provider {...store}>
				<Shell statusCode={statusCode} layoutProps={layoutProps}>
					<Component {...pageProps} />
					<NProgressContainer spinner={false} />
				</Shell>
				<ReactQueryDevtools />
			</Provider>
		);
	}
}

export default configureMobx(config, Makerlog);
