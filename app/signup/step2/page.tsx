"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";

export default function SignupStep2Page() {
  return (
		<div className="w-full min-h-dvh bg-gray-50">
			<Header type="navigation" title="회원가입"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-gray-700">
						별별하루에 오신것을 환영합니다!
						<br />
						프로필을 마저 완성해 볼게요.
					</h3>
				</div>
				<div className="app_bottom">
					<Button type="button" size="md" variant="primary700" full>
						다음
					</Button>
				</div>
			</div>
		</div>
	);
}
