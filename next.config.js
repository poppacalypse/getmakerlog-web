const withOffline = require("next-offline");

const config = {
	async rewrites() {
		return [
			{ source: "/@:username", destination: "/users/:username" },
			{
				source: "/@:username/products",
				destination: "/users/:username/products",
			},
			{
				source: "/service-worker.js",
				destination: "/_next/static/service-worker.js",
			},
			{
				source: "/ads",
				destination: "/about/book-ad",
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
		swDest: process.env.NEXT_EXPORT
			? "service-worker.js"
			: "static/service-worker.js",
	},
	analyticsId: "badKEl4FENXOC6WuM8na6CFg2Vl",
};

module.exports = withOffline(config);
