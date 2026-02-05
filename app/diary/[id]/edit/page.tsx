"use client";

import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import loveMood from "@/assets/images/sub/star_love_face.svg";
import sadMood from "@/assets/images/sub/star_sad_face.svg";
import angryMood from "@/assets/images/sub/star_angry_face.svg";
import unrestMood from "@/assets/images/sub/star_unrest_face.svg";
import tiredMood from "@/assets/images/sub/star_tired_face.svg";
export default function DiaryWritePage() {
	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="작성하기" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="w-full p-2.5 bg-[rgb(255,255,255,0.1)] rounded-xl text-center text-primary-100 relative [&:after]:content-[''] [&:after]:absolute [&:after]:left-1/2 [&:after]:-bottom-3 [&:after]:-translate-x-1/2 [&:after]:w-5.5 [&:after]:h-3 [&:after]:bg-[url('../assets/images/icon/icon_bubble_arrow.svg')]">
						Q. 오늘 가장 기억에 남는 말은?
					</div>
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
								value={"오늘은 친구와"}
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
										<input type="radio" id="mood_happy" name="radio_mood" checked />
										<em>
											<span>기쁨</span>
											<img src={happyMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_love">
										<input type="radio" id="mood_love" name="radio_mood" />
										<em>
											<span>설렘</span>
											<img src={loveMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_sad">
										<input type="radio" id="mood_sad" name="radio_mood" />
										<em>
											<span>슬픔</span>
											<img src={sadMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_angry">
										<input type="radio" id="mood_angry" name="radio_mood" />
										<em>
											<span>화남</span>
											<img src={angryMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_unrest">
										<input type="radio" id="mood_unrest" name="radio_mood" />
										<em>
											<span>불안</span>
											<img src={unrestMood.src} alt="" />
										</em>
									</label>
								</div>
								<div className="select_mood">
									<label htmlFor="mood_tired">
										<input type="radio" id="mood_tired" name="radio_mood" />
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
					<Button type="button" size="md" variant="primary700" full>
						별 접기
					</Button>
				</div>
			</div>
		</div>
	);
}
