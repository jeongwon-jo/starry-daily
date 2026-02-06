"use client";

import { useEffect } from "react";
import { Button } from "./Button";
import StarImg from "@/assets/images/sub/message_star.png";

interface ModalProps {
	open: boolean;
	message: string;
	subMessage?: string;
	onClose: () => void;
}

export const MessageModal = ({ open, message, subMessage,  onClose }: ModalProps) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}
		return () => {
			document.body.style.overflowY = "auto";
		};
	}, [open]);

	if (!open) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-[#00000040] z-1000">
			<div className="bg-gray-50 rounded-xl p-3 absolute left-1/2 top-1/2 -translate-1/2">
				<div className="w-75">
					<div className="flex justify-center">
						<img src={StarImg.src} alt="star" className="w-10 h-10" />
					</div>

					<p className="text-gray-700 text-center text-base mt-4">{message}</p>
				</div>
				<div className="mt-6">
					<Button
						type="button"
						size="sm"
						variant="primary700"
						full
						onClick={onClose}
					>
						확인
					</Button>
				</div>
			</div>
		</div>
	);
};
