"use client";

import { Header } from "@/components/layout";
import settingIcon1 from "@/assets/images/icon/icon_setting_01.svg";
import settingIcon2 from "@/assets/images/icon/icon_setting_02.svg";
import settingIcon3 from "@/assets/images/icon/icon_setting_03.svg";
import settingIcon4 from "@/assets/images/icon/icon_setting_04.svg";
import settingIcon5 from "@/assets/images/icon/icon_setting_05.svg";
import settingIcon6 from "@/assets/images/icon/icon_setting_06.svg";
import settingIcon7 from "@/assets/images/icon/icon_setting_07.svg";
import settingIcon8 from "@/assets/images/icon/icon_setting_08.svg";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmModal, ToggleSwitch } from "@/components/ui";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function SettingPage() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [lockMode, setLockMode] = useState(false);
	const supabase = createClient();
	const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
	const [darkMode, setDarkMode] = useState<boolean>(true);

	const applyTheme = (isDark: boolean) => {
    const html = document.documentElement;
    isDark
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  };

	useEffect(() => {
		const loadUserSetting = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

			setUser(user)
      if (!user) return;
			
			setLockMode(user?.user_metadata?.entry_pwd_at)

      const storedDarkMode = user.user_metadata?.dark_mode;

      if (typeof storedDarkMode === "boolean") {
        setDarkMode(storedDarkMode);
        applyTheme(storedDarkMode);
      }
    };

		loadUserSetting();
	}, [setDarkMode, supabase.auth]);

	

  const handleToggle = async () => {
    const nextValue = !darkMode;
    setDarkMode(nextValue);
    applyTheme(nextValue);

    await supabase.auth.updateUser({
      data: {
        dark_mode: nextValue,
      },
    });
  };

	const handleLockToggle = async () => {
		if (!lockMode) {
			// ON 할 때 → lock 페이지 이동
			router.push("/lock");
		} else {
			// OFF 할 때 → 비밀번호 제거
			await supabase.auth.updateUser({
				data: {
					entry_pwd_at: false,
					entry_pwd: null,
				},
			});

			setLockMode(false);
		}
	};

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.refresh();
		router.replace("/login");
		localStorage.removeItem("unlocked");
	};

	const handleDeleteAccount = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		const res = await fetch("/api/delete-account", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user.id }),
		});

		const result = await res.json();

		if (result.error) {
			alert(result.error);
			return;
		}

		await supabase.auth.signOut();
		router.replace("/login");
	};



  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="설정"></Header>
			<div className="container">
				<div className="p-5">
					<div className="p-3 rounded-xl bg-(--color-surface-overlay) text-primary-100">
						{user?.user_metadata.nickname}님 반가워요!
					</div>
				</div>
				<div className="mt-5">
					<div className="py-5 px-4 border-b-2 border-b-[rgb(255,255,255,0.5)] dark:border-b-[rgb(255,255,255,0.04)]">
						<Link href={""} className="block mb-6">
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<Image src={settingIcon1} alt="내 정보 관리" width={24} height={24}/>
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
										<Image src={settingIcon2} alt="일기장" width={24} height={24}/>
									</div>
									<p className="text-primary-100">일기장</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
						<div className="flex justify-between items-center px-2">
							<div className="flex items-center gap-2">
								<div className="size-6">
									<Image src={settingIcon3} alt="다크모드" width={24} height={24}/>
								</div>
								<p className="text-primary-100">다크모드</p>
							</div>
							<div>
								<ToggleSwitch
									checked={darkMode}
									onChange={handleToggle}
								/>
							</div>
						</div>
					</div>
					<div className="py-5 px-4 border-b-2 border-b-[rgb(255,255,255,0.5)] dark:border-b-[rgb(255,255,255,0.04)]">
						<Link href={"/notice"} className="block mb-6">
							<div className="flex justify-between items-center px-2">
								<div className="flex items-center gap-2">
									<div className="size-6">
										<Image src={settingIcon4} alt="공지사항" width={24} height={24}/>
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
										<Image src={settingIcon5} alt="공지사항" width={24} height={24}/>
									</div>
									<p className="text-primary-100">이용약관</p>
								</div>
								<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
							</div>
						</Link>
					</div>
					<div className="py-5 px-4 border-b-2 border-b-[rgb(255,255,255,0.5)] dark:border-b-[rgb(255,255,255,0.04)]">
						<div className="flex justify-between items-center px-2 mb-6">
							<div className="flex items-center gap-2">
								<div className="size-6">
									<Image src={settingIcon6} alt="별별일기 잠금" width={24} height={24}/>
								</div>
								<p className="text-primary-100">별별일기 잠금</p>
							</div>
							<div>
								<ToggleSwitch
									checked={lockMode}
									onChange={handleLockToggle}
								/>
							</div>
						</div>
						<button type="button" className="w-full flex justify-between items-center px-2" onClick={() => {
							setMessage("정말 탈퇴하시겠어요?\n작성한 일기는 모두 삭제됩니다.")
							setOpenModal(true)
						}}>
							<div className="flex items-center gap-2">
								<div className="size-6">
									<Image src={settingIcon7} alt="탈퇴하기" width={24} height={24}/>
								</div>
								<p className="text-primary-100">탈퇴하기</p>
							</div>
							<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
						</button>
					</div>
					<div className="py-5 px-4">
						<button
							type="button"
							className="flex justify-between items-center px-2 w-full text-left"
							onClick={handleLogout}
						>
							<div className="flex items-center gap-2">
								<div className="size-6">
									<Image src={settingIcon8} alt="로그아웃" width={24} height={24}/>
								</div>
								<p className="text-primary-100">로그아웃</p>
							</div>
							<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain" />
						</button>
					</div>
				</div>
			</div>
			 <ConfirmModal
				open={openModal}
				message={message || ""}
				onClose={() => setOpenModal(false)}
				onConfirm={handleDeleteAccount}
			/>
		</div>
	);
}
