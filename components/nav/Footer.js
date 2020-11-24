import OutboundLink from "components/seo/OutboundLink";
import Container from "components/ui/Container";
import React from "react";
import { Link } from "routes";

export default function Footer() {
	return (
		<div className="py-12 bg-white border-t border-gray-200">
			<Container>
				<div className="flex flex-col sm:flex-row">
					<div className="flex flex-initial mb-8 sm:mb-0">
						<div>
							<img className="h-5" src="/img/logo.svg" />
							<p className="mb-4 text-gray-700">
								Where makers learn, build, and grow in public.
							</p>
							<small className="text-xs text-gray-500">
								Crafted with love in Puerto Rico 🇵🇷🏝
								<br />
								&copy; Makerlog, LLC
							</small>
						</div>
					</div>
					<div className="flex-grow"></div>
					<div className="flex flex-col sm:space-y-0 sm:space-x-8 space-y-8 sm:flex-row">
						<div className="flex flex-col">
							<p className="font-semibold">Makerlog</p>
							<ul>
								<li>
									<Link route={"about"}>
										<a>About</a>
									</Link>
								</li>
								<li>
									<Link route="not-implemented">
										Makerlog Gold
									</Link>
								</li>
								<li>
									<Link route={"book-ad"}>Advertise</Link>
								</li>
							</ul>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold">Social</p>
							<ul>
								<li>
									<OutboundLink
										href={
											"https://twitter.com/getmakerlog/"
										}
									>
										Twitter
									</OutboundLink>
								</li>
								<li>
									<OutboundLink
										href={
											"https://instagram.com/getmakerlog/"
										}
									>
										Instagram
									</OutboundLink>
								</li>
								<li>
									<OutboundLink
										href={
											"https://www.linkedin.com/company/makerlog/"
										}
									>
										LinkedIn
									</OutboundLink>
								</li>
							</ul>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold">Platform</p>
							<ul>
								<li>
									<OutboundLink
										href={"https://api.getmakerlog.com/"}
									>
										API
									</OutboundLink>
								</li>
								<li>
									<OutboundLink
										href={
											"https://twitter.com/getmakerlog/"
										}
									>
										Get help
									</OutboundLink>
								</li>
								<li>
									<Link route={"about"}>
										<a>FAQ</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}
