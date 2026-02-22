"use client";

import { Header } from "@/components/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, MessageModal } from "@/components/ui";
import CalendarView from "@/components/diary/CalendarView";
import ListView from "@/components/diary/ListView";
import { createClient } from "@/utils/supabase/client";
import DiaryItem from "@/components/diary/DiaryItem";
import Image from "next/image";
import diaryQuestion from "@/assets/images/sub/diary_type_question.png";
import diaryFree from "@/assets/images/sub/diary_type_free.png";

export type Diary = {
	id: string,
	user_id: string,
	content: string,
	question: string,
	mood: string,
	date: string,
	created_at: string,
}

export default function DiaryListPage() {
	const supabase = createClient();
  const [tab, setTab] = useState<"calendar" | "list">("calendar");
	const [selectedDate, setSelectedDate] = useState<number | null>(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const [selectedDiaryCount, setSelectedDiaryCount] = useState<number | null>(null);
	const [openDiaryType, setOpenDiaryType] = useState<boolean>(false);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

	// 유저정보 가져오기
	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				setUserId(user.id);
			}
		};
		getUser();
	}, [supabase.auth]);

	// 선택된 날짜의 일기 존재 여부파악
	useEffect(() => {
		if (!selectedDate || !userId) return;

		const todayDate = new Date();
		todayDate.setHours(0, 0, 0, 0);

		const selected = new Date(year, month - 1, selectedDate);
		selected.setHours(0, 0, 0, 0);

		if (selected > todayDate) return;

		const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;

		const fetchDateDiary = async () => {
			const { count, error } = await supabase
				.from("diary")
				.select("id", { count: "exact", head: true })
				.eq("user_id", userId)
				.eq("date", formattedDate);

			if (!error) {
				setSelectedDiaryCount(count ?? 0);
			}
		};

		fetchDateDiary();
	}, [month, selectedDate, supabase, userId, year]);
	
	// 월 이동
	const handlePrevMonth = () => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() - 1);
			return newDate;
		});
	};

	const handleNextMonth = () => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() + 1);
			return newDate;
		});
	};

	// 일기 삭제
	function onDeleteSuccess(id: string) {
		setDiaries(prev => prev.filter(d => d.id !== id));
		setOpenModal(true)
		setMessage("게시물이 삭제되었습니다.")
	}

	// 전체 일기 불러오기
	useEffect(() => {
		if (!userId) return;

		const fetchDiaries = async () => {
			setDiaries([]);
			const startOfMonth = new Date(year, month - 1, 1);
			const endOfMonth = new Date(year, month, 0, 23, 59, 59);
			
			const { data, error } = await supabase
				.from("diary")
				.select("*")
				.eq("user_id", userId)
				.gte("date", startOfMonth.toISOString())
				.lte("date", endOfMonth.toISOString())
				.order("date", { ascending: false });

			if (!error) {
				setDiaries(data ?? []);
			}
			
		};

		fetchDiaries();
	}, [userId, year, month, supabase]);

	// 선택된 일기 객체
	const selectedDiary = diaries.find((diary) => {
		const date = new Date(diary.date);
		return date.getDate() === selectedDate;
	});
	

	// 선택된 날짜의 일기 작성 여부
	const todayDate = new Date();
	todayDate.setHours(0, 0, 0, 0);

	const selected =
		selectedDate !== null
			? new Date(year, month - 1, selectedDate)
			: null;

	if (selected) selected.setHours(0, 0, 0, 0);

	const isFuture = selected ? selected > todayDate : true;

	const ableWrite =
		selectedDate !== null &&
		!isFuture &&
		selectedDiaryCount === 0;

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="일기장" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handlePrevMonth}
								className="size-4 inline-block bg-[url('../assets/images/icon/icon_prev.svg')] bg-no-repeat"
							></button>
							<span className="text-primary-100 text-lg">{year}년 {month}월</span>
							<button
								type="button"
								onClick={handleNextMonth}
								className="size-4 inline-block bg-[url('../assets/images/icon/icon_next.svg')] bg-no-repeat"
							></button>
						</div>
						<div className="flex items-center gap-1">
							<button
								type="button"
								className={`size-6 inline-block bg-[url('../assets/images/icon/icon_calendar.svg')] bg-no-repeat relative mr-1.5 ${
									tab == "calendar"
										? "bg-[url('../assets/images/icon/icon_calendar_active_light.svg')] dark:bg-[url('../assets/images/icon/icon_calendar_active.svg')]"
										: ""
								} [&:after]:content-[''] [&:after]:w-[1px] [&:after]:h-3 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:top-1/2 [&:after]:-translate-y-1/2 [&:after]:-right-1.5`}
								onClick={() => setTab("calendar")}
							></button>
							<button
								type="button"
								className={`size-6 inline-block bg-[url('../assets/images/icon/icon_list.svg')] bg-no-repeat ${
									tab == "list"
										? "bg-[url('../assets/images/icon/icon_list_active_light.svg')] dark:bg-[url('../assets/images/icon/icon_list_active.svg')]"
										: ""
								}`}
								onClick={() => setTab("list")}
							></button>
						</div>
					</div>
					{tab == "calendar" && (
						<>
							<CalendarView year={year} month={month} diaries={diaries} onSelectDate={(date) => setSelectedDate(date)}/>
							{selectedDate && selectedDiary && (
								<div className="mt-6">
									<DiaryItem
										key={selectedDiary.id}
										id={selectedDiary.id}
										dayText={`${new Date(selectedDiary.date).getDate()}일`}
										question={selectedDiary.question}
										content={selectedDiary.content}
										mood={selectedDiary.mood}
										onDeleteSuccess={() => onDeleteSuccess(selectedDiary.id)}
									/>
								</div>
							)}
							{!selectedDiary && ableWrite && (
								<div className="mt-3">
									<Button type="button" variant="primary700" full onClick={()=>{setOpenDiaryType(true)}}>{selectedDate}일 일기 작성하기</Button>
								</div>
							)}
							
						</>
					)}
					{tab == "list" && (
						<>
							<ListView diaries={diaries} onDeleteSuccess={(deletedId) => {
							setDiaries(prev => prev.filter(d => d.id !== deletedId));
							setOpenModal(true);
							setMessage("게시물이 삭제되었습니다.");
						}}  />
						</>
					)}
				</div>
			</div>
			{openDiaryType && (
				<div
					className="fixed inset-0 z-1000 flex items-end justify-center max-w-150 m-auto"
					onClick={() => setOpenDiaryType(false)}
				>
					<div
						className="bg-white dark:bg-primary-800 rounded-3xl w-full px-5 pb-5 animate-sheet-up"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-center mt-3">
							<span className="inline-block w-15 h-1.5 rounded-full bg-[rgb(0,0,0,0.1)] dark:bg-[rgb(256,256,256,0.1)]"></span>
						</div>
						<h3 className="text-lg text-center text-primary-100 mt-3">
							원하는 일기장을 선택해줘
						</h3>
						<div className="mt-6">
							<Link
								href={{ pathname: "/diary/write", query: { type: "question", date: `${year}-${String(month).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}` } }}
								className="block bg-primary-600 rounded-xl p-3 mb-3"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Image src={diaryQuestion} alt="" width={44}/>
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
								href={{ pathname: "/diary/write", query: { type: "diary", date: `${year}-${String(month).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}` } }}
								className="block bg-primary-600 rounded-xl p-3"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Image src={diaryFree} alt="" width={44}/>
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
			<MessageModal
				open={openModal}
				message={message || ""}
				onClose={() => setOpenModal(false)}
			/>
		</div>
	);
}
