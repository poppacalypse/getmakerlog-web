import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessageList from "components/error/ErrorMessageList";
import OutboundLink from "components/seo/OutboundLink";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import Form from "components/ui/Form";
import Message from "components/ui/Message";
import PageHeader from "components/ui/PageHeader";
import Spinner from "components/ui/Spinner";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import {
	useApps,
	useDeleteTodoistLink,
	useLinkTodoist,
	useLinkTodoistProjects,
	useTodoistInstallUrl,
	useTodoistLinks,
	useTodoistProjects,
	useUnlinkTodoist,
} from "queries/integrations";
import { useProjects } from "queries/projects";
import React, { useState } from "react";
import { useEffect } from "react";

function TodoistUninstallButton() {
	const [mutate, { isLoading, isSuccess }] = useUnlinkTodoist();

	if (isSuccess) {
		return <Message success>All done.</Message>;
	}

	return (
		<Button loading={isLoading} danger onClick={() => mutate()}>
			Uninstall Todoist
		</Button>
	);
}

function TodoistLinksTableRow({ link }) {
	const [deleted, setDeleted] = useState(false);
	const [mutate, { isLoading }] = useDeleteTodoistLink();

	if (deleted) return null;

	return (
		<tr>
			<td className="px-4 py-2 border">#{link.linked_project.name}</td>
			<td className="px-4 py-2 border">
				<Button
					loading={isLoading}
					danger
					onClick={() => {
						mutate({ id: link.id });
						setDeleted(true);
					}}
				>
					Delete
				</Button>
			</td>
		</tr>
	);
}

function TodoistLinksTable() {
	const { isLoading, data: links, error } = useTodoistLinks();

	if (isLoading) return <Spinner text="Getting your Todoist links..." />;
	if (error) return <ErrorMessageList error={error} />;

	if (links.length === 0) return <Message info>No links yet.</Message>;

	return (
		<table className="w-full table-auto">
			<thead>
				<tr>
					<th className="px-4 py-2 border">Project -{">"} Hashtag</th>
					<th className="px-4 py-2 border">Actions</th>
				</tr>
			</thead>
			<tbody>
				{links.map((link) => (
					<TodoistLinksTableRow link={link} key={link.id} />
				))}
			</tbody>
		</table>
	);
}

function TodoistProjectLinker() {
	const {
		isLoading: isLoadingProjects,
		data: projects,
		error: errorProjects,
	} = useProjects();
	const {
		isLoading: isLoadingTodoistProjects,
		data: todoistProjects,
		error: errorTodoistProjects,
	} = useTodoistProjects();
	const [mutate, mutationState] = useLinkTodoistProjects();
	const [todoistProject, setTodoistProject] = useState(null);
	const [makerlogProject, setMakerlogProject] = useState(null);

	const onLink = async () => {
		await mutate({ todoistProject, makerlogProject });
	};

	const error = errorProjects || errorTodoistProjects || mutationState.error;

	if (isLoadingProjects || isLoadingTodoistProjects)
		return <Spinner text="Getting your Todoist stuff..." />;
	if (errorProjects || errorTodoistProjects || mutationState.error)
		return <ErrorMessageList error={error} />;
	if (mutationState.isSuccess)
		return (
			<Message className="mt-4" success>
				All done.
			</Message>
		);

	return (
		<div className="mt-4">
			<Form onSubmit={onLink}>
				<Form.Controls>
					<Form.Field span={3} label="Todoist project">
						<select
							value={todoistProject}
							className="w-full form-select"
							onChange={(e) => setTodoistProject(e.target.value)}
						>
							<option value={null}>Pick a project...</option>
							{todoistProjects.map((project) => (
								<option value={project.id} key={project.id}>
									{project.name}
								</option>
							))}
						</select>
						<p className="help">
							Any tasks completed in this project will be posted
							to a Makerlog #hashtag.
						</p>
					</Form.Field>
					<Form.Field span={3} label="Makerlog hashtag">
						<select
							value={makerlogProject}
							className="w-full form-select"
							onChange={(e) => setMakerlogProject(e.target.value)}
						>
							<option value={null}>Pick a hashtag...</option>
							{projects.map((project) => (
								<option value={project.id} key={project.id}>
									#{project.name}
								</option>
							))}
						</select>
						<p className="help">
							Hashtags are how you add tasks to products on
							Makerlog.
						</p>
					</Form.Field>
				</Form.Controls>
				<Form.Actions>
					<Button
						onClick={onLink}
						loading={mutationState.isLoading}
						disabled={
							todoistProject === null || makerlogProject === null
						}
						secondary
					>
						Link
					</Button>
				</Form.Actions>
			</Form>
		</div>
	);
}

function TodoistSettings() {
	return (
		<Card>
			<Card.Content>
				<div className="mb-4">
					<h4 className="font-bold">Link to projects</h4>
					<p className="text-sm text-gray-700">
						The Todoist integration works very simply: you "link" a
						Todoist project to a Makerlog #hashtag, and any done
						tasks in that Todoist project get cross-posted to your
						profile.
					</p>
					<TodoistProjectLinker />
				</div>
				<div className="mb-4">
					<h4 className="font-bold">Your links</h4>
					<p className="mb-4 text-sm text-gray-700">
						Below are all your linked projects.
					</p>
					<TodoistLinksTable />
				</div>
				<div className="mb-4">
					<h4 className="font-bold">Uninstall</h4>
					<p className="mb-4 text-sm text-gray-700">
						Something's not working right?
					</p>
					<TodoistUninstallButton />
				</div>
			</Card.Content>
		</Card>
	);
}

function TodoistInstallCard() {
	const { data, isLoading, error } = useTodoistInstallUrl();

	return (
		<Card>
			<Card.Content>
				{isLoading && <Spinner />}
				{error && <ErrorMessageList error={error} />}
				{data && (
					<OutboundLink to={data}>
						<Button secondary>
							<Button.Icon>
								<FontAwesomeIcon icon="angle-double-down" />
							</Button.Icon>
							Install to Todoist
						</Button>
					</OutboundLink>
				)}
			</Card.Content>
		</Card>
	);
}

export default function TodoistIntegrationPage() {
	const router = useRouter();
	const { code } = router.query;
	const {
		data: apps,
		isLoading: isLoadingApps,
		error: errorApps,
		isSuccess: isSuccessApps,
		refetch: refetchApps,
	} = useApps();
	const [mutate, queryState] = useLinkTodoist();

	useEffect(() => {
		const onKey = async (k) => {
			await mutate({ key: k });
			await refetchApps();
		};

		if (
			code &&
			!queryState.isSuccess &&
			!queryState.error &&
			!queryState.isLoading
		) {
			onKey(code);
		}
	}, [code, mutate, queryState, refetchApps]);

	const installed = apps && apps.todoist && apps.todoist.installed;

	return (
		<NarrowLayout>
			<PageHeader>
				<div>
					<h2 className="font-bold">Todoist</h2>
					<p className="text-gray-700">
						Log done tasks from Todoist projects.
					</p>
				</div>
			</PageHeader>
			{(isLoadingApps || queryState.isLoading) && <Spinner />}
			{queryState.isSuccess && (
				<Message success>Installed Todoist integration.</Message>
			)}
			{(errorApps || queryState.error) && (
				<ErrorMessageList error={errorApps || queryState.error} />
			)}
			{isSuccessApps &&
				(installed ? <TodoistSettings /> : <TodoistInstallCard />)}

			<NextSeo title="Todoist" />
		</NarrowLayout>
	);
}
