
import React from 'react';

interface InputProps {
	id?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: string;
	name?: string;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	className?: string;
}

export const Input = React.memo(
	React.forwardRef<HTMLInputElement, InputProps>(
		(
			{
				id,
				value,
				onChange,
				onKeyDown,
				placeholder = "",
				type = "text",
				name = "",
				disabled,
				readOnly,
				required,
				className,
			},
			ref,
		) => {
			return (
				<input
					id={id}
					ref={ref}
					type={type}
					className={`form-control ${
						disabled ? "bg-primary-900" : ""
					} ${className}`}
					placeholder={placeholder}
					onChange={onChange}
					name={name}
					disabled={disabled}
					readOnly={readOnly}
					required={required}
					value={value}
					onKeyDown={onKeyDown}
				/>
			);
		},
	),
);

