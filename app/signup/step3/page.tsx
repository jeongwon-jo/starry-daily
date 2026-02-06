"use client";

import { Header } from "@/components/layout";
import { Button, Input, MessageModal } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NICKNAME_MAX_LENGTH = 6;

export default function SignupStep3Page() {
	const router = useRouter();
	const [nickname, setNickname] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const trimmed = nickname.trim();
	const isValid = trimmed.length >= 1 && trimmed.length <= NICKNAME_MAX_LENGTH;

	const handleSubmit = async () => {
		if (!isValid) return;
		setLoading(true);
		setError(null);
		const supabase = createClient();
		const { error: updateError } = await supabase.auth.updateUser({
			data: { nickname: trimmed },
		});
		if (updateError) {
			setError(updateError.message);
			setModalOpen(true);
			setLoading(false);
			return;
		}
		router.push("/signup/step4");
	};

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="가입완료" />
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<h3 className="text-2xl font-bold text-primary-100 mb-6">
						닉네임을 지어주세요.
					</h3>
					<Input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) =>
							setNickname(e.target.value.slice(0, NICKNAME_MAX_LENGTH))
						}
						placeholder="닉네임 6자 이하로 입력"
					/>
					<div className="mt-6">
						<Button
							type="button"
							size="md"
							variant="primary700"
							full
							disabled={!isValid || loading}
							onClick={handleSubmit}
						>
							{loading ? "저장 중..." : "다음"}
						</Button>
					</div>
				</div>
			</div>
			<MessageModal
				open={modalOpen}
				message={error || ""}
				onClose={() => setModalOpen(false)}
			/>
		</div>
	);
}
