import BottleImg from "@/assets/images/sub/bottle.png";
import StarImg from "@/assets/images/sub/star.png";

export default function Splash() {
  return (
		<div className="flex items-center justify-center w-full h-dvh">
			<div className="flex flex-col justify-between w-full h-full py-12">
				<div></div>
				<div className="flex flex-col items-center justify-center gap-2">
					<div className="relative w-[73px] mx-auto">
						<img
							src={BottleImg.src}
							alt="bottle"
							className="w-full animate-bottle"
						/>
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-12 ">
							<img src={StarImg.src} alt="star" className="animate-star" />
						</div>
					</div>
					<p className="font-bold text-primary-100 text-2xl">별별하루</p>
				</div>
				<p className="text-primary-300 text-base text-center">
					소중한 하루를 정리하며 행운의 별을 모아보세요!
				</p>
			</div>
		</div>
	);
}
