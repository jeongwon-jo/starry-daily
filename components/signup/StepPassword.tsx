import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

// 영문 + 숫자 조합 8자리 이상
const isValidPassword = (pwd: string) =>
	/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pwd);

export const StepPassword = ({ form, onNext }: StepProps) => {
	const [pwd, setPwd] = useState(form.password || "");

	const canNext = isValidPassword(pwd);

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				패스워드를 입력해 주세요.
			</h3>

			<Input
				id="pwd"
				type="password"
				value={pwd}
				onChange={(e) => setPwd(e.target.value)}
				placeholder="영문 숫자 조합 8자리 이상"
			/>

			<Button
				className="mt-6"
				full
				disabled={!canNext}
				onClick={() => onNext({ password: pwd })}
			>
				다음
			</Button>
		</div>
	);
};
