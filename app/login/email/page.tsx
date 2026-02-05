"use client";

import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

export default function LoginTypeEmailPage() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full h-dvh">
			<Header type="navigation" title="이메일 로그인"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<form action="">
						<fieldset>
							<div className="mb-2">
								<Input
									type="text"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									placeholder="이메일을 입력하세요."
								/>
							</div>
							<div>
								<Input
									type="password"
									value={pwd}
									onChange={(e) => {
										setPwd(e.target.value);
									}}
									placeholder="패스워드를 입력하세요."
								/>
							</div>
							<div className="mt-6">
								<Button type="button" size="md" variant="primary700" full>
									로그인
								</Button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	);
}
