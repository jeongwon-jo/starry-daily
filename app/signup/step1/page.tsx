"use client";

import { Header } from "@/components/layout";
import {
	StepBirth,
	StepEmail,
	StepName,
	StepPassword,
	StepPasswordConfirm,
	StepVerify,
} from "@/components/signup";
import { MessageModal } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SignupForm {
	name: string;
	birthDate: string;
	email: string;
	password: string;
}

export interface StepProps {
	form: SignupForm;
	onNext: (data?: Partial<SignupForm>) => void;
	loading?: boolean;
}

const SIGNUP_AGREED_KEY = "signup_agreed";

export default function SignupStep1Page() {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [error, setError] = useState<string | null>(null);	
	const [openModal, setOpenModal] = useState(false);
	const [form, setForm] = useState<SignupForm>({
		name: "",
		birthDate: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const stepRef = useRef(0);
	const formRef = useRef(form);

	useEffect(() => {
		stepRef.current = step;
		formRef.current = form;
	}, [step, form]);

	// 동의 페이지를 거치지 않고 링크로 접근했으면 로그인으로
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!sessionStorage.getItem(SIGNUP_AGREED_KEY)) {
			router.replace("/login");
		}
	}, [router]);

	const handleSubmit = useCallback(async () => {
		const supabase = createClient();
		setLoading(true);
		const currentForm = formRef.current;

		const { error } = await supabase.auth.signUp({
			email: currentForm.email,
			password: currentForm.password,
			options: {
				data: {
					name: currentForm.name,
					birth_date: currentForm.birthDate,
				},
			},
		});

		if (typeof window !== "undefined") {
			sessionStorage.removeItem(SIGNUP_AGREED_KEY);
		}

		if (error) {
			setOpenModal(true);
			setError(error.message);
			setLoading(false);
			return;
		}

		router.replace("/signup/step2");
	}, [router]);

	const handleNext = useCallback(
		(data?: Partial<SignupForm>) => {
			if (data) {
				setForm((prev) => {
					const next = { ...prev, ...data };
					formRef.current = next;
					return next;
				});
			}

			const currentStep = stepRef.current;
			if (currentStep < 5) {
				setStep((s) => s + 1);
				stepRef.current = currentStep + 1;
			} else {
				handleSubmit();
			}
		},
		[handleSubmit]
	);

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="계정만들기" />
			<div className="container">
				<div className="py-5 pb-30 w-full">
					<div className="relative overflow-hidden w-full">
						<div
							className="flex w-full transition-transform duration-300 ease-out"
							style={{ transform: `translateX(-${step * 100}%)` }}
						>
							<StepName form={form} onNext={handleNext} />
							<StepBirth form={form} onNext={handleNext} />
							<StepEmail form={form} onNext={handleNext} />
							<StepVerify form={form} onNext={handleNext} />
							<StepPassword form={form} onNext={handleNext} />
							<StepPasswordConfirm
								form={form}
								onNext={handleNext}
								loading={loading}
							/>
						</div>
					</div>
				</div>
				<MessageModal
					open={openModal}
					message={error || ""}
					onClose={() => {router.replace("/signup/agree");}}
				/>
			</div>
		</div>
	);
}
