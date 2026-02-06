"use client";

import { StepProps } from "@/app/signup/step1/page";
import { Button, Input, MessageModal } from "../ui";
import { useCallback, useEffect, useRef, useState } from "react";

export const StepVerify = ({ form, onNext }: StepProps) => {
	const email = form.email || "";

	const [code, setCode] = useState("");
	const [sendLoading, setSendLoading] = useState(false);
	const [verifyLoading, setVerifyLoading] = useState(false);
	const [devCode, setDevCode] = useState<string | null>(null);
	const [sendError, setSendError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const hasAutoSent = useRef(false);

	const sendCode = useCallback(
		async (isResend = false) => {
			if (!email) return;
			setSendLoading(true);
			setSendError(null);
			setDevCode(null);
			try {
				const res = await fetch("/api/auth/send-verification", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				});
				const data = await res.json();
				if (!res.ok) {
					setModalMessage(data.error || "인증번호 발송에 실패했습니다.");
					setModalOpen(true);
					return;
				}
				if (data.sendError) setSendError(data.sendError);
				if (data.devCode) setDevCode(data.devCode);
				if (isResend) {
					setModalMessage("인증번호를 다시 전송했습니다.");
					setModalOpen(true);
				}
			} catch {
				setModalMessage("인증번호 발송에 실패했습니다.");
				setModalOpen(true);
			} finally {
				setSendLoading(false);
			}
		},
		[email]
	);

	// 진입하자마자 이메일 발송
	useEffect(() => {
		if (!email || hasAutoSent.current) return;
		hasAutoSent.current = true;
		sendCode(false);
	}, [email, sendCode]);

	const handleResend = useCallback(() => {
		sendCode(true);
	}, [sendCode]);

	const handleVerify = async () => {
		if (code.length !== 6) return;
		setVerifyLoading(true);
		setModalMessage("");
		try {
			const res = await fetch("/api/auth/verify-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, code }),
			});
			const data = await res.json();
			if (data.ok) {
				onNext();
			} else {
				setModalMessage("인증번호가 올바르지 않거나 만료되었습니다.");
				setModalOpen(true);
			}
		} catch {
			setModalMessage("인증 확인에 실패했습니다.");
			setModalOpen(true);
		} finally {
			setVerifyLoading(false);
		}
	};

	const canVerify = code.length === 6 && !verifyLoading;

	return (
		<div className="w-full shrink-0 px-5">
			<h3 className="text-2xl font-bold text-primary-100 mb-6">
				이메일로 전송된
				<br />
				인증번호 6자리를 입력해 주세요.
			</h3>

			{sendLoading && (
				<p className="text-primary-200 text-sm mb-2">인증번호 발송 중...</p>
			)}
			{sendError && (
				<div className="mb-3 p-3 rounded-lg bg-red-900/30 text-red-200 text-sm">
					이메일 미발송: {sendError}
				</div>
			)}
			{devCode && (
				<div className="mb-3 p-3 rounded-lg bg-primary-900 text-primary-100 text-sm">
					개발: 인증번호 <strong>{devCode}</strong>
				</div>
			)}

			<Input
				id="verifyNumber"
				type="text"
				value={code}
				onChange={(e) =>
					setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
				}
				placeholder="인증번호 6자리"
				className="mb-2"
			/>
			<div className="mt-1 flex justify-end">
				<button
					type="button"
					className="text-sm text-primary-300 underline disabled:opacity-50"
					onClick={handleResend}
					disabled={sendLoading}
				>
					인증번호 다시 받기
				</button>
			</div>

			<Button
				className="mt-6"
				full
				disabled={!canVerify}
				onClick={handleVerify}
			>
				{verifyLoading ? "확인 중..." : "다음"}
			</Button>

			<MessageModal
				open={modalOpen}
				message={modalMessage}
				onClose={() => setModalOpen(false)}
			/>
		</div>
	);
};
