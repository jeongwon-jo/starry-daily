"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function SignupStep4Page() {
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="가입완료"></Header>
			<div className="container">
				<div className="mt-24.25 flex justify-center">
					<div className="relative w-70 h-75">
						<div className="bg-[url('../assets/images/sub/shaking_bottle1.png')] bg-no-repeat bg-contain absolute w-full h-full top-0 left-0 z-30 animate-bottle"></div>
						<div className="bg-[url('../assets/images/sub/shaking_bottle2.png')] bg-no-repeat bg-contain absolute w-full h-full top-0 left-0 opacity-0 z-10 fade-bottle-2"></div>
						<div className="bg-[url('../assets/images/sub/shaking_bottle3.png')] bg-no-repeat bg-contain absolute w-full h-full top-0 left-0 opacity-0 z-20 fade-bottle-3"></div>
					</div>
				</div>
				<div className="app_bottom">
					<Link href="/">
						<Button type="button" size="md" variant="primary700" full>
							시작하기
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
