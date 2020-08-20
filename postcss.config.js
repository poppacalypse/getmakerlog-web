module.exports = {
  plugins: [
    "tailwindcss",
    process.env.NODE_ENV === "production"
      ? [
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
        ]
      : undefined,
    "autoprefixer",
  ],
};
