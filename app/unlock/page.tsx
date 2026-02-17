"use client";

import { Header } from "@/components/layout";
import { NumberPad, PasswordStars } from "@/components/lock";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const MAX_LENGTH = 4;

export default function UnlockPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const handleNumberClick = async (num: number) => {
    if (password.length >= MAX_LENGTH) return;

    const next = [...password, num];
    setPassword(next);

    if (next.length === MAX_LENGTH) {
      const inputPwd = next.join("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const savedPwd = user?.user_metadata?.entry_pwd;

      if (inputPwd === savedPwd) {
        localStorage.setItem("unlocked", "true");
        router.replace("/");
      } else {
        setError(true);
        setPassword([]);
      }
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <div className="w-full min-h-dvh bg-[url('../assets/images/sub/lock_bg.png')] bg-no-repeat bg-position-[left_bottom] bg-size-[100%_50dvh]">
      <Header type="navigation" title="비밀번호 입력" />
      <div className="container h-dvh relative">
        <div className="mt-30">
          <p className="text-lg text-primary-100 text-center">
           {error ? "비밀번호가 일치하지 않습니다." : "비밀번호를 입력해 주세요." }
          </p>

          <PasswordStars value={password.length} />
        </div>

        <div className="pb-10 w-full h-[50dvh] max-h-[340px] absolute bottom-0">
          <NumberPad
            onNumberClick={handleNumberClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
