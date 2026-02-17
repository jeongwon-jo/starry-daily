"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LockGuard({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLock = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const isLocked = user.user_metadata?.entry_pwd_at;
      const isUnlocked = localStorage.getItem("unlocked");

      if (isLocked && !isUnlocked && pathname !== "/unlock") {
        router.replace("/unlock");
      }
    };

    checkLock();
  }, [pathname]);

  return <>{children}</>;
}
