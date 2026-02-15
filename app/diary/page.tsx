"use client";

import { Header } from "@/components/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, MessageModal } from "@/components/ui";
import CalendarView from "@/components/diary/CalendarView";
import ListView from "@/components/diary/ListView";
import { createClient } from "@/utils/supabase/client";
import DiaryItem from "@/components/diary/DiaryItem";

export type Diary = {
	id: string,
	user_id: string,
	content: string,
	question: string,
	mood: string,
	created_at: string,
}

export default function DiaryListPage() {
	const supabase = createClient();
  const [tab, setTab] = useState<"calendar" | "list">("calendar");
	const [selectedDate, setSelectedDate] = useState<number | null>(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [userId, setUserId] = useState<string | null>(null);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

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
	}, []);

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

	const selectedDiary = diaries.find((diary) => {
		const date = new Date(diary.created_at);
		return date.getDate() === selectedDate;
	});

	function onDeleteSuccess(id: string) {
		setDiaries(prev => prev.filter(d => d.id !== id));
		setOpenModal(true)
		setMessage("게시물이 삭제되었습니다.")
	}

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
				.gte("created_at", startOfMonth.toISOString())
				.lte("created_at", endOfMonth.toISOString())
				.order("created_at", { ascending: false });

			if (!error) {
				setDiaries(data ?? []);
			}
		};

		fetchDiaries();
	}, [userId, year, month, supabase]);



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
										? "bg-[url('../assets/images/icon/icon_calendar_active.svg')]"
										: ""
								} [&:after]:content-[''] [&:after]:w-[1px] [&:after]:h-3 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:top-1/2 [&:after]:-translate-y-1/2 [&:after]:-right-1.5`}
								onClick={() => setTab("calendar")}
							></button>
							<button
								type="button"
								className={`size-6 inline-block bg-[url('../assets/images/icon/icon_list.svg')] bg-no-repeat ${
									tab == "list"
										? "bg-[url('../assets/images/icon/icon_list_active.svg')]"
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
										dayText={`${new Date(selectedDiary.created_at).getDate()}일`}
										question={selectedDiary.question}
										content={selectedDiary.content}
										mood={selectedDiary.mood}
										onDeleteSuccess={() => onDeleteSuccess(selectedDiary.id)}
									/>
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
			<MessageModal
				open={openModal}
				message={message || ""}
				onClose={() => setOpenModal(false)}
			/>
		</div>
	);
}
