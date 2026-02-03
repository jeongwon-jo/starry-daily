import React from "react";

interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
	label?: string;
}

export const ToggleSwitch = ({
	checked,
	onChange,
	disabled = false,
	label,
}: ToggleProps) => {
	return (
		<label className="inline-flex items-center cursor-pointer space-x-2">
			{label && <span className="text-gray-600 font-medium">{label}</span>}
			<input
				type="checkbox"
				className="sr-only"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				disabled={disabled}
			/>
			<div
				className={`w-12 h-7 flex items-center bg-[rgb(255,255,255,0.1)] rounded-full p-1 duration-300 ease-in-out ${
					checked ? "bg-[rgb(255,255,255,0.5)]" : "bg-[rgb(255,255,255,0.1)]"
				} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				<div
					className={`bg-white size-5 rounded-full transform duration-300 ease-in-out ${
						checked ? "translate-x-5" : "translate-x-0"
					}`}
				/>
			</div>
		</label>
	);
};
