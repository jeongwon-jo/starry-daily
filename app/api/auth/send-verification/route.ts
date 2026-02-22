import { NextResponse } from "next/server";
import { sendMail } from "@/lib/smtp";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

function generateCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(
  to: string,
  code: string
): Promise<{ sent: boolean; error?: string }> {
  const result = await sendMail({
    to,
    subject: "[Starry Daily] 이메일 인증번호",
    html: `
      <p>회원가입을 위한 인증번호입니다.</p>
      <p><strong>인증번호: ${code}</strong></p>
      <p>5분 내에 입력해 주세요. 요청하지 않았다면 무시해 주세요.</p>
    `,
  });

  if (!result.sent) {
    return {
      sent: false,
      error: String(result.error),
    };
  }
	

  return { sent: true };
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = typeof body.email === "string" ? body.email.trim() : "";
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json(
				{ error: "유효한 이메일을 입력해 주세요." },
				{ status: 400 }
			);
		}

		const supabase = await createClient();
		const code = generateCode();
		// setCode(email, code);

		await supabase.from("email_verifications").insert({
      email: email.toLowerCase(),
      code,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

		const result = await sendVerificationEmail(email, code);

		const isDev = process.env.NODE_ENV === "development";
		return NextResponse.json({
			ok: true,
			emailSent: result.sent,
			...(result.error && { sendError: result.error }),
			...(isDev && { devCode: code }),
		});
	} catch {
		return NextResponse.json(
			{ error: "인증번호 발송에 실패했습니다." },
			{ status: 500 }
		);
	}
}
