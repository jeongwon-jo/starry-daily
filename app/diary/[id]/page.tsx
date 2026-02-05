"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import Link from "next/link";
export default function DiaryDtlPage() {
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="일기장" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="p-3 bg-(--color-surface-overlay) rounded-xl">
						<span className="text-primary-300">11일 일요일</span>
						<div className="mt-1 text-primary-100">
							오늘은 친구와 엽떡을 먹었다. 분모자랑 치즈추가도 했는데 진짜
							맛있었다. 항상 가던 지점이 아니고 다른 지점으로 갔는데 오늘은
							친구와 엽떡을 먹었다. 분모자랑 치즈추가도 했는데 진짜 맛있었다.
							항상 가던 지점이 아니고 다른 지점으로 갔는데
						</div>
						<div className="mt-3">
							<span className="bg-(--color-surface-overlay) w-auto inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
								오늘의 기분
								<img src={happyMood.src} alt="" width={18} />
							</span>
						</div>
						<div className="mt-3 flex items-center justify-end gap-1">
							<Link
								href={"/diary/1/edit"}
								className="pr-1 relative [&:after]:content-[''] [&:after]:inline-block [&:after]:w-px [&:after]:h-2.5 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:-right-0.25 [&:after]:top-1/2 [&:after]:-translate-y-1/2"
							>
								<button type="button" className="text-sm text-primary-500">
									수정
								</button>
							</Link>
							<button type="button" className="text-sm text-primary-500">
								삭제
							</button>
						</div>
					</div>
				</div>
				<div className="app_bottom">
					<Link href={"/diary"}>
						<Button type="button" size="md" variant="primary700" full>
							목록으로
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
