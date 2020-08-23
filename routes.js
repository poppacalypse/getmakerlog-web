import routes from "@fuelrats/next-named-routes";

// Destructure what you need
const { Link, Router, useRouter, withRouter } = routes()
	.add("home", "/")
	.add("login", "/login")
	.add("logout", "/logout")
	.add("not-implemented", "/not-implemented");

// export what you need
export { Link, Router, useRouter, withRouter };
