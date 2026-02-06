"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function SignupAgreePage() {
  const router = useRouter();
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const handleAgreeAllChange = useCallback((checked: boolean) => {
    setAgree1(checked);
    setAgree2(checked);
  }, []);

  const agreeAll = agree1 && agree2;
  const canProceed = agreeAll;

  const handleNext = () => {
    if (canProceed) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("signup_agreed", "true");
      }
      router.push("/signup/step1");
    }
  };

  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="약관동의"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<div className="mb-6">
						<h3 className="text-2xl font-bold text-primary-100">
							서비스 약관동의를 해주세요.
						</h3>
						<p className="mt-2 text-base text-primary-200">
							클로버의 서비스 약관이에요.
							<br />
							필수 약관을 동의하셔야 이용할 수 있어요.
						</p>
					</div>
					<div>
						<div className="bg-primary-900 h-11 rounded-lg flex items-center px-3">
							<div className="checkbox">
								<label htmlFor="agreeAll" className="text-lg">
									<input
										type="checkbox"
										id="agreeAll"
										checked={agreeAll}
										onChange={(e) => handleAgreeAllChange(e.target.checked)}
									/>{" "}
									<em></em>{" "}
									<span className="text-primary-100">전체 동의하기</span>
								</label>
							</div>
						</div>
						<div className="flex items-center justify-between mt-6">
							<div className="checkbox">
								<label htmlFor="agree1">
									<input
										type="checkbox"
										id="agree1"
										checked={agree1}
										onChange={(e) => setAgree1(e.target.checked)}
									/>{" "}
									<em></em> <span className="text-primary-100">[필수]</span>
									&nbsp; 서비스 이용약관
								</label>
							</div>
							<Link
								href={"/setting/term"}
								className="size-4 inline-block bg-[url('../assets/images/icon/icon_link_arrow.svg')] bg-no-repeat bg-center"
							></Link>
						</div>
						<div className="flex items-center justify-between mt-6">
							<div className="checkbox">
								<label htmlFor="agree2">
									<input
										type="checkbox"
										id="agree2"
										checked={agree2}
										onChange={(e) => setAgree2(e.target.checked)}
									/>{" "}
									<em></em> <span className="text-primary-100">[필수]</span>
									&nbsp; 개인정보처리방침
								</label>
							</div>
							<Link
								href={"/setting/term"}
								className="size-4 inline-block bg-[url('../assets/images/icon/icon_link_arrow.svg')] bg-no-repeat bg-center"
							></Link>
						</div>
					</div>
				</div>
				<div className="app_bottom">
					<Button
						type="button"
						size="md"
						variant="primary700"
						full
						disabled={!canProceed}
						onClick={handleNext}
					>
						다음
					</Button>
				</div>
			</div>
		</div>
	);
}
