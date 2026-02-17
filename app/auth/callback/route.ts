import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("🔥 CALLBACK HIT");

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("CODE:", code);

  const supabase = await createClient();

  const { data, error } =
    await supabase.auth.exchangeCodeForSession(code ?? "");

  console.log("EXCHANGE ERROR:", error);
  console.log("SESSION:", data?.session);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER:", user);

  return NextResponse.redirect(
    new URL("/", request.url)
  );
}
