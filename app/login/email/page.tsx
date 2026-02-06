"use client";

import { Header } from "@/components/layout";
import { Button, Input, MessageModal } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginTypeEmailPage() {
	const supabase = createClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);	
	
	const isValidEmail = (email: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const canSubmit = isValidEmail(email) && pwd.length > 0;
	
	const handleLogin = async () => {
		if (!canSubmit) return;

		setLoading(true);
		setError(null);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password: pwd,
		});

		if (error) {
			setOpenModal(true);
			setError(error.message);
			setLoading(false);
			return;
		}
		// 세션이 쿠키에 반영된 뒤 서버 상태 갱신 후 이동
		router.refresh();
		router.replace("/");
	};

	return (
		<div className="w-full h-dvh">
			<Header type="navigation" title="이메일 로그인"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<div>
						<div className="mb-2">
							<Input
								type="text"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder="이메일을 입력하세요."
							/>
						</div>
						<div>
							<Input
								type="password"
								value={pwd}
								onChange={(e) => {
									setPwd(e.target.value);
								}}
								placeholder="패스워드를 입력하세요."
							/>
						</div>
						{canSubmit && (
							<div className="mt-6">
								<Button
									type="button"
									size="md"
									variant="primary700"
									full
									disabled={loading}
									onClick={handleLogin}
								>
									{loading ? "로그인 중..." : "로그인"}
								</Button>
							</div>
						)}
					</div>
				</div>
				<MessageModal
					open={openModal}
					message={error || ""}
					onClose={() => setOpenModal(false)}
				/>
			</div>
		</div>
	);
}
