interface HeaderBackIconProps {
	size?: number;
	className?: string;
}

export const HeaderBackIcon = ({ size = 20, className }: HeaderBackIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
			className={className}
		>
			<path
				d="M14 18L6 10L14 2"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
