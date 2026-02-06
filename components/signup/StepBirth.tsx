import { useEffect, useState } from "react";
import { Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepBirth = ({ form, onNext }: StepProps) => {
	const [birth, setBirth] = useState(form.birthDate || "");

	useEffect(() => {
		if (birth.length === 6) {
			onNext({ birthDate: birth });
		}
	}, [birth, onNext]);

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				생년월일을 입력해 주세요.
			</h3>

			<Input
				id="birth"
				type="number"
				value={birth}
				onChange={(e) => setBirth(e.target.value.slice(0, 6))}
				placeholder="생년월일 6자리"
			/>
		</div>
	);
};
