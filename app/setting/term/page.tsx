"use client";

import { Header } from "@/components/layout";


export default function TermPage() {
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="이용약관" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<p className="text-primary-100">
						이용약관 내용입니다.이용약관 내용입니다.이용약관 내용입니다.이용약관
						내용입니다.이용약관 내용입니다.이용약관 내용입니다.이용약관
						내용입니다. 이용약관 내용입니다.이용약관 내용입니다.
						<br />
						이용약관 내용입니다.이용약관 내용입니다.이용약관 내용입니다.이용약관
						내용입니다.이용약관 내용입니다.
					</p>
				</div>
			</div>
		</div>
	);
}
