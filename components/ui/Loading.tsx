import BottleImg from "@/assets/images/sub/bottle.png";
import StarImg from "@/assets/images/sub/star.png";
import Image from "next/image";

export function Loading({ className }: { className?: string }) {
  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative w-[50px] mx-auto">
          <Image
            src={BottleImg}
            alt="bottle"
            className="w-full animate-bottle"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-8">
            <Image src={StarImg} alt="star" className="animate-star" />
          </div>
        </div>
      </div>
    </div>
  );
}
