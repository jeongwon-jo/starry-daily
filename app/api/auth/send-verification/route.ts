import { setCode } from "@/lib/verification-store";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/smtp";

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

		const code = generateCode();
		setCode(email, code);

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
