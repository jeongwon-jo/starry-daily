import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepVertify = ({ onNext }: StepProps) => {
  const [vertifyNumber, setVertifyNumber] = useState("");

  return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이메일로 전송된<br />
				인증번호 6자리를 입력해 주세요.
			</h3>

			<Input
				id="veritfyNumber"
				type="number"
				value={vertifyNumber}
				onChange={(e) => {
					setVertifyNumber(e.target.value);
				}}
				placeholder="인증번호 6자리"
			/>
		</div>
	);
};
