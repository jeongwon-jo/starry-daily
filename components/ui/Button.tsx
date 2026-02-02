"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
	| "primary600"
	| "primary700"
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variant;
  size?: Size;
  full?: boolean;
}

const variantStyles: Record<Variant, string> = {
	primary600: "bg-primary-600 text-primary-100",
	primary700: "bg-primary-700 text-primary-100",
};

const sizeStyles: Record<Size, string> = {
	sm: "h-10 text-base",
	md: "h-11 text-base",
	lg: "h-12 text-base",
};

export const Button = ({
	children,
	className,
	variant = "primary700",
	size = "md",
	disabled,
	full,
	onClick,
	...props
}: ButtonProps) => {
	return (
		<button
			suppressHydrationWarning
			className={`inline-block text-center rounded-full ${variantStyles[variant]} ${full ? "w-full" : ""} ${
				sizeStyles[size]
			} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
};
