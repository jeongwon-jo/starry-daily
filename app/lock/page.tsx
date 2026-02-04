"use client";

import { Header } from "@/components/layout";
import { useState } from "react";

export default function LockPage() {
	const [password, setPassword] = useState("");
	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="비밀번호 입력" isSetting={true}></Header>
      <div className="container">
        
      </div>
		</div>
	);
}
