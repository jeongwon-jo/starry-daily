"use client";

import Link from "next/link";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import loveMood from "@/assets/images/sub/star_love_face.svg";
import sadMood from "@/assets/images/sub/star_sad_face.svg";
import angryMood from "@/assets/images/sub/star_angry_face.svg";
import unrestMood from "@/assets/images/sub/star_unrest_face.svg";
import tiredMood from "@/assets/images/sub/star_tired_face.svg";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../ui";
import { useState } from "react";

type Props = {
  id: string;
  dayText: string;
  question?: string;
  content?: string;
  mood?: string;
  isDetail?: boolean;
  onDeleteSuccess: (id: string) => void;
};

const moodMap: Record<string, string> = {
  happy: happyMood.src,
  sad: sadMood.src,
  angry: angryMood.src,
  unrest: unrestMood.src,
  love: loveMood.src,
  tired: tiredMood.src,
};

export default function DiaryItem({
  id,
  dayText,
  question,
  content,
  mood,
  isDetail,
  onDeleteSuccess
}: Props) {
  const supabase = createClient();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleDelete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(id);
    console.log(user?.id);
    
    const { error } = await supabase
      .from("diary")
      .delete()
      .eq("id", id)
      .eq("user_id", user?.id);
    
    if (!error) {
      onDeleteSuccess?.(id);
    }
  };

  return (
    <div className="p-3 bg-(--color-surface-overlay) rounded-xl mb-2">
      <Link href={isDetail ? "" : `/diary/${id}`} className="block">
        <span className="text-primary-300">{dayText}</span>

        {question && (
          <>
            <p className="mt-1 text-primary-100">Q. {question}</p>
            <p className="mt-1 text-primary-100">A. {content}</p>
          </>
        )}

        {!question && (
          <p className="mt-1 text-primary-100 overflow-hidden text-ellipsis line-clamp-2 break-words">
            {content}
          </p>
        )}
      </Link>

      <div className="mt-1">
        <span className="bg-(--color-surface-overlay) inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
          오늘의 기분
          {mood && moodMap[mood] && (
            <img src={moodMap[mood]} alt={mood} width={18} />
          )}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1">
        <Link
          href={`/diary/${id}/edit`}
          className="pr-1 relative after:content-[''] after:inline-block after:w-px after:h-2.5 after:bg-primary-500 after:absolute after:-right-0.25 after:top-1/2 after:-translate-y-1/2"
        >
          <button type="button" className="text-sm text-primary-500">
            수정
          </button>
        </Link>

        <button type="button" className="text-sm text-primary-500" onClick={() => {setMessage("일기를 삭제하시겠습니까?"); setOpenModal(true)}}>
          삭제
        </button>
      </div>
      
      <ConfirmModal
        open={openModal}
        message={message || ""}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
