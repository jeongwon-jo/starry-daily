"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";


export default function NoticePage() {
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="공지사항" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div>
						<h3 className="text-lg text-primary-100">
							공지사항입니다. 이번주 이벤트 당첨자!✨
						</h3>
						<p className="mt-2 text-primary-500">2025.01.22</p>
					</div>
					<div className="mt-6 bg-(--color-surface-overlay) p-3 text-primary-100">
						<p>
							공지사항입니다. 이번주 이벤트 당첨자!✨
							<br />
							김*지 님<br />
							이*이 님 <br />
							<br />
							축하드립니다💌
						</p>
					</div>
				</div>
				<div className="app_bottom">
					<Link href={"/notice"}>
						<Button type="button" size="md" variant="primary700" full>
							목록으로
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
