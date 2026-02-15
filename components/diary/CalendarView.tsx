"use client";

import { Diary } from "@/app/diary/page";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import loveMood from "@/assets/images/sub/star_love_face.svg";
import sadMood from "@/assets/images/sub/star_sad_face.svg";
import angryMood from "@/assets/images/sub/star_angry_face.svg";
import unrestMood from "@/assets/images/sub/star_unrest_face.svg";
import tiredMood from "@/assets/images/sub/star_tired_face.svg";


type Props = {
  year: number;
  month: number;
  diaries: Diary[];
  onSelectDate?: (date: number) => void;
};

const moodMap: Record<string, string> = {
  happy: happyMood.src,
  sad: sadMood.src,
  angry: angryMood.src,
  unrest: unrestMood.src,
  love: loveMood.src,
  tired: tiredMood.src,
};

export default function CalendarView({ year, month, diaries, onSelectDate }: Props) {
  // 해당 월의 총 일수
  const lastDate = new Date(year, month, 0).getDate();

  // 해당 월 1일의 요일 (0=일요일 ~ 6=토요일)
  const firstDay = new Date(year, month - 1, 1).getDay();

  const totalCells = firstDay + lastDate;

  const calendarDays = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - firstDay + 1;

    if (index < firstDay) return null;
    return dayNumber;
  });

  const diaryMap = new Map<number, Diary>();

  diaries.forEach((diary) => {
    const date = new Date(diary.created_at);
    const day = date.getDate();
    diaryMap.set(day, diary);
  });

  return (
    <div className="mt-6">
      <div className="m-auto rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 h-10 bg-[rgb(255,255,255,0.1)] text-center text-sm text-primary-300">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 bg-[rgb(255,255,255,0.04)]">
          {calendarDays.map((day, idx) => {
            const diary = day ? diaryMap.get(day) : null;

            return (
              <div
                key={idx}
                onClick={() => day && onSelectDate?.(day)}
                className="h-[68px] flex flex-col items-center justify-start pt-1 cursor-pointer"
              >
                {day && (
                  <>
                    <span className="text-sm text-primary-100">
                      {day}
                    </span>

                    {diary?.mood && moodMap[diary.mood] && (
                      <img
                        src={moodMap[diary.mood]}
                        alt={diary.mood}
                        width={16}
                        className="mt-1"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
