import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

const isValidEmail = (email: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const StepEmail = ({ form, onNext, active }: StepProps) => {
	const [email, setEmail] = useState(form.email || "");
	const inputRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		if (!active) return;

		const timer = setTimeout(() => {
			inputRef.current?.focus();
		}, 300);

		return () => clearTimeout(timer);
	}, [active]);


	const canNext = email.length > 0 && isValidEmail(email);

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이메일을 입력해 주세요.
			</h3>

			<Input
				id="email"
				type="email"
				inputMode="email"
				autoComplete="email"
				ref={inputRef}
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
