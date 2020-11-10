import React, { useState } from "react";
import Modal from "components/ui/Modal";
import Spinner from "components/ui/Spinner";
import { useDebounce } from "utils/hooks";
import {
	useSearchProducts,
	useSearchTasks,
	useSearchUsers,
} from "queries/search";
import UserMedia from "components/ui/UserMedia";
import { extractResultsFromGroups } from "utils/random";
import orderBy from "lodash/orderBy";
import ProductMedia from "components/products/ProductMedia";
import Task from "components/tasks/Task";
import { Link } from "routes";

// TODO: Error handling.

export default function GlobalSearch({ open, onClose = () => {} }) {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 300);
	const {
		isLoading: isLoadingUsers,
		data: usersResults,
		isSuccess: isSuccessUsers,
	} = useSearchUsers(debouncedQuery);
	const {
		isLoading: isLoadingProducts,
		data: productsResults,
		isSuccess: isSuccessProducts,
	} = useSearchProducts(debouncedQuery);
	const {
		isLoading: isLoadingTasks,
		data: tasksResults,
		isSuccess: isSuccessTasks,
	} = useSearchTasks(debouncedQuery);

	const users = orderBy(
		extractResultsFromGroups(usersResults),
		"desc",
		"rank"
	).map((r) => r.item);
	const products = orderBy(
		extractResultsFromGroups(productsResults),
		"desc",
		"rank"
	).map((r) => r.item);
	const tasks = orderBy(
		extractResultsFromGroups(tasksResults),
		"desc",
		"rank"
	).map((r) => r.item);

	const success = isSuccessUsers && isSuccessProducts && isSuccessTasks;
	const loading = isLoadingUsers || isLoadingProducts || isLoadingTasks;

	return (
		<Modal open={open} onClose={onClose} center={false}>
			<input
				autoFocus={true}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className=" w-full"
				placeholder="Search products, makers, stories..."
			/>
			{loading && (
				<div className="flex items-center justify-center w-full h-32">
					<Spinner text="Loading..." small />
				</div>
			)}
			{!loading && success && query.length > 0 && (
				<div
					className="pt-4"
					onClick={() => {
						setQuery("");
						onClose(false);
					}}
				>
					<div className="flex">
						<p className="flex-none heading">Products</p>
						<div className="flex-grow"></div>
						<Link route="search-products" params={{ q: query }}>
							<a className="flex-none text-xs">Search all →</a>
						</Link>
					</div>
					<div className="mb-4 last:mb-0 space-y-2">
						{products.slice(0, 3).map((product) => (
							<ProductMedia
								product={product}
								key={product.slug}
							/>
						))}
					</div>
					<div className="flex">
						<p className="flex-none heading">Makers</p>
						<div className="flex-grow"></div>
						<Link route="search-users" params={{ q: query }}>
							<a className="flex-none text-xs">Search all →</a>
						</Link>
					</div>
					<div className="mb-4 last:mb-0 space-y-2">
						{users.slice(0, 3).map((user) => (
							<UserMedia user={user} key={user.id} />
						))}
					</div>
					<div className="flex">
						<p className="flex-none heading">Tasks</p>
						<div className="flex-grow"></div>
						<Link route="search-tasks" params={{ q: query }}>
							<a className="flex-none text-xs">Search all →</a>
						</Link>
					</div>
					<div className="mb-4 last:mb-0 space-y-2">
						{tasks.slice(0, 3).map((task) => (
							<Link
								key={task.id}
								route="task"
								params={{ id: task.id }}
							>
								<a>
									<Task task={task} />
								</a>
							</Link>
						))}
					</div>
				</div>
			)}
		</Modal>
	);
}
