import "../styles/index.css";
import "../vendor/fa";
import "mobx-react-lite/batchingForReactDom";

import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";

import { isServer } from "../config";
import config, { onStoreInit } from "stores";
import { configureMobx } from "vendor/mobx";
import Shell from "layouts/Shell";

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
				</Shell>
			</Provider>
		);
	}
}

export default configureMobx(config, Makerlog);
