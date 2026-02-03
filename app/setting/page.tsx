"use client";

import { Header } from "@/components/layout";
import settingIcon1 from "@/assets/images/icon/icon_setting_01.svg";
import settingIcon2 from "@/assets/images/icon/icon_setting_02.svg";
import settingIcon3 from "@/assets/images/icon/icon_setting_03.svg";
import settingIcon4 from "@/assets/images/icon/icon_setting_04.svg";
import settingIcon5 from "@/assets/images/icon/icon_setting_05.svg";
import settingIcon6 from "@/assets/images/icon/icon_setting_06.svg";
import settingIcon7 from "@/assets/images/icon/icon_setting_07.svg";
import Link from "next/link";
import { ToggleSwitch } from "@/components/ui";
import { useState } from "react";
export default function SettingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [lockMode, setLockMode] = useState(false);

  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="설정"></Header>
			<div className="container">
				<div className="p-5">
					<div className="p-3 rounded-xl bg-[rgb(255,255,255,0.04)] text-primary-100">
						별별이 님 반가워요!
					</div>
				</div>
				<div className="mt-5">
					<div className="py-5 px-4 border-b-2 border-b-[rgb(255,255,255,0.04)]">
						<Link href={"/setting/info"} className="block mb-6">
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<img src={settingIcon1.src} alt="내 정보 관리" />
									</div>
									<p className="text-primary-100">내 정보 관리</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
						<Link href={"/diary"} className="block mb-6">
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<img src={settingIcon2.src} alt="일기장" />
									</div>
									<p className="text-primary-100">일기장</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
						<div className="flex justify-between items-center px-2">
							<div className="flex items-center gap-2">
								<div className="size-6">
									<img src={settingIcon3.src} alt="다크모드" />
								</div>
								<p className="text-primary-100">다크모드</p>
							</div>
							<div>
								<ToggleSwitch
									checked={darkMode}
									onChange={() => {
										setDarkMode(!darkMode);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="py-5 px-4 border-b-2 border-b-[rgb(255,255,255,0.04)]">
						<Link href={"/notice"} className="block mb-6">
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<img src={settingIcon4.src} alt="공지사항" />
									</div>
									<p className="text-primary-100">공지사항</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
						<Link href={"/setting/term"}>
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<img src={settingIcon5.src} alt="이용약관" />
									</div>
									<p className="text-primary-100">이용약관</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
					</div>
					<div className="py-5 px-4">
						<div className="flex justify-between items-center px-2 mb-6">
							<div className="flex items-center gap-2">
								<div className="size-6">
									<img src={settingIcon6.src} alt="별별일기 잠금" />
								</div>
								<p className="text-primary-100">별별일기 잠금</p>
							</div>
							<div>
								<ToggleSwitch
									checked={lockMode}
									onChange={() => {
										setLockMode(!lockMode);
									}}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center px-2">
							<div className="flex items-center gap-2">
								<div className="size-6">
									<img src={settingIcon7.src} alt="탈퇴하기" />
								</div>
								<p className="text-primary-100">탈퇴하기</p>
							</div>
							<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
