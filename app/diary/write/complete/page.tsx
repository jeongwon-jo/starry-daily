"use client";

import { Header } from "@/components/layout";
import { useEffect, useState } from "react";
import star1 from "@/assets/images/sub/fold_complete_star_01.svg";
import star2 from "@/assets/images/sub/fold_complete_star_02.svg";
import star3 from "@/assets/images/sub/fold_complete_star_03.svg";
import star4 from "@/assets/images/sub/fold_complete_star_04.svg";
import star5 from "@/assets/images/sub/fold_complete_star_05.svg";

const COMPLETE_STARS = [
	{ src: star1, left: "127%", top: "20%", width: 26, height: 26 },
	{ src: star3, left: "-57%%", top: "79%", width: 26, height: 26 },
	{ src: star2, left: "167%", top: "17%", width: 20, height: 20 },
	{ src: star4, left: "-34%", top: "94%", width: 20, height: 20 },
	{ src: star5, left: "38%", top: "86%", width: 16, height: 16 },
];

const STEPS = [
	{
		width: 123,
		text: "“행운이 찾아올거야!”",
		image: "/images/diary_complete_01.png",
		rotate: 0,
	},
	{
		width: 116,
		text: "“나쁜일은 잊고, 좋은 날만 올거야”",
		image: "/images/diary_complete_02.png",
		rotate: -35,
	},
	{
		width: 148,
		text: "“행운이 찾아올거야!”",
		image: "/images/diary_complete_03.png",
		rotate: -35,
	},
	{
		width: 106,
		text: "“행운이 찾아올거야!”",
		image: "/images/diary_complete_04.png",
		rotate: 65,
	},
	{
		width: 111,
		text: "“별을 다 모았어!\n오늘 하루도 고생했어”",
		image: "/images/diary_complete_05.png",
		rotate: 65,
	},
];


export default function DiaryWriteCompletePage() {
	const [step, setStep] = useState(0);
	const [phase, setPhase] = useState<"fold" | "show">("fold");
	const current = STEPS[step];
	const [prevStep, setPrevStep] = useState<number>(0);

	useEffect(() => {
		if (step >= STEPS.length - 1) return;

		const timer = setTimeout(() => {
			setPrevStep(step); // 이전 이미지 유지
			setStep(step + 1);
		}, 2000);

		return () => clearTimeout(timer);
	}, [step]);

	
	return (
		<div className="w-full min-h-dvh">
			<Header type="default"></Header>
			<div className="container">
				<div className="w-full h-[calc(100dvh-48px)] bg-[url(../assets/images/sub/main_bg.png)] bg-no-repeat bg-cover bg-position-[left_top_65px] flex items-center justify-center">
					<div>
						<p
							key={step}
							className="text-xl text-center text-primary-100 h-14 animate-textFade"
						>
							{current.text}
						</p>
						<div className="w-full flex justify-center h-80">
							<div className="flex jutify-center h-full">
								{step == 2 ? (
									<div className="relative w-[111px] h-full flex items-center">
										{phase === "fold" && (
											<img
												src="/images/diary_complete_02.png"
												alt=""
												className="animate-paperFold -rotate-[35deg]"
												onAnimationEnd={() => setPhase("show")}
											/>
										)}

										{phase === "show" && (
											<img
												src="/images/diary_complete_03.png"
												alt=""
												className="animate-imageReveal"
											/>
										)}
									</div>
								) : (
									<div className="relative w-[111px] h-full flex items-center justify-center">
										{step === STEPS.length - 1 && (
											<>
												<div
													className="
													absolute inset-1/2 -translate-x-1/2 -translate-y-1/2
													w-[264px] h-[264px]
													rounded-full
													bg-[#fff]/30
													blur-[80px]
													animate-fadeInSlow
												"
												/>
												<div className="absolute inset-0 pointer-events-none">
													{COMPLETE_STARS.map((star, i) => (
														<span
															key={i}
															className="absolute -translate-x-1/2 -translate-y-1/2 animate-starPop"
															style={{
																width: star.width,
																height: star.height,
																left: star.left,
																top: star.top,
																"--star-delay": `${i * 0.22}s`,
															} as React.CSSProperties}
														>
															<img
																src={star.src.src}
																alt=""
																className="w-full h-full object-contain"
															/>
														</span>
													))}
												</div>
											</>
										)}
										{prevStep !== null && (
											<img
												key={`prev-${step}`}
												src={STEPS[prevStep].image}
												alt=""
												className="absolute object-contain animate-fadeOutSlow"
												width={STEPS[prevStep].width}
												style={
													{
														"--from-rotate": `${STEPS[prevStep].rotate}deg`,
														"--to-rotate": `${current.rotate}deg`,
													} as React.CSSProperties
												}
											/>
										)}

										<img
											key={`current-${step}`}
											src={current.image}
											alt=""
											className="absolute object-contain animate-fadeInSlow"
											width={current.width}
											style={
												{
													"--from-rotate": `${STEPS[prevStep].rotate}deg`,
													"--to-rotate": `${current.rotate}deg`,
												} as React.CSSProperties
											}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
