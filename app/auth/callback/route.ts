import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const nickname = user.user_metadata?.nickname;

  if (!nickname) {
    return NextResponse.redirect(
      new URL("/signup/step2", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/", request.url)
  );
}
