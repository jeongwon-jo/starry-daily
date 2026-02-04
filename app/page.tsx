"use client";

import { Header } from "@/components/layout";
import Link from "next/link";
import diaryIcon from "@/assets/images/icon/icon_diary.svg";
import diaryWriteIcon from "@/assets/images/icon/icon_diary_write.svg";
import bottle from "@/assets/images/sub/main_bottle.png";
import diaryQuestion from "@/assets/images/sub/diary_type_question.png";
import diaryFree from "@/assets/images/sub/diary_type_free.png";
import { useEffect, useRef, useState } from "react";
type Star = {
	id: number;
	x: number;
	y: number;
	rotate: number;
	color: string;
};

type Diary = {
	id: number;
	mood: "happy" | "love" | "sad" | "angry" | "unrest" | "tired"
};

const diaries: Diary[] = [
	{ id: 1, mood: "happy" },
	{ id: 2, mood: "love" },
	{ id: 3, mood: "sad" },
	{ id: 4, mood: "angry" },
	{ id: 5, mood: "unrest" },
	{ id: 6, mood: "tired" },
	{ id: 7, mood: "happy" },
	{ id: 8, mood: "love" },
	{ id: 9, mood: "sad" },
	{ id: 10, mood: "angry" },
	{ id: 11, mood: "unrest" },
	{ id: 12, mood: "happy" },
	{ id: 13, mood: "tired" },
];

const STAR_SIZE = 36;
const GAP = 6;

const getStarPosition = (index: number, areaWidth: number) => {
	const CELL = STAR_SIZE + GAP;
	const cols = Math.floor(areaWidth / CELL);

	const row = Math.floor(index / cols);
	const col = index % cols;

	const baseX = col * CELL;
	const baseY = row * CELL;

	const jitter = 6;

	return {
		x: baseX + Math.random() * jitter,
		y: baseY + Math.random() * jitter,
		rotate: Math.random() * 30 - 15,
	};
};


export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);
  const [openDiaryType, setOpenDiaryType] = useState<boolean>(false);
	const starAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
		if (!starAreaRef.current) return;

		const areaWidth = starAreaRef.current.clientWidth;

		const initialStars: Star[] = diaries.map((diary, index) => {
			const pos = getStarPosition(index, areaWidth);

			return {
				id: diary.id,
				x: pos.x,
				y: pos.y,
				rotate: pos.rotate,
				color: `color_${diary.mood}`,
			};
		});

		setStars(initialStars);
	}, []);


  return (
		<div className="w-full min-h-dvh">
			<Header type="default"></Header>
			<div className="container">
				<div className="p-5 h-[calc(100dvh-48px)] bg-[url(../assets/images/sub/main_bg.png)] bg-no-repeat bg-cover bg-position-[left_top_65px] relative">
					<div className="inline-block bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(255,255,255,0.1)] rounded-full px-3 w-auto h-7.5 leading-7.5 text-primary-100">
						2024.11.07
					</div>
					<div className="absolute left-1/2 top-1/2 -translate-1/2 w-full">
						<p className="text-lg text-primary-100 text-center mb-6">
							“오늘 하루는 어땠어?”
						</p>
						<div className="relative w-[80%] max-w-[300px] m-auto">
							<img src={bottle.src} alt="" />
							<div
								ref={starAreaRef}
								className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[70%] h-[65%]"
							>
								{stars.map((star) => (
									<span
										key={star.id}
										className={`diary_star absolute inline-block size-9 ${star.color}`}
										style={{
											left: `${star.x}px`,
											bottom: `${star.y}px`,
											transform: `rotate(${star.rotate}deg)`,
										}}
									></span>
								))}
							</div>
						</div>
					</div>
					<div className="app_bottom">
						<div className="flex items-center justify-between">
							<Link href={"/diary"}>
								<button
									type="button"
									className="flex flex-col justify-center items-center w-16.25 gap-1 bg-primary-700 rounded-xl p-2.5"
								>
									<img src={diaryIcon.src} alt="" width={22} height={24} />
									<span className="text-sm text-primary-100">일기장</span>
								</button>
							</Link>
							<button
								type="button"
								className="flex flex-col justify-center items-center w-16.25 gap-1 bg-primary-700 rounded-xl p-2.5"
								onClick={() => setOpenDiaryType(true)}
							>
								<img src={diaryWriteIcon.src} alt="" height={24} />
								<span className="text-sm text-primary-100">작성하기</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			{openDiaryType && (
				<div
					className="fixed inset-0 z-1000 flex items-end justify-center max-w-150 m-auto"
					onClick={() => setOpenDiaryType(false)}
				>
					<div
						className="bg-primary-800 rounded-3xl w-full px-5 pb-5 animate-sheet-up"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-center mt-3">
							<span className="inline-block w-15 h-1.5 rounded-full bg-[rgb(256,256,256,0.1)]"></span>
						</div>
						<h3 className="text-lg text-center text-primary-100 mt-3">
							원하는 일기장을 선택해줘
						</h3>
						<div className="mt-6">
							<Link
								href={"/diary/write"}
								className="block bg-primary-600 rounded-xl p-3 mb-3"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<img src={diaryQuestion.src} width={44} alt="" />
										<div>
											<h3 className="text-primary-100">질문형 일기장</h3>
											<p className="text-primary-200 text-sm mt-1">
												무슨 내용을 적어야할지 고민될 때!
											</p>
										</div>
									</div>
									<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
								</div>
							</Link>
							<Link
								href={"/diary/write"}
								className="block bg-primary-600 rounded-xl p-3"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<img src={diaryFree.src} width={44} alt="" />
										<div>
											<h3 className="text-primary-100">기록형 일기장</h3>
											<p className="text-primary-200 text-sm mt-1">
												자유롭게 내 마음을 적고 싶을 때!
											</p>
										</div>
									</div>
									<div className="size-4 shrink-0 bg-[url('../assets/images/icon/icon_setting_link.svg')] bg-no-repeat bg-contain"></div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
