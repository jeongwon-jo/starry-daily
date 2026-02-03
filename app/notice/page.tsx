"use client";

import { IconSearch } from "@/components/icons";
import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";

export default function NoticePage() {
  const [searchWord, setSearchWord] = useState("");
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="공지사항" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="flex items-center justify-between bg-primary-900 pr-3 gap-2 rounded-xl">
						<Input
							id="email"
							type="text"
							value={searchWord}
							onChange={(e) => {
								setSearchWord(e.target.value);
							}}
							placeholder="검색어를 입력해 주세요."
						/>
						<button type="button">
							<IconSearch className="text-primary-500" />
						</button>
					</div>
					<div className="mt-6">
						<Link href={"/notice/1"} className="block mb-2">
							<div className="p-3 bg-(--color-surface-overlay)">
								<h3 className="text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
									공지사항입니다. 이번주 이벤트 당첨자!✨공지사항입니다. 이번주
									이벤트 당첨자!✨공지사항입니다. 이번주 이벤트
									당첨자!✨공지사항입니다. 이번주 이벤트 당첨자!✨
								</h3>
								<p className="mt-3 text-primary-500 text-right">2025.01.22</p>
							</div>
						</Link>
						<Link href={"/notice/1"} className="block mb-2">
							<div className="p-3 bg-(--color-surface-overlay)">
								<h3 className="text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
									공지사항입니다. 이번주 이벤트 당첨자!✨
								</h3>
								<p className="mt-3 text-primary-500 text-right">2025.01.22</p>
							</div>
						</Link>
						<Link href={"/notice/1"} className="block mb-2">
							<div className="p-3 bg-(--color-surface-overlay)">
								<h3 className="text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
									공지사항입니다. 이번주 이벤트 당첨자!✨
								</h3>
								<p className="mt-3 text-primary-500 text-right">2025.01.22</p>
							</div>
						</Link>
						<Link href={"/notice/1"} className="block mb-2">
							<div className="p-3 bg-(--color-surface-overlay)">
								<h3 className="text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
									공지사항입니다. 이번주 이벤트 당첨자!✨
								</h3>
								<p className="mt-3 text-primary-500 text-right">2025.01.22</p>
							</div>
						</Link>
						<Link href={"/notice/1"} className="block mb-2">
							<div className="p-3 bg-(--color-surface-overlay)">
								<h3 className="text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
									공지사항입니다. 이번주 이벤트 당첨자!✨
								</h3>
								<p className="mt-3 text-primary-500 text-right">2025.01.22</p>
							</div>
						</Link>
					</div>
				</div>
				<div className="app_bottom">
					<Button type="button" size="md" variant="primary700" full>
						더보기
					</Button>
				</div>
			</div>
		</div>
	);
}
