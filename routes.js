import routes from "@fuelrats/next-named-routes";

// https://github.com/FuelRats/next-named-routes

// Destructure what you need
const routerHelper = routes()
	.add("index", "/")
	.add("login", "/login")
	.add("register", "/start")
	.add("forgot-password", "/auth/forgot/")
	.add("auth-confirm", "/auth/confirm/")
	.add("auth-complete", "/auth/complete/[method]")
	.add("auth-delete-account", "/auth/delete-account/")
	.add("auth-change-password", "/auth/change-password/")
	.add("auth-wl-onboarding", "/auth/wl-onboarding/")
	.add("task", "/tasks/[id]")
	.add("profile", ({ username, ...query }) => {
		return {
			href: "/users/[username]",
			as: `/@${username}`,
			query,
		};
	})
	.add("profile-products", ({ username, ...query }) => {
		return {
			href: "/users/[username]/products",
			as: `/@${username}/products`,
			query,
		};
	})
	.add("profile-milestones", ({ username, ...query }) => {
		return {
			href: "/users/[username]/milestones",
			as: `/@${username}/milestones`,
			query,
		};
	})
	.add("profile-tasks-day", ({ username, year, month, day, ...query }) => {
		return {
			href: "/users/[username]/lists/[year]/[month]/[day]",
			as: `/@${username}/lists/${year}/${month}/${day}`,
			query,
		};
	})
	.add("settings", "/settings")
	.add("logout", "/logout")
	.add("tasks", "/tasks")
	.add("discussions", "/discussions")
	.add("notifications", "/notifications")
	.add("discussions-thread", "/discussions/[slug]")
	.add("products", "/products")
	.add("products-create", "/products/create")
	.add("product", "/products/[slug]")
	.add("product-edit", "/products/[slug]/edit")
	.add("integrations", "/integrations")
	.add("integration-telegram", "/integrations/telegram")
	.add("integration-slack", "/integrations/slack")
	.add("integration-todoist", "/integrations/todoist")
	.add("integration-github", "/integrations/github")
	.add("integration-gitlab", "/integrations/gitlab")
	.add("integration-webhooks", "/integrations/webhooks")
	.add("search-products", "/search/products")
	.add("search-tasks", "/search/tasks")
	.add("search-users", "/search/users")
	.add("search-discussions", "/search/discussions")
	.add("stories", "/stories")
	.add("stories-post", "/stories/[slug]")
	.add("stories-tag", "/stories/tags/[slug]")
	.add("about", "/about")
	.add("book-ad", "/about/book-ad")
	.add("legal", "/about/legal")
	.add("contact", "/about/contact")
	.add("events", "/events")
	.add("event", "/events/[slug]")
	.add("events-create", "/events/create")
	.add("patron", "/patron")
	.add("reminders", "/reminders")
	.add("not-implemented", "/not-implemented")
	.add("milestones", "/milestones")
	.add("milestone", "/milestones/[slug]")
	.add("onboarding", "/onboarding")
	.add("onboarding-profile", "/onboarding/profile")
	.add("onboarding-finished", "/onboarding/finished")
	.add("chats", "/about/chats");

const { Link, Router, useRouter, withRouter } = routerHelper;

// export what you need
export { Link, Router, useRouter, withRouter, routerHelper };
