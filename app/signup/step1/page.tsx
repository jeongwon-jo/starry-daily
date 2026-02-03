"use client";

import { Header } from "@/components/layout";
import { StepBirth, StepEmail, StepName, StepPassword, StepPasswordConfirm, StepVertify } from "@/components/signup";
import { useState } from "react";

export interface StepProps {
	onNext: () => void;
}

export default function SignupStep1Page() {
	const [step, setStep] = useState(0);

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="계정만들기"></Header>
			<div className="container">
				<div className="py-5 pb-30 w-full">
					<div className="relative overflow-hidden w-full">
						<div
							className="flex w-full transition-transform duration-300 ease-out"
							style={{ transform: `translateX(-${step * 100}%)` }}
						>
							<StepName onNext={() => setStep(1)} />
							<StepBirth onNext={() => setStep(2)} />
							<StepEmail onNext={() => setStep(3)} />
							<StepVertify onNext={() => setStep(4)} />
							<StepPassword onNext={() => setStep(5)} />
							<StepPasswordConfirm onNext={() => setStep(6)} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
