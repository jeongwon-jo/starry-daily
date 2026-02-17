"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!data.session) {
        router.replace("/login");
      } else {
        if (!user) {
          redirect("/login");
        }

        const nickname = user.user_metadata?.nickname;

        if (!nickname) {
          redirect("/signup/step2");
        } else {
          redirect("/");
        }
      } 
    };

    run();
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
