import ReactModal from "react-modal";

function Modal({ onRequestClose, open }) {
	return (
		<ReactModal
			isOpen={open}
			onRequestClose={onRequestClose}
			className="Modal"
			overlayClassName="Overlay"
		>
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
					&#8203;
					<div
						className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline"
					>
						<div>
							<div className="text-center">
								<h3
									className="text-lg font-medium text-gray-900 leading-6"
									id="modal-headline"
								>
									Payment successful
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500 leading-5">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Consequatur amet
										labore.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6">
							<span className="flex w-full rounded-md shadow-sm">
								<button
									onClick={onRequestClose}
									type="button"
									className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md leading-6 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
								>
									Go back to dashboard
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</ReactModal>
	);
}

export default Modal;
