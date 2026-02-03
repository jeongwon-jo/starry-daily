import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepPasswordConfirm = ({ onNext }: StepProps) => {
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				패스워드를 한번 더 입력해 주세요.
			</h3>

			<Input
				id="pwd"
				type="password"
				value={pwd}
				className="mb-2"
				onChange={(e) => {
					setPwd(e.target.value);
				}}
				placeholder="숫자와 소문자를 포함하여 15자 이상, 또는 8자 이상"
			/>
			<Input
				id="pwdConfirm"
				type="password"
				value={pwdConfirm}
				onChange={(e) => {
					setPwdConfirm(e.target.value);
				}}
				placeholder="숫자와 소문자를 포함하여 15자 이상, 또는 8자 이상"
			/>

			<Button
				className="mt-6"
				full
				disabled={!pwd || !pwdConfirm}
				onClick={onNext}
			>
				다음
			</Button>
		</div>
	);
};
