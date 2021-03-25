const withOffline = require("next-offline");

const {
	NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
	VERCEL_GITHUB_COMMIT_SHA,
	VERCEL_GITLAB_COMMIT_SHA,
	VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
	VERCEL_GITHUB_COMMIT_SHA ||
	VERCEL_GITLAB_COMMIT_SHA ||
	VERCEL_BITBUCKET_COMMIT_SHA;

const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const fs = require("fs");

// We require this to fake that our plugin matches the next version
function replaceVersion() {
	const pkg = require("./package.json");
	if (pkg && pkg.dependencies && pkg.dependencies.next) {
		const packagePluginPath = `./node_modules/@sentry/next-plugin-sentry/package.json`;
		const packagePlugin = require(packagePluginPath);
		packagePlugin.version = pkg.dependencies.next;
		fs.writeFileSync(packagePluginPath, JSON.stringify(packagePlugin));
	} else {
		// console.error(`Can't find 'next' dependency`);
	}
}
replaceVersion();

const basePath = "";

const sentryConfig = {
	experimental: { plugins: true },
	env: {
		SENTRY_DSN:
			SENTRY_DSN ||
			"https://2a9f23af62a74638b4c5c24a7cc132c2@o197126.ingest.sentry.io/3170364",
		// Make the COMMIT_SHA available to the client so that Sentry events can be
		// marked for the release they belong to. It may be undefined if running
		// outside of Vercel
		NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
	},
	plugins: ["@sentry/next-plugin-sentry"],
	// Sentry.init config for server-side code. Can accept any available config option.
	serverRuntimeConfig: {
		sentry: {
			// debug: true,
		},
	},
	// Sentry.init config for client-side code (and fallback for server-side)
	// can accept only serializeable values. For more granular control see below.
	publicRuntimeConfig: {
		sentry: {
			// debug: true,
		},
	},
	productionBrowserSourceMaps: true,
	webpack: (config, { dev }) => {
		config.devtool = "source-map";
		config.plugins.push(
			new SentryWebpackPlugin({
				// Sentry project config
				configFile: "sentry.properties",
				// webpack specific configuration
				stripPrefix: ["webpack://_N_E/"],
				urlPrefix: `~${basePath}/_next`,
				include: ".next/",
				ignore: ["node_modules", "webpack.config.js"],
				// dryRun in non-production environments
				dryRun: dev,
				release: COMMIT_SHA,
			})
		);
		return config;
	},
	basePath,
};

const config = withOffline({
	async rewrites() {
		return [
			{ source: "/@:username", destination: "/users/:username" },
			{
				source: "/@:username/products",
				destination: "/users/:username/products",
			},
			{
				source: "/@:username/milestones",
				destination: "/users/:username/milestones",
			},
			{
				source: "/@:username/lists/:year/:month/:day",
				destination: "/users/:username/lists/:year/:month/:day",
			},
			{
				source: "/service-worker.js",
				destination: "/_next/static/service-worker.js",
			},
			{
				source: "/ads",
				destination: "/about/book-ad",
			},
			{
				source: "/slack",
				destination:
					"https://join.slack.com/t/makerlog/shared_invite/zt-nht66v1s-CMD~~ma3G6CpMSJVdJt0eQ",
			},
			{
				source: "/telegram",
				destination: "https://t.me/makerlog",
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
});

module.exports = { ...sentryConfig, ...config };
