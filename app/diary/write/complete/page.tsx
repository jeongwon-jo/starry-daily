"use client";

import { Header } from "@/components/layout";
import { useEffect, useState } from "react";

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
		rotate: -10,
	},
	{
		width: 106,
		text: "“행운이 찾아올거야!”",
		image: "/images/diary_complete_04.png",
		rotate: 0,
	},
	{
		width: 111,
		text: "“별을 다 모았어!\n오늘 하루도 고생했어”",
		image: "/images/diary_complete_05.png",
		rotate: 0,
	},
];


export default function DiaryWriteCompletePage() {
	const [step, setStep] = useState(2);
	const [phase, setPhase] = useState<"fold" | "show">("fold");
	const current = STEPS[step];
	const prevStep = step > 0 ? step - 1 : 0;

	const prevRotate = STEPS[prevStep].rotate;

	useEffect(() => {
		if (step >= STEPS.length - 1) return;

		const timer = setTimeout(() => {
			setStep((prev) => prev + 1);
		}, 3000);

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
						<div className="w-full flex justify-center h-120">
							<div className="flex jutify-center">
								{step == 2 ? (
									<div className="relative w-[148px] h-[148px]">
										{phase === "fold" && (
											<img
												src="/images/diary_complete_02.png"
												alt=""
												className="absolute inset-0 animate-paperFold origin-right"
												onAnimationEnd={() => setPhase("show")}
											/>
										)}

										{phase === "show" && (
											<img
												src="/images/diary_complete_03.png"
												alt=""
												className="absolute inset-0 animate-imageReveal"
											/>
										)}
									</div>
								) : (
									<img
										key={step}
										src={current.image}
										alt=""
										className="object-contain animate-imageChange transition-all duration-300"
										width={current.width}
										style={
											{
												"--from-rotate": `${prevRotate}deg`,
												"--to-rotate": `${current.rotate}deg`,
											} as React.CSSProperties
										}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
