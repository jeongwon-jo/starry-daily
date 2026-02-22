import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const supabase = await createClient();
		const body = await request.json();
		const email = typeof body.email === "string" ? body.email.trim() : "";
		const code = typeof body.code === "string" ? body.code.trim() : "";

		if (!email || !code) {
			return NextResponse.json(
				{ ok: false, error: "이메일과 인증번호를 입력해 주세요." },
				{ status: 400 }
			);
		}

		const { data } = await supabase
			.from("email_verifications")
			.select("*")
			.eq("email", email)
			.eq("code", code)
			.gt("expires_at", new Date().toISOString())
			.single();

		if (!data) return NextResponse.json({ ok: false });

		// 사용 후 삭제
		await supabase
			.from("email_verifications")
			.delete()
			.eq("id", data.id);

		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json(
			{ ok: false, error: "검증에 실패했습니다." },
			{ status: 500 }
		);
	}
}
