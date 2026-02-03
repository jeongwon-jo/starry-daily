interface IconSearchProps {
	size?: number;
	className?: string;
}

export const IconSearch = ({ size = 20, className }: IconSearchProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.99975 15C12.5895 15 15.4995 12.0898 15.4995 8.49998C15.4995 4.91014 12.5895 2 8.99975 2C5.41004 2 2.5 4.91014 2.5 8.49998C2.5 12.0898 5.41004 15 8.99975 15Z"
				stroke="currentColor"
				strokeWidth={2}
				strokeMiterlimit={10}
			/>
			<path
				d="M17.7927 18.7071C18.1832 19.0976 18.8164 19.0976 19.2069 18.7071C19.5974 18.3166 19.5974 17.6834 19.2069 17.2929L18.4998 18L17.7927 18.7071ZM13.5 13L12.7929 13.7071L17.7927 18.7071L18.4998 18L19.2069 17.2929L14.2071 12.2929L13.5 13Z"
				fill="currentColor"
			/>
		</svg>
	);
};
