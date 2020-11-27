const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const port = parseInt(process.env.PORT, 10) || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname } = parsedUrl;

		// handle GET request to /service-worker.js
		if (pathname === "/service-worker.js") {
			const filePath = join(__dirname, ".next", pathname);

			app.serveStatic(req, res, filePath);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`> Ready on http://localhost:${3000}`);
	});
});
