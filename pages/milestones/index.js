import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Container from "components/ui/Container";
import React from "react";
import { useAuth } from "stores/AuthStore";
import { useRoot } from "stores/RootStore";
import { Router } from "routes";

function MilestonesPage() {
	const { toggleEditor } = useRoot();
	const { isLoggedIn } = useAuth();
	return (
		<div className="flex flex-col">
			<div className="flex-none py-8 bg-white">
				<Container>
					<div className="flex items-center">
						<div className="flex-1 text-center sm:text-left">
							<p className="heading">
								<FontAwesomeIcon icon="check-circle" />{" "}
								Milestones
							</p>
							<h1>Tell your story. Build an audience.</h1>
							<p className="mb-4 text-gray-700">
								Share your triumphs, follow your favorite makers
								and build an audience in the world's most
								supportive maker community.
							</p>
							<div>
								<Button
									secondary
									onClick={() => {
										if (!isLoggedIn)
											Router.pushRoute("register");
										toggleEditor(1);
									}}
								>
									Post a milestone
								</Button>
							</div>
						</div>
						<div
							className="flex-row items-center justify-center flex-1 flex-grow hidden py-24 md:flex rounded-xl"
							style={{
								background:
									"linear-gradient(to bottom, #00c9ff, #92fe9d)",
							}}
						>
							<div className="relative">
								<img
									className="shadow-md rounded-xl transform -rotate-12"
									src="/img/cool-pictures/sticker-maker.png"
									alt="Maker sticker"
								/>
							</div>
						</div>
					</div>

					<div className="justify-center">
						<div className="flex-1"></div>
						<div className="flex items-center justify-center flex-1"></div>
					</div>
				</Container>
			</div>
			<div className="px-4 py-12">
				<Container>
					<div className="text-center">
						<h3 className="font-semibold">
							It's time your work gets recognized.
						</h3>
						<p className="mb-6 text-gray-700">
							Share your learnings with the maker community that
							always has your back.
						</p>
					</div>

					<div className="max-w-lg mx-auto grid gap-4 lg:grid-cols-3 lg:max-w-none">
						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									1
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Do something awesome.
									</span>
									<span className="text-gray-700">
										Got your first client? Discovered an
										awesome new marketing trick?
									</span>
								</p>
							</div>
						</div>

						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									2
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Write a milestone.
									</span>
									<span className="text-gray-700">
										Share your story with the community,
										telling good tips or advice you'd love
										makers to try.
									</span>
								</p>
							</div>
						</div>

						<div>
							<div className="flex">
								<span
									className={
										"flex-none flex items-center justify-center w-8 h-8 p-2 mx-2 font-semibold text-center rounded-full bg-green-500 text-white"
									}
								>
									3
								</span>
								<p className="flex flex-col">
									<span className="font-medium">
										Post and grow.
									</span>
									<span className="text-gray-700">
										Grow a following of makers eager to
										watch your progress.
									</span>
								</p>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

MilestonesPage.getInitialProps = async () => {
	return {
		layout: {
			bgClassName: "bg-white",
			contained: false,
		},
	};
};

export default MilestonesPage;
