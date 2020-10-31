import ErrorMessageList from "components/error/ErrorMessageList";
import WebhookCreator from "components/integrations/WebhookCreator";
import WebhooksTable from "components/integrations/WebhooksTable";
import OutboundLink from "components/seo/OutboundLink";
import Card from "components/ui/Card";
import PageHeader from "components/ui/PageHeader";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { useApps } from "queries/integrations";
import React from "react";

export default function GitlabIntegrationPage() {
	const { data: apps, isLoading, error, isSuccess } = useApps();

	return (
		<NarrowLayout>
			<PageHeader>
				<div>
					<h2 className="font-bold">GitLab</h2>
					<p className="text-gray-700">
						Create webhooks and log from any GitLab repo.
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
									generated webhook to link it to a GitLab
									repository. We'll start tracking events like
									commits and issues afterwards.
									<br />
									<small className="text-xs help">
										Need help?{" "}
										<OutboundLink to="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html">
											Learn how to use this feature.
										</OutboundLink>
									</small>
								</p>
								<WebhookCreator event={"gitlab"} />
							</div>
							<div className="mb-4">
								<h4 className="mb-4 font-bold">
									Your webhooks
								</h4>
								<WebhooksTable
									webhooks={
										apps.gitlab ? apps.gitlab.webhooks : []
									}
								/>
							</div>
						</>
					)}
				</Card.Content>
			</Card>
		</NarrowLayout>
	);
}
