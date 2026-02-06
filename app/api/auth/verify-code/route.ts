import { verifyAndConsume } from "@/lib/verification-store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = typeof body.email === "string" ? body.email.trim() : "";
		const code = typeof body.code === "string" ? body.code.trim() : "";

		if (!email || !code) {
			return NextResponse.json(
				{ ok: false, error: "이메일과 인증번호를 입력해 주세요." },
				{ status: 400 }
			);
		}

		const valid = verifyAndConsume(email, code);
		return NextResponse.json({ ok: valid });
	} catch {
		return NextResponse.json(
			{ ok: false, error: "검증에 실패했습니다." },
			{ status: 500 }
		);
	}
}
