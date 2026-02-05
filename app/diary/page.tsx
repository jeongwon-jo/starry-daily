"use client";

import { Header } from "@/components/layout";
import { useState } from "react";
import happyMood from "@/assets/images/sub/star_happy_face.svg";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function DiaryDtlPage() {
  const [tab, setTab] = useState<"calendar" | "list">("calendar");

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="일기장" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<button
								type="button"
								className="size-4 inline-block bg-[url('../assets/images/icon/icon_prev.svg')] bg-no-repeat"
							></button>
							<span className="text-primary-100 text-lg">2025년 1월</span>
							<button
								type="button"
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
					{/*  */}
					{tab == "calendar" && (
						<>
							<div className="mt-6">
								<div className="m-auto rounded-xl overflow-hidden">
									<div className="flex items-center h-10 bg-[rgb(255,255,255,0.1)] [&>div]:flex-1 [&>div]:text-center [&>div]:text-sm [&>div]:text-primary-300">
										<div>월</div>
										<div>화</div>
										<div>수</div>
										<div>목</div>
										<div>금</div>
										<div>토</div>
										<div>일</div>
									</div>
									<div className="flex items-center h-[68px] bg-[rgb(255,255,255,0.04)] [&>div]:flex-1 [&>div]:h-full [&>div>span]:text-sm [&>div>span]:h-7 [&>div>span]:text-center [&>div>span]:flex [&>div>span]:justify-center [&>div>span]:items-center [&>div>span]:text-primary-100 [&>div>.star]:w-full [&>div>.star]:h-10 [&>div>.star]:flex [&>div>.star]:items-center [&>div>.star]:justify-center">
										<div></div>
										<div></div>
										<div></div>
										<div>
											<span className=""><b className="inline-block font-normal rounded-full size-5 bg-primary-800">1</b></span>
											<div className="star color_happy"></div>
										</div>
										<div>
											<span>2</span>
											<div className="star color_love"></div>
										</div>
										<div>
											<span>3</span>
											<div className="star color_unrest"></div>
										</div>
										<div>
											<span>4</span>
										</div>
									</div>
									<div className="flex items-center h-[68px] bg-[rgb(255,255,255,0.04)] [&>div]:flex-1 [&>div]:h-full [&>div>span]:text-sm [&>div>span]:h-7 [&>div>span]:text-center [&>div>span]:flex [&>div>span]:justify-center [&>div>span]:items-center [&>div>span]:text-primary-100 [&>div>.star]:w-full [&>div>.star]:h-10 [&>div>.star]:flex [&>div>.star]:items-center [&>div>.star]:justify-center">
										<div>
											<span>5</span>
											<div className="star color_sad"></div>
										</div>
										<div>
											<span>6</span>
											<div className="star color_angry"></div>
										</div>
										<div>
											<span>7</span>
											<div className="star color_happy"></div>
										</div>
										<div>
											<span>8</span>
										</div>
										<div>
											<span>9</span>
										</div>
										<div>
											<span>10</span>
											<div className="star color_unrest"></div>
										</div>
										<div>
											<span>11</span>
											<div className="star color_love"></div>
										</div>
									</div>
									<div className="flex items-center h-[68px] bg-[rgb(255,255,255,0.04)] [&>div]:flex-1 [&>div]:h-full [&>div>span]:text-sm [&>div>span]:h-7 [&>div>span]:text-center [&>div>span]:flex [&>div>span]:justify-center [&>div>span]:items-center [&>div>span]:text-primary-100 [&>div>.star]:w-full [&>div>.star]:h-10 [&>div>.star]:flex [&>div>.star]:items-center [&>div>.star]:justify-center">
										<div>
											<span>12</span>
											<div className="star color_sad"></div>
										</div>
										<div>
											<span>13</span>
											<div className="star color_angry"></div>
										</div>
										<div>
											<span>14</span>
											<div className="star color_happy"></div>
										</div>
										<div>
											<span>15</span>
										</div>
										<div>
											<span>16</span>
										</div>
										<div>
											<span>17</span>
											<div className="star color_unrest"></div>
										</div>
										<div>
											<span>18</span>
											<div className="star color_love"></div>
										</div>
									</div>
									<div className="flex items-center h-[68px] bg-[rgb(255,255,255,0.04)] [&>div]:flex-1 [&>div]:h-full [&>div>span]:text-sm [&>div>span]:h-7 [&>div>span]:text-center [&>div>span]:flex [&>div>span]:justify-center [&>div>span]:items-center [&>div>span]:text-primary-100 [&>div>.star]:w-full [&>div>.star]:h-10 [&>div>.star]:flex [&>div>.star]:items-center [&>div>.star]:justify-center">
										<div>
											<span>19</span>
											<div className="star color_tired"></div>
										</div>
										<div>
											<span>20</span>
										</div>
										<div>
											<span>21</span>
										</div>
										<div>
											<span>22</span>
											<div className="star color_unrest"></div>
										</div>
										<div>
											<span>23</span>

											<div className="star color_happy"></div>
										</div>
										<div>
											<span>24</span>
											<div className="star color_unrest"></div>
										</div>
										<div>
											<span>25</span>
											<div className="star color_love"></div>
										</div>
									</div>
									<div className="flex items-center h-[68px] bg-[rgb(255,255,255,0.04)] [&>div]:flex-1 [&>div]:h-full [&>div>span]:text-sm [&>div>span]:h-7 [&>div>span]:text-center [&>div>span]:flex [&>div>span]:justify-center [&>div>span]:items-center [&>div>span]:text-primary-100 [&>div>.star]:w-full [&>div>.star]:h-10 [&>div>.star]:flex [&>div>.star]:items-center [&>div>.star]:justify-center">
										<div>
											<span>26</span>
										</div>
										<div>
											<span>27</span>
											<div className="star color_angry"></div>
										</div>
										<div>
											<span>28</span>
											<div className="star color_happy"></div>
										</div>
										<div>
											<span>29</span>

											<div className="star color_angry"></div>
										</div>
										<div>
											<span>30</span>
										</div>
										<div>
											<span>31</span>
											<div className="star color_unrest"></div>
										</div>
										<div></div>
									</div>
								</div>
							</div>
							<div className="mt-6">
								<div className="p-3 bg-(--color-surface-overlay) rounded-xl mb-2">
									<Link href={"/diary/1"} className="block ">
										<span className="text-primary-300">11일 일요일</span>
										<p className="mt-1 text-primary-100">
											Q. 오늘 가장 기억에 남는 말은?
										</p>
										<p className="mt-1 text-primary-100">A. 고맙다는 말</p>
									</Link>
									<div className="mt-1">
										<span className="bg-(--color-surface-overlay) w-auto inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
											오늘의 기분
											<img src={happyMood.src} alt="" width={18} />
										</span>
									</div>
									<div className="mt-3 flex items-center justify-end gap-1">
										<Link
											href={"/diary/1/edit"}
											className="pr-1 relative [&:after]:content-[''] [&:after]:inline-block [&:after]:w-px [&:after]:h-2.5 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:-right-0.25 [&:after]:top-1/2 [&:after]:-translate-y-1/2"
										>
											<button
												type="button"
												className="text-sm text-primary-500"
											>
												수정
											</button>
										</Link>
										<button type="button" className="text-sm text-primary-500">
											삭제
										</button>
									</div>
								</div>
							</div>
						</>
					)}
					{tab == "list" && (
						<>
							<div className="mt-6">
								<div className="p-3 bg-(--color-surface-overlay) rounded-xl mb-2">
									<Link href={"/diary/1"} className="block ">
										<span className="text-primary-300">11일 일요일</span>
										<p className="mt-1 text-primary-100">
											Q. 오늘 가장 기억에 남는 말은?
										</p>
										<p className="mt-1 text-primary-100">A. 고맙다는 말</p>
									</Link>
									<div className="mt-1">
										<span className="bg-(--color-surface-overlay) w-auto inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
											오늘의 기분
											<img src={happyMood.src} alt="" width={18} />
										</span>
									</div>
									<div className="mt-3 flex items-center justify-end gap-1">
										<Link
											href={"/diary/1/edit"}
											className="pr-1 relative [&:after]:content-[''] [&:after]:inline-block [&:after]:w-px [&:after]:h-2.5 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:-right-0.25 [&:after]:top-1/2 [&:after]:-translate-y-1/2"
										>
											<button
												type="button"
												className="text-sm text-primary-500"
											>
												수정
											</button>
										</Link>
										<button type="button" className="text-sm text-primary-500">
											삭제
										</button>
									</div>
								</div>
								<div className="p-3 bg-(--color-surface-overlay) rounded-xl mb-2">
									<Link href={"/diary/1"} className="block ">
										<span className="text-primary-300">11일 일요일</span>
										<p className="mt-1 text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
											오늘은 친구와 엽떡을 먹었다. 분모자랑 치즈추가도 했는데
											진짜 맛있었다. 항상 가던 지점이 아니고 다른 지점으로
											갔는데오늘은 친구와 엽떡을 먹었다. 분모자랑 치즈추가도
											했는데 진짜 맛있었다. 항상 가던 지점이 아니고 다른
											지점으로 갔는데
										</p>
									</Link>
									<div className="mt-1">
										<span className="bg-(--color-surface-overlay) w-auto inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
											오늘의 기분
											<img src={happyMood.src} alt="" width={18} />
										</span>
									</div>
									<div className="mt-3 flex items-center justify-end gap-1">
										<Link
											href={"/diary/1/edit"}
											className="pr-1 relative [&:after]:content-[''] [&:after]:inline-block [&:after]:w-px [&:after]:h-2.5 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:-right-0.25 [&:after]:top-1/2 [&:after]:-translate-y-1/2"
										>
											<button
												type="button"
												className="text-sm text-primary-500"
											>
												수정
											</button>
										</Link>
										<button type="button" className="text-sm text-primary-500">
											삭제
										</button>
									</div>
								</div>
								<div className="p-3 bg-(--color-surface-overlay) rounded-xl mb-2">
									<Link href={"/diary/1"} className="block ">
										<span className="text-primary-300">11일 일요일</span>
										<p className="mt-1 text-primary-100 overflow-hidden text-ellipsis line-clamp-2 wrap-break-word">
											오늘은 친구와 엽떡을 먹었다. 분모자랑 치즈추가도 했는데
											진짜 맛있었다. 항상 가던 지점이 아니고 다른 지점으로
											갔는데오늘은 친구와 엽떡을 먹었다. 분모자랑 치즈추가도
											했는데 진짜 맛있었다. 항상 가던 지점이 아니고 다른
											지점으로 갔는데
										</p>
									</Link>
									<div className="mt-1">
										<span className="bg-(--color-surface-overlay) w-auto inline-flex items-center gap-2 h-7 text-sm text-primary-300 rounded-sm px-2">
											오늘의 기분
											<img src={happyMood.src} alt="" width={18} />
										</span>
									</div>
									<div className="mt-3 flex items-center justify-end gap-1">
										<Link
											href={"/diary/1/edit"}
											className="pr-1 relative [&:after]:content-[''] [&:after]:inline-block [&:after]:w-px [&:after]:h-2.5 [&:after]:bg-primary-500 [&:after]:absolute [&:after]:-right-0.25 [&:after]:top-1/2 [&:after]:-translate-y-1/2"
										>
											<button
												type="button"
												className="text-sm text-primary-500"
											>
												수정
											</button>
										</Link>
										<button type="button" className="text-sm text-primary-500">
											삭제
										</button>
									</div>
								</div>
							</div>
							<div className="mt-10">
								<Button type="button" size="md" variant="primary700" full>
									더보기
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
