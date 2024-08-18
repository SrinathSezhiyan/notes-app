import React, { useRef } from 'react';

const style = {};

interface InputTextAreaFieldProps {
	id?: string;
	className?: string;
	value?: string;
	isDisabled?: boolean;
	placeholder?: string;
	customStyle?: React.CSSProperties;
	handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleClick?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	handleBlur?: () => void;
	name?: string;
	rows?: number;
	inputRef?: React.RefObject<HTMLTextAreaElement> | null;
}

const InputTextAreaFieldAtom: React.FC<InputTextAreaFieldProps> = ({
	id = '',
	className = '',
	value = '',
	isDisabled = false,
	placeholder = '',
	customStyle = {},
	handleChange,
	handleClick,
	handleBlur,
	name = '',
	rows = 3,
	inputRef = null,
}) => {
	const defaultRef = useRef<HTMLTextAreaElement>(null);
	const resolvedRef = inputRef || defaultRef;

	return (
		<textarea
			ref={inputRef ?? resolvedRef}
			id={id}
			style={{ ...style, ...customStyle }}
			className={className}
			disabled={isDisabled}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={handleChange}
			onFocus={handleClick}
			onBlur={handleBlur}
			rows={rows}
		/>
	);
};

export default InputTextAreaFieldAtom;

