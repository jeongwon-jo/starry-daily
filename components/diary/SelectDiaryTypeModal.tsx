import diaryFree from "@/assets/images/sub/diary_type_free.png";
import diaryQuestion from "@/assets/images/sub/diary_type_question.png";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function SelectDiaryModal({
  open,
  setOpenDiaryType,
}: {
  open: boolean;
  setOpenDiaryType: Dispatch<SetStateAction<boolean>>;
}) {
  if (open == true) {
    return (
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
              href={{ pathname: "/diary/write", query: { type: "question" } }}
              className="block bg-primary-600 rounded-xl p-3 mb-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={diaryQuestion} alt="" width={44} />
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
              href={{ pathname: "/diary/write", query: { type: "diary" } }}
              className="block bg-primary-600 rounded-xl p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={diaryFree} alt="" width={44} />
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
    );
  }
}
