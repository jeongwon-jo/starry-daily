import { MAX_LENGTH } from "@/app/lock/page";

interface PasswordStarsProps {
	value: number;
}

export function PasswordStars({ value }: PasswordStarsProps) {
	return (
		<div className="flex justify-center gap-6 mt-6">
			{Array.from({ length: MAX_LENGTH }).map((_, i) => (
				<div key={i} className="w-7 h-7 flex items-center justify-center">
					<img
						src={
							value > i
								? "/images/lock_password_star.svg"
								: "/images/lock_password_dot.svg"
						}
						alt=""
						width={value > i ? 32 : 14}
						height={value > i ? 32 : 14}
					/>
				</div>
			))}
		</div>
	);
}