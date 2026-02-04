"use client";

import { useRouter } from "next/navigation";
import { HeaderBackIcon } from "../icons";
import Link from "next/link";

type HeaderType =
  | "default"
  | "navigation";

type HeaderProps = {
	type?: HeaderType;
	title?: string;
	isSetting?: boolean;
	onBack?: () => void;
};

export const Header = ({
	type = "default",
	title,
	isSetting = false,
	onBack,
}: HeaderProps) => {
	const router = useRouter();
	
	if (type == "default") {
		return (
			<>
				<header className="header h-12 fixed left-[50%] translate-x-[-50%] top-0 w-full max-w-150 z-100">
					<div className="flex justify-between items-center h-full px-5">
						<h1 className="text-xl text-primary-100 font-bold">별별하루</h1>
						<Link
							href={"/setting"}
							className="inline-block size-6 bg-[url('../assets/images/icon/icon_setting.svg')] bg-no-repeat"
						></Link>
					</div>
				</header>
			</>
		);
	} else if (type == "navigation") {
		return (
			<>
				<header className="header h-12 fixed left-[50%] translate-x-[-50%] top-0 w-full max-w-150 z-100">
					<div className="flex justify-between items-center h-full px-5">
						<button
							type="button"
							className="inline-block size-5"
							onClick={() => {
								if (onBack) {
									onBack();
								} else {
									router.back();
								}
							}}
						>
							<HeaderBackIcon className="text-primary-400" />
						</button>
						<h1 className="text-lg font-normal text-primary-100">{title}</h1>
						<div className="size-6">
							{isSetting && (
								<Link
									href={"/setting"}
									className="inline-block size-6 bg-[url('../assets/images/icon/icon_setting.svg')] bg-no-repeat"
								></Link>
							)}
						</div>
					</div>
				</header>
			</>
		);
	} 
};
