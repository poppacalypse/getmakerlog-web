import React from "react";
import Head from "next/head";
import config from "config";

// https://favicon.io/favicon-converter/

export default function DefaultHead() {
	return (
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/img/icons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/img/icons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/img/icons/favicon-16x16.png"
			/>

			<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

			<link rel="manifest" href="/img/icons/site.webmanifest" />
			<script src="https://cdn.paddle.com/paddle/paddle.js"></script>
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `Paddle.Setup({ vendor: ${
						config.PADDLE_VENDOR
					}, debug: ${JSON.stringify(config.isDev)} });`,
				}}
			/>
		</Head>
	);
}
