"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import DiaryItem from "@/components/diary/DiaryItem";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Diary } from "../page";

export default function DiaryDtlPage() {
	const { id } = useParams();
  const supabase = createClient();
  const router = useRouter();
  const [diary, setDiary] = useState<Diary>();

  useEffect(() => {
    const fetchDiary = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("diary")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      setDiary(data);
    };

    fetchDiary();
  }, [id]);
	
  if (!diary) {
    return <div>존재하지 않는 일기입니다.</div>;
  }

  const date = new Date(diary.created_at);
  const dayText = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="일기장" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<DiaryItem
						key={diary.id}
						id={diary.id}
						dayText={dayText}
						question={diary.question}
						content={diary.content}
						mood={diary.mood}
						isDetail={true}
            onDeleteSuccess={()=>{router.push("/diary")}}
					/>
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
