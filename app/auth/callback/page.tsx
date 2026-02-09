"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    };

    run();
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
