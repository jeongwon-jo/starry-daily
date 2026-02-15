"use client";

import { Diary } from "@/app/diary/page";
import DiaryItem from "./DiaryItem";
import { Button, MessageModal } from "@/components/ui";
import { useState } from "react";

type Props = {
  diaries: Diary[];
  onDeleteSuccess: (id: string) => void;
};

export default function ListView({ diaries, onDeleteSuccess }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

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
        {diaries.map((diary) => {
          const date = new Date(diary.created_at);

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

      <div className="mt-10">
        <Button type="button" size="md" variant="primary700" full>
          더보기
        </Button>
      </div>
      <MessageModal
        open={openModal}
        message={message || ""}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
