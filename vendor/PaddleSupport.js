import config from "config";
import React from "react";

export default function PaddleSupport() {
	return (
		<>
			<script src="https://cdn.paddle.com/paddle/paddle.js"></script>
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `Paddle.Setup({ vendor: ${
						config.PADDLE_VENDOR
					}, debug: ${JSON.stringify(config.isDev)} });`,
				}}
			/>
		</>
	);
}
