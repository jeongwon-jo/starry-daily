"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button, MessageModal } from "../ui";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import loveMood from "@/assets/images/sub/star_love_face.svg";
import sadMood from "@/assets/images/sub/star_sad_face.svg";
import angryMood from "@/assets/images/sub/star_angry_face.svg";
import unrestMood from "@/assets/images/sub/star_unrest_face.svg";
import tiredMood from "@/assets/images/sub/star_tired_face.svg";

export default function DiaryForm({
	type,
	randomQuestion,
}: {
	type: string | undefined;
	randomQuestion: string | null;
}) {
	const supabase = createClient();
  const router = useRouter();

	const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [openSuccessSaveModal, setOpenSuccessSaveModal] = useState(false);

	const handleSave = async () => {
    if (!content) {
      setOpenModal(true)
      setMessage("내용을 입력해주세요");
      return;
    }

    if (!mood) {
      setOpenModal(true);
      setMessage("기분을 선택해주세요");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setOpenModal(true);
      setMessage("로그인이 필요합니다");
      return;
    }

    const { error } = await supabase.from("diary").insert([
      {
        question: type === "question" ? randomQuestion : null,
        content,
        date: new Date().toISOString().split("T")[0],
        mood,
        user_id: user.id,
      },
    ]);

    if (error) {
      setOpenModal(true);
      setMessage(error.message);
    } else {
      setOpenSuccessSaveModal(true);
      setMessage("저장되었습니다.");
    }
  };

	return (
    <>
    <div className="p-5">
					{type === "question" && randomQuestion && (
						<div className="w-full p-2.5 bg-[rgb(255,255,255,0.1)] rounded-xl text-center text-primary-100 relative [&:after]:content-[''] [&:after]:absolute [&:after]:left-1/2 [&:after]:-bottom-3 [&:after]:-translate-x-1/2 [&:after]:w-5.5 [&:after]:h-3 [&:after]:bg-[url('../assets/images/icon/icon_bubble_arrow.svg')]">
							Q. {randomQuestion}
						</div>
					)}
					<div className="mt-6">
						<span className="text-primary-300">11일 일요일</span>
						<div className="mt-2 bg-[rgb(255,255,255,0.04)] p-3 rounded-xl">
							<textarea
								className="
                  diary-textarea
                  w-full h-56
                  resize-none
                  bg-transparent
                  text-primary-100
                  outline-none
                  scroll
                  overflow-y-auto
                "
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder="일기를 등록해봐요"
							></textarea>
						</div>
					</div>
					<div className="mt-6 p-3 bg-[rgb(255,255,255,0.04)] rounded-xl">
						<h3 className="text-primary-100">기분은 어때?</h3>
						<div className="mt-2">
							<div className="flex items-center">
								<div className="select_mood">
									<label htmlFor="mood_happy">
										<input
											type="radio"
											id="mood_happy"
											name="radio_mood"
											value="happy"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>기쁨</span>
											<img src={happyMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_love">
										<input
											type="radio"
											id="mood_love"
											name="radio_mood"
											value="love"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>설렘</span>
											<img src={loveMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_sad">
										<input
											type="radio"
											id="mood_sad"
											name="radio_mood"
											value="sad"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>슬픔</span>
											<img src={sadMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_angry">
										<input
											type="radio"
											id="mood_angry"
											name="radio_mood"
											value="angry"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>화남</span>
											<img src={angryMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_unrest">
										<input
											type="radio"
											id="mood_unrest"
											name="radio_mood"
											value="unrest"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>불안</span>
											<img src={unrestMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_tired">
										<input
											type="radio"
											id="mood_tired"
											name="radio_mood"
											value="tired"
											onChange={(e) => setMood(e.target.value)}
										/>
										<em>
											<span>피곤</span>
											<img src={tiredMood.src} alt="" />
										</em>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="app_bottom">
					<Button
						type="button"
						size="md"
						variant="primary700"
						full
						onClick={handleSave}
					>
						별 접기
					</Button>
				</div>
				<MessageModal
					open={openModal}
					message={message || ""}
					onClose={() => setOpenModal(false)}
				/>
				<MessageModal
					open={openSuccessSaveModal}
					message={message || ""}
					onClose={() => {router.replace("/diary/write/complete");}}
      />
    </>
	);
}
