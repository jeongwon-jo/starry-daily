"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";

export default function SignupStep5Page() {
  return (
		<div className="w-full min-h-dvh bg-gray-50">
			<Header type="navigation" title="회원가입"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-gray-700 mb-6">
						이제 별을 모으러 가볼까요?
					</h3>
				</div>
				<div className="app_bottom">
					<Button type="button" size="md" variant="primary" full>
						시작하기
					</Button>
				</div>
			</div>
		</div>
	);
}
