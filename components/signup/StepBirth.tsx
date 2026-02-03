import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepBirth = ({ onNext }: StepProps) => {
  const [birth, setBirth] = useState("");

  return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				생년월일을 입력해 주세요.
			</h3>

			<Input
				id="birth"
				type="number"
				value={birth}
				onChange={(e) => {
					setBirth(e.target.value);
				}}
				placeholder="생년월일 6자리"
			/>
		</div>
	);
};
