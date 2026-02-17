"use client";

import { Header } from "@/components/layout";
import { NumberPad, PasswordStars } from "@/components/lock";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const MAX_LENGTH = 4;

export default function LockPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState<number[]>([]);
  const [confirmPassword, setConfirmPassword] = useState<number[]>([]);
  const [step, setStep] = useState<"first" | "confirm">("first");

  const handleNumberClick = (num: number) => {
    if (step === "first") {
      if (password.length >= MAX_LENGTH) return;
      const next = [...password, num];
      setPassword(next);

      if (next.length === MAX_LENGTH) {
        setStep("confirm");
      }
    } else {
      if (confirmPassword.length >= MAX_LENGTH) return;
      const next = [...confirmPassword, num];
      setConfirmPassword(next);

      if (next.length === MAX_LENGTH) {
        handleSubmit(next);
      }
    }
  };

  const handleDelete = () => {
    if (step === "first") {
      setPassword((prev) => prev.slice(0, -1));
    } else {
      setConfirmPassword((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (confirm: number[]) => {
    if (password.join("") !== confirm.join("")) {
      setPassword([]);
      setConfirmPassword([]);
      setStep("first");
      return;
    }

    const finalPwd = password.join("");

    await supabase.auth.updateUser({
      data: {
        entry_pwd_at: true,
        entry_pwd: finalPwd,
      },
    });

		localStorage.setItem("unlocked", "true");

		router.replace("/");
  };

  const currentLength =
    step === "first" ? password.length : confirmPassword.length;

  return (
    <div className="w-full min-h-dvh bg-[url('../assets/images/sub/lock_bg.png')] bg-no-repeat bg-position-[left_bottom] bg-size-[100%_50dvh]">
      <Header type="navigation" title="비밀번호 입력" isSetting />
      <div className="container h-dvh relative">
        <div className="mt-30">
          <p className="text-lg text-primary-100 text-center">
            {step === "first"
              ? "비밀번호를 입력해 주세요."
              : "비밀번호를 한번 더 입력해주세요."}
          </p>

          <PasswordStars value={currentLength} />
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
