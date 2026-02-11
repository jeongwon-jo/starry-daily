"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import StarryBottle from "@/assets/images/sub/starry_bottle.png";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
	const supabase = createClient();

	const loginWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
			provider: "kakao",
			options: {
				redirectTo: `${location.origin}/auth/callback`,
				scopes: "profile_nickname profile_image",
			},
		});

    if (error) {
      console.error("Kakao login error:", error.message);
    }
	};

	const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };
	
	return (
		<div className="w-full h-dvh">
			<div className="px-5 py-10 w-full h-full">
				<div className="w-full h-full flex flex-col justify-between items-center">
					<div></div>
					<div className="flex flex-col gap-2 justify-center items-center">
						<img src={StarryBottle.src} alt="bottle" className="h-25" />
						<p className="font-bold text-primary-100 text-2xl text-center">
							별별하루
						</p>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 w-full">
						<Button
							type="button"
							variant="primary700"
							size="md"
							full
							className="bg-[#FAE100]!"
							onClick={loginWithKakao}
						>
							<span className="relative pl-7 text-[#471E67] [&:after]:content-[''] [&:after]:size-6 [&:after]:absolute [&:after]:left-0 [&:after]:top-1/2 [&:after]:-translate-y-1/2 [&:after]:bg-[url('../assets/images/icon/icon_kakao.svg')] [&:after]:bg-no-repeat [&:after]:bg-center">
								카카오톡으로 시작하기
							</span>
						</Button>
						<Link href={"/login/email"} className="block w-full">
							<Button type="button" variant="primary700" size="md" full>
								<span className="relative pl-7 text-primary-100 [&:after]:content-[''] [&:after]:size-6 [&:after]:absolute [&:after]:left-0 [&:after]:top-1/2 [&:after]:-translate-y-1/2 [&:after]:bg-[url('../assets/images/icon/icon_email.svg')] [&:after]:bg-no-repeat [&:after]:bg-center">
									이메일로 시작하기
								</span>
							</Button>
						</Link>
						<Button
							type="button"
							variant="primary700"
							size="md"
							full
							onClick={loginWithGoogle}
						>
							<span className="relative pl-7 text-primary-100 [&:after]:content-[''] [&:after]:size-6 [&:after]:absolute [&:after]:left-0 [&:after]:top-1/2 [&:after]:-translate-y-1/2 [&:after]:bg-[url('../assets/images/icon/icon_google.svg')] [&:after]:bg-no-repeat [&:after]:bg-center">
								Google로 시작하기
							</span>
						</Button>
						<Link
							href={"/signup/agree"}
							className="text-sm underline text-primary-300"
						>
							계정만들기
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
