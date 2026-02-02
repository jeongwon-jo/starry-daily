import { useState } from "react";
import { Button, Input } from "../ui";
import { StepProps } from "@/app/signup/step1/page";

export const StepName = ({ onNext }: StepProps) => {
	const [name, setName] = useState("");

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이름을 입력해 주세요.
			</h3>

			<Input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="띄어쓰기 없이 입력"
			/>

			<Button className="mt-6" full disabled={!name} onClick={onNext}>
				다음
			</Button>
		</div>
	);
};
