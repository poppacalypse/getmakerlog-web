module.exports = {
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
};
