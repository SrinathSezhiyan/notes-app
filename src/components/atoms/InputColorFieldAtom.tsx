import React, { ChangeEvent } from 'react';

const style = {};

interface Props {
	className?: string;
	value?: string;
	isDisabled?: boolean;
	placeholder?: string;
	customStyle?: React.CSSProperties;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	parentDivClassName?: string;
}

const InputColorFieldAtom: React.FC<Props> = ({
	className = '',
	value = '',
	isDisabled = false,
	placeholder = '',
	customStyle = {},
	handleChange,
	name = '',
	parentDivClassName = 'color-div',
}) => {
	return (
		<div className={parentDivClassName}>
			<input
				style={{ ...style, ...customStyle }}
				type={'color'}
				className={className}
				disabled={isDisabled}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputColorFieldAtom;
