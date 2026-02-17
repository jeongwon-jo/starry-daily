import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.log("❌ CODE 없음");
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code?? "");

  console.log("EXCHANGE ERROR:", error);
  console.log("SESSION:", data?.session);

  if (error) {
    console.log("❌", error)
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("❌ USER 없음");
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const nickname = user?.user_metadata?.nickname;

  if (!nickname) {
    alert("nickname 없음")
    return NextResponse.redirect(
      new URL("/signup/step2", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/", request.url)
  );
}
