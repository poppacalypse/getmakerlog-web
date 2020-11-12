import ErrorMessageList from "components/error/ErrorMessageList";
import WebhookCreator from "components/integrations/WebhookCreator";
import WebhooksTable from "components/integrations/WebhooksTable";
import OutboundLink from "components/seo/OutboundLink";
import Card from "components/ui/Card";
import PageHeader from "components/ui/PageHeader";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import { useApps } from "queries/integrations";
import React from "react";

export default function GithubIntegrationPage() {
	const { data: apps, isLoading, error, isSuccess } = useApps();

	return (
		<NarrowLayout>
			<PageHeader>
				<div>
					<h2 className="font-bold">GitHub</h2>
					<p className="text-gray-700">
						Create webhooks and log from any GitHub repo.
					</p>
				</div>
			</PageHeader>
			<Card>
				<Card.Content>
					{isLoading && <Spinner />}
					{error && <ErrorMessageList error={error} />}
					{isSuccess && (
						<>
							<div className="mb-4">
								<h4 className="font-bold">Create webhook</h4>
								<p className="mb-4 text-sm text-gray-700">
									Select a project then use the secret
									generated webhook to link it to a GitHub
									repository. We'll start tracking events like
									commits and issues afterwards.
									<br />
									<small className="text-xs help">
										Need help?{" "}
										<OutboundLink to="https://developer.github.com/webhooks/creating/">
											Learn how to use this feature.
										</OutboundLink>
									</small>
								</p>
								<WebhookCreator event={"github"} />
							</div>
							<div className="mb-4">
								<h4 className="mb-4 font-bold">
									Your webhooks
								</h4>
								<WebhooksTable
									webhooks={
										apps.github ? apps.github.webhooks : []
									}
								/>
							</div>
						</>
					)}
				</Card.Content>
			</Card>

			<NextSeo title="GitHub" />
		</NarrowLayout>
	);
}
