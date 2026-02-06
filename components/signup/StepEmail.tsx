import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

const isValidEmail = (email: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const StepEmail = ({ form, onNext }: StepProps) => {
	const [email, setEmail] = useState(form.email || "");

	const canNext = email.length > 0 && isValidEmail(email);

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이메일을 입력해 주세요.
			</h3>

			<Input
				id="email"
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="이메일 입력"
			/>

			<Button
				className="mt-6"
				full
				disabled={!canNext}
				onClick={() => onNext({ email })}
			>
				다음
			</Button>
		</div>
	);
};
