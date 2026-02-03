"use client";

import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

export default function SignupStep3Page() {
  const [nickname, setNickName] = useState("");
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="가입완료"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-primary-100 mb-6">
						닉네임을 지어주세요.
					</h3>
					<Input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) => {
							setNickName(e.target.value);
						}}
						placeholder="닉네임 6자리 이하로 입력"
					/>
					<div className="mt-6">
						<Button type="button" size="md" variant="primary700" full>
							다음
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
