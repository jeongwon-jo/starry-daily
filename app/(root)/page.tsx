"use client";

import diaryIcon from "@/assets/images/icon/icon_diary.svg";
import diaryWriteIcon from "@/assets/images/icon/icon_diary_write.svg";
import bottleLight from "@/assets/images/sub/bottle_light.png";
import bottle from "@/assets/images/sub/main_bottle.png";
import SelectDiaryModal from "@/components/diary/SelectDiaryTypeModal";
import { Header } from "@/components/layout";
import { MessageModal } from "@/components/ui";
import { useTheme } from "@/providers/ThemeProvider";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
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
  mood: "happy" | "love" | "sad" | "angry" | "unrest" | "tired";
};

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
  const { theme } = useTheme();
  const supabase = createClient();
  const [stars, setStars] = useState<Star[]>([]);
  const [openDiaryType, setOpenDiaryType] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const starAreaRef = useRef<HTMLDivElement>(null);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isTodayWrite, setIsTodayWrite] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const date = new Date();
  const dayText = `${date.getFullYear()}. ${
    date.getMonth() + 1
  }. ${date.getDate()}`;

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, [supabase.auth]);

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
  }, [diaries]);

  useEffect(() => {
    if (!user) return;

    const fetchDiaries = async () => {
      setDiaries([]);

      const { data, error } = await supabase
        .from("diary")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setDiaries(data ?? []);
      }
    };

    fetchDiaries();
  }, [supabase, user]);

  useEffect(() => {
    const fetchDiary = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const today = new Date().toISOString().split("T")[0];

      const { data } = await supabase
        .from("diary")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (data) {
        setIsTodayWrite(true);
      } else {
        setIsTodayWrite(false);
      }
    };

    fetchDiary();
  }, [supabase]);

  function checkIsTodayWrite() {
    if (isTodayWrite) {
      setOpenModal(true);
      setMessage("오늘의 별은 이미 접었어요 ✨ \n내일 또 함께 접어볼까요?");
    } else {
      setOpenDiaryType(true);
    }
  }

  return (
    <div className="w-full min-h-dvh">
      <Header type="default"></Header>
      <div className="container">
        <div className="p-5 h-[calc(100dvh-48px)] bg-[url(../assets/images/sub/main_bg.png)] bg-no-repeat bg-cover bg-position-[left_top_65px] relative">
          <div className="inline-block bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(255,255,255,0.1)] rounded-full px-3 w-auto h-7.5 leading-7.5 text-primary-100">
            {dayText}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full">
            <p className="text-lg text-primary-100 text-center mb-6">
              “오늘 하루는 어땠어?”
            </p>
            <div className="relative w-[70%] max-w-[300px] m-auto">
              <Image
                src={theme == "dark" ? bottle : bottleLight}
                alt="bottle"
              />
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
                  <Image
                    src={diaryIcon}
                    alt="diaryIcon"
                    width={22}
                    height={24}
                  />
                  <span className="text-sm text-primary-100">일기장</span>
                </button>
              </Link>
              <button
                type="button"
                className="flex flex-col justify-center items-center w-16.25 gap-1 bg-primary-700 rounded-xl p-2.5"
                onClick={() => checkIsTodayWrite()}
              >
                <Image src={diaryWriteIcon} alt="diaryIcon" height={24} />
                <span className="text-sm text-primary-100">작성하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SelectDiaryModal
        open={openDiaryType}
        setOpenDiaryType={setOpenDiaryType}
      />
      <MessageModal
        open={openModal}
        message={message || ""}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
