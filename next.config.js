const withOffline = require("next-offline");

const config = {
	async rewrites() {
		return [
			{ source: "/@:username", destination: "/users/:username" },
			{
				source: "/@:username/products",
				destination: "/users/:username/products",
			},
		];
	},
	images: {
		domains: [
			"blog.getmakerlog.com",
			"getmakerlog.com",
			"api.getmakerlog.com",
			"ik.imagekit.io",
		],
	},
	workboxOpts: {
		swDest: "../public/service-worker.js",
	},
};

module.exports = withOffline(config);
