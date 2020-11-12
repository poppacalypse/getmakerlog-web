import Image from "next/image";
import React from "react";
import { Link } from "routes";
import PostHeading from "./PostHeading";

export default function PostMedia({ post, featured = false }) {
	return (
		<div
			className={
				featured
					? "flex flex-col items-center sm:flex-row space-x-4"
					: "flex flex-col"
			}
		>
			<div
				className={
					featured ? "flex-1 mb-4 sm:mb-0 w-full" : "flex-1 mb-4"
				}
			>
				<Link route="stories-post" params={{ slug: post.slug }}>
					<a>
						<div
							className="relative flex-grow w-full overflow-hidden"
							style={{ paddingBottom: "56.25%" }}
						>
							{post.feature_image ? (
								<Image
									className="absolute bottom-0 object-cover w-full h-full rounded-md"
									unsized
									src={post.feature_image}
									layout="fill"
								/>
							) : (
								<div className="absolute bottom-0 flex items-center justify-center object-cover w-full h-full p-4 bg-green-500 rounded-md">
									<h4 className="font-bold text-white">
										{post.title}
									</h4>
								</div>
							)}
						</div>
					</a>
				</Link>
			</div>
			<div
				className={
					featured ? "flex-1 mt-4 sm:mt-0 sm:px-4 lg:px-8" : "flex-1"
				}
			>
				<PostHeading post={post} />
				<Link route="stories-post" params={{ slug: post.slug }}>
					<a className="text-gray-900">
						{featured ? (
							<h1 className="font-bold">{post.title}</h1>
						) : (
							<h3 className="font-bold">{post.title}</h3>
						)}
					</a>
				</Link>
				<p className="text-gray-700">{post.excerpt}</p>
				<div className="mt-2">
					<small>
						<Link route="stories-post" params={{ slug: post.slug }}>
							<a>Read full article &raquo;</a>
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
}
