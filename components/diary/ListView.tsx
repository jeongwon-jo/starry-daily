"use client";

import { Diary } from "@/app/diary/page";
import DiaryItem from "./DiaryItem";
import { Button, MessageModal } from "@/components/ui";
import { useMemo, useState } from "react";

type Props = {
  diaries: Diary[];
  onDeleteSuccess: (id: string) => void;
};

export default function ListView({ diaries, onDeleteSuccess }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showAll, setShowAll] = useState(false);

  const DISPLAY_LIMIT = 10;

  const visibleDiaries = useMemo(() => {
    return showAll ? diaries : diaries.slice(0, DISPLAY_LIMIT);
  }, [diaries, showAll]);
  
  if (!diaries.length) {
    return (
      <div className="mt-10 text-center text-primary-500">
        작성된 일기가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        {visibleDiaries.map((diary) => {
          const date = new Date(diary.date);

          const dayText = `${date.getDate()}일`;

          return (
            <DiaryItem
              key={diary.id}
              id={diary.id}
              dayText={dayText}
              question={diary.question}
              content={diary.content}
              mood={diary.mood}
              onDeleteSuccess={() => onDeleteSuccess(diary.id)}
            />
          );
        })}
      </div>

      {diaries.length > DISPLAY_LIMIT && !showAll && (
        <div className="mt-10">
          <Button
            type="button"
            size="md"
            variant="primary700"
            full
            onClick={() => setShowAll(true)}
          >
            더보기
          </Button>
        </div>
      )}
      <MessageModal
        open={openModal}
        message={message || ""}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
