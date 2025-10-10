import React, { useState, useEffect } from "react";

import {
	XMarkIcon,
	ArrowUpTrayIcon,
	ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Image from "@theme/IdealImage";
import { Sandbox } from "../../pages/sandbox/_components/Sandbox";
import yeti from "../../assets/yeti-wave.png";
import useGlobal from "../../hooks/useGlobal";
import { useColorMode } from "@docusaurus/theme-common";

const SandboxDrawerComponent = ({
	defaultValue,
	defaultContext,
	seedTransactions,
}) => {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const { colorMode } = useColorMode();

	const {
		state: { input, monacoRef },
	} = useGlobal();

	useEffect(() => {
		if (!open && JSON.stringify(input) !== "[]") {
			setOpen(true);
		}
	}, [input]);

	useEffect(() => {
		if (open) {
			monacoRef.focus();
		}
	}, [open]);

	return (
		<div>
			<div className="sandbox-collapse">
				<div
					id="drawer-handle"
					className={open ? "freddy-collapsed" : "freddy-appear"}
					onClick={() => setOpen(true)}
				>
					<Image img={yeti} alt="yeti" />
				</div>
			</div>
			<div className="relative z-[300]">
				<div className="fixed overflow-hidden">
					<div className="absolute overflow-hidden">
						<div
							className={`fixed right-0 flex max-w-full transition duration-500 ease-in-out bottom-0 ${
								open
									? ""
									: expanded
									? "translate-y-[91vh]"
									: "translate-y-[420px]"
							}`}
						>
							<div className="pointer-events-auto w-screen max-w-screen h-fit">
								<div
									className={`flex flex-col bg-opacity-90 backdrop-blur-md py-6
                                    max-h-[100vh] transition transition-height duration-500 ease-in-out
                                    shadow-[-2px_-2px_15px_7px_rgba(100,100,100,0.1)] overflow-hidden 
                                    relative outline outline-1 border-0 border-t-2 border-solid ${
																			colorMode === "light"
																				? "bg-white border-gray-50 outline-gray-200"
																				: "bg-[#313846] border-gray-900 outline-gray-700"
																		} 
                                    ${expanded ? "h-[90vh]" : "h-[415px]"}`}
								>
									<div className="absolute flex top-3 right-3 z-[1000] scale-90 xs:scale-100">
										<button
											type="button"
											className={`rounded-md focus:outline-none
                              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex
                              outline-none border-none cursor-pointer mr-2 p-1`}
											onClick={() => setExpanded(!expanded)}
										>
											<span className="sr-only">Close panel</span>
											{expanded ? (
												<ArrowDownTrayIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											) : (
												<ArrowUpTrayIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											)}
										</button>
										<button
											type="button"
											id="close-sandbox-drawer"
											className={`rounded-md focus:outline-none
                              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex
                              outline-none border-none cursor-pointer p-1`}
											onClick={() => setOpen(false)}
										>
											<span className="sr-only">Close panel</span>

											<XMarkIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
									<div className="relative mt-6 flex-1 px-4 sm:px-6">
										<div className="absolute inset-0 px-4 sm:px-6 -top-11 -bottom-6 py-0 px-2">
											<Sandbox
												defaultValue={defaultValue}
												defaultContext={defaultContext}
												seedTransactions={seedTransactions}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SandboxDrawerComponent };
