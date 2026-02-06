import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

// 영문 + 숫자 조합 8자리 이상 (StepPassword와 동일)
const isValidPassword = (pwd: string) =>
	/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pwd);

export const StepPasswordConfirm = ({
	form,
	onNext,
	loading,
}: StepProps) => {
	const [pwdConfirm, setPwdConfirm] = useState("");

	const passwordValid = isValidPassword(form.password);
	const match = form.password && pwdConfirm === form.password;
	const canNext = passwordValid && match && !loading;

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				패스워드를 한번 더 입력해 주세요.
			</h3>

			<Input
				id="pwdConfirm"
				type="password"
				value={form.password}
				disabled
				placeholder="영문 숫자 조합 8자리 이상"
			/>

			<Input
				id="pwdConfirm"
				type="password"
				value={pwdConfirm}
				className="mt-2"
				onChange={(e) => setPwdConfirm(e.target.value)}
				placeholder="영문 숫자 조합 8자리 이상"
			/>

			<Button
				className="mt-6"
				full
				disabled={!canNext}
				onClick={() => onNext()}
			>
				{loading ? "가입 중..." : "가입하기"}
			</Button>
		</div>
	);
};
