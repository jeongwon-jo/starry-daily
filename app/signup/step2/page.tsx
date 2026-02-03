"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function SignupStep2Page() {
  return (
		<div className="w-full min-h-dvh relative bg-[url('../assets/images/sub/signup_complete_bg.png')] bg-no-repeat bg-position-[left_25%_bottom] bg-size-[auto_50dvh] [&:after]:content-[''] [&:after]:bg-[url('../assets/images/sub/signup_complete_blink.png')] [&:after]:bg-no-repeat [&:after]:bg-contain [&:after]:absolute [&:after]:w-full [&:after]:h-full [&:after]:max-h-[60dvh] [&:after]:right-0 [&:after]:top-20">
			<Header type="navigation" title="가입완료"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-primary-100">
						별별하루에 오신것을 환영합니다!
						<br />
						프로필을 마저 완성해 볼게요.
					</h3>
				</div>
				<div className="app_bottom">
					<Link href="/signup/step3">
						<Button type="button" size="md" variant="primary700" full>
							다음
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
