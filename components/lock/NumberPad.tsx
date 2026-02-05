interface NumberPadProps {
	onNumberClick: (num: number) => void;
	onDelete: () => void;
}

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "cancel", 0, "delete"] as const;

export function NumberPad({ onNumberClick, onDelete }: NumberPadProps) {
	return (
		<div className="w-full h-full grid grid-cols-3 gap-y-6 gap-x-8 px-6">
			{keys.map((key, i) => {
				if (key === "cancel") {
					return (
						<button key={i} className="text-white/70 text-sm">
							취소
						</button>
					);
				}

				if (key === "delete") {
					return (
						<button key={i} onClick={onDelete} className="flex justify-center">
							<img
								src="/images/lock_numberpad_delete.svg"
								alt="삭제"
								className="w-[30px]"
							/>
						</button>
					);
				}

				return (
					<button
						key={i}
						onClick={() => onNumberClick(key)}
						className="text-white text-xl font-medium"
					>
						{key}
					</button>
				);
			})}
		</div>
	);
}
