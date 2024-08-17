import React, { ReactNode, MouseEvent } from 'react';

interface Props {
	title?: ReactNode;
	handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
	children?: ReactNode;
	id?: string;
	hoverText?: string;
	name?: string;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({
	title,
	handleClick,
	id,
	className = '',
	disabled = false,
	hoverText = '',
	children,
	name,
	type = 'button'
}) => {
	return (
		<button
			type={type}
			title={hoverText ?? title}
			className={className}
			id={id}
			onClick={handleClick}
			disabled={disabled}
			name={name}
		>
			{children ?? title}
		</button>
	);
};

export default Button;
