"use client";

import { Header } from "@/components/layout";
import { useState } from "react";

export default function DiaryWritePage() {

  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="작성하기" isSetting={true}></Header>
      <div className="container">
        <div className="p-5">
          <div ></div>
        </div>
      </div>
		</div>
	);
}
