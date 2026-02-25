import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepName = ({ form, onNext, active }: StepProps) => {
	const [name, setName] = useState(form.name || "");
	const inputRef = useRef<HTMLInputElement>(null);
	
	// 띄어쓰기 입력 방지
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value.replace(/\s/g, ""));
	};

	const hasSpace = /\s/.test(name);
	const canNext = name.length > 0 && !hasSpace;

	useEffect(() => {
		if (!active) return;

		const timer = setTimeout(() => {
			inputRef.current?.focus();
		}, 300);

		return () => clearTimeout(timer);
	}, [active]);

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이름을 입력해 주세요.
			</h3>

			<Input
				value={name}
				ref={inputRef}
				onChange={handleChange}
				placeholder="띄어쓰기 없이 입력"
			/>

			<Button
				className="mt-6"
				full
				disabled={!canNext}
				onClick={() => onNext({ name })}
			>
				다음
			</Button>
		</div>
	);
};
