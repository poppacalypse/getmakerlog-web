import "../styles/index.css";
import "../styles/images.css";
import "../utils/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-responsive-modal/styles.css";
import "react-colorful/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "mobx-react-lite/batchingForReactDom";
import "axios-debug-log";

import React from "react";
import App from "next/app";
import { Provider, useStaticRendering } from "mobx-react";

import { isServer, isDev, DEFAULT_SEO_CONFIG } from "../config";
import config, { onStoreInit } from "stores";
import { configureMobx } from "utils/mobx";
import Shell from "layouts/Shell";
import { ReactQueryDevtools } from "react-query-devtools";
import NProgressContainer from "vendor/nprogress";
import { configure } from "mobx";
import { ReactQueryCacheProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { DefaultSeo } from "next-seo";
import { Router } from "next/router";
import { gaEvent, pageview } from "vendor/gtag";
import * as Sentry from "@sentry/react";
import Head from "next/head";

if (isDev && !isServer) {
	localStorage.debug = "makerlog*,axios";
}

configure({ enforceActions: "observed" });

// This is not a hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer); // NOT `true` value

// Set up GA, Sentry
Sentry.init({
	enabled: !config.isDev,
	dsn: config.SENTRY_DSN,
});
Router.events.on("routeChangeComplete", (url) => pageview(url));

// Set up web vitals tracking.
export function reportWebVitals({ id, name, label, value }) {
	// Use `window.gtag` if you initialized Google Analytics as this example:
	// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
	gaEvent("event", name, {
		event_category:
			label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
		value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
		event_label: id, // id unique to current page load
		non_interaction: true, // avoids affecting bounce rate.
	});
}

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
		const { statusCode, errorMessage } = pageProps;
		const layoutProps = pageProps.layout ? pageProps.layout : {};

		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover"
					/>
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="black-translucent"
					/>
				</Head>
				<DefaultSeo {...DEFAULT_SEO_CONFIG} />
				<ReactQueryCacheProvider>
					<Hydrate state={pageProps.dehydratedState}>
						<Provider {...store}>
							<Shell
								statusCode={statusCode}
								errorMessage={errorMessage}
								layoutProps={layoutProps}
							>
								<Component {...pageProps} />
								<NProgressContainer spinner={false} />
							</Shell>
							<ReactQueryDevtools />
						</Provider>
					</Hydrate>
				</ReactQueryCacheProvider>
			</>
		);
	}
}

export default configureMobx(config, Makerlog);
