const config = {
	plugins: [],
};

config.plugins.push("tailwindcss");
if (process.env.NODE_ENV === "production") {
	config.plugins.push([
		"@fullhuman/postcss-purgecss",
		{
			whitelist: ["mode-dark"],
			content: [
				"./pages/**/*.{js,jsx,ts,tsx}",
				"./components/**/*.{js,jsx,ts,tsx}",
			],
			defaultExtractor: (content) =>
				content.match(/[\w-/.:]+(?<!:)/g) || [],
		},
	]);
}
config.plugins.push("autoprefixer");

module.exports = config;
