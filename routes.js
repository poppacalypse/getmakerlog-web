import routes from "@fuelrats/next-named-routes";

// Destructure what you need
const routerHelper = routes()
	.add("index", "/")
	.add("login", "/login")
	.add("logout", "/logout")
	.add("tasks", "/tasks")
	.add("discussions", "/discussions")
	.add("discussions-thread", "/discussions/[slug]")
	.add("not-implemented", "/not-implemented");

const { Link, Router, useRouter, withRouter } = routerHelper;

// export what you need
export { Link, Router, useRouter, withRouter, routerHelper };
