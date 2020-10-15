import routes from "@fuelrats/next-named-routes";

// Destructure what you need
const routerHelper = routes()
	.add("index", "/")
	.add("login", "/login")
	.add("register", "/start")
	.add("forgot-password", "/auth/forgot/")
	.add("auth-complete", "/auth/complete/[method]")
	.add("logout", "/logout")
	.add("tasks", "/tasks")
	.add("discussions", "/discussions")
	.add("notifications", "/notifications")
	.add("discussions-thread", "/discussions/[slug]")
	.add("not-implemented", "/not-implemented");

const { Link, Router, useRouter, withRouter } = routerHelper;

// export what you need
export { Link, Router, useRouter, withRouter, routerHelper };
