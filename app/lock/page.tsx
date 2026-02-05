"use client";

import { Header } from "@/components/layout";
import { NumberPad, PasswordStars } from "@/components/lock";
import { useState } from "react";

export const MAX_LENGTH = 4;

export default function LockPage() {
	const [password, setPassword] = useState<number[]>([]);

	const handleNumberClick = (num: number) => {
		if (password.length >= MAX_LENGTH) return;
		setPassword((prev) => [...prev, num]);
	};

	const handleDelete = () => {
		setPassword((prev) => prev.slice(0, -1));
	};

	return (
		<div className="w-full min-h-dvh bg-[url('../assets/images/sub/lock_bg.png')] bg-no-repeat bg-position-[left_bottom] bg-size-[100%_50dvh]">
			<Header type="navigation" title="비밀번호 입력" isSetting={true}></Header>
			<div className="container h-dvh relative">
				<div className="mt-30">
					<p className="text-lg text-primary-100 text-center">
						비밀번호를 입력해 주세요.
					</p>
					<PasswordStars value={password.length} />
				</div>
				<div className="pb-10 w-full h-[50dvh] max-h-[340px] absolute bottom-0">
					<NumberPad
						onNumberClick={handleNumberClick}
						onDelete={handleDelete}
					/>
				</div>
			</div>
		</div>
	);
}

