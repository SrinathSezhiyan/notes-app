import React, { useRef } from 'react';

const style = {};

interface Props {
	id?: string;
	className?: string;
	value?: string;
	isDisabled?: boolean;
	placeholder?: string;
	customStyle?: React.CSSProperties;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleClick?: (event: React.FocusEvent<HTMLInputElement>) => void;
	handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleBlur?: () => void;
	name?: string;
	readOnly?: boolean;
	autoComplete?: boolean;
	inputRef?: React.RefObject<HTMLInputElement> | null;
}

const InputTextFieldAtom: React.FC<Props> = ({
	id = '',
	className = '',
	value = '',
	isDisabled = false,
	placeholder = '',
	customStyle = {},
	handleChange,
	handleClick,
	name = '',
	readOnly = false,
	handleKeyDown,
	autoComplete,
	handleBlur,
	inputRef = null,
}) => {
	const defaultRef = useRef<HTMLInputElement>(null);
	const resolvedRef = inputRef || defaultRef;

	return (
		<input
			style={{ ...style, ...customStyle }}
			id={id}
			type='text'
			className={className}
			disabled={isDisabled}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={handleChange}
			onFocus={handleClick}
			onBlur={handleBlur}
			readOnly={readOnly}
			onKeyDown={handleKeyDown}
			autoComplete={autoComplete ? '' : 'off'}
			ref={inputRef ?? resolvedRef}
		/>
	);
};

export default InputTextFieldAtom;
