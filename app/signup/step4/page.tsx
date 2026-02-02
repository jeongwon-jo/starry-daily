"use client";

import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

export default function SignupStep4Page() {
  const [birth, setBirth] = useState("");
  return (
		<div className="w-full min-h-dvh bg-gray-50">
			<Header type="navigation" title="회원가입"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-gray-700 mb-6">
						00님의 생일을 알려주세요.
					</h3>
					<Input
						id="birth"
						type="number"
						value={birth}
						onChange={(e) => {
							setBirth(e.target.value);
						}}
						placeholder="생년월일을 입력해 주세요.(YYYYMMDD)"
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
