"use client";

import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

export default function SignupStep3Page() {
  const [nickname, setNickName] = useState("");
  return (
		<div className="w-full min-h-dvh bg-gray-50">
			<Header type="navigation" title="회원가입"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-gray-700 mb-6">
						닉네임을 지어주세요.
					</h3>
					<Input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) => {
							setNickName(e.target.value);
						}}
						placeholder="닉네임을 입력해 주세요."
					/>
				</div>
				<div className="app_bottom">
					<Button type="button" size="md" variant="primary" full>
						다음
					</Button>
				</div>
			</div>
		</div>
	);
}
