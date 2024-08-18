import React, { useEffect, useRef } from 'react';
import { PopupType } from '../../@types/NotesTypes';

const Popup: React.FC<PopupType> = ({
	show,
	title,
	content,
	onClose
}) => {
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Function to handle clicks outside the popup
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				onClose();
			}
		};
		if (show) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [show, onClose]);

	if (!show) {
		return null;
	}

	// Check if content is a React component and omit header/footer if so
	const isComponent = typeof content === 'object' && React.isValidElement(content);

	return (
		<div className="popup-overlay">
			<div ref={popupRef} className={`popup-content ${isComponent ? 'no-padding' : ''}`}>
				{!isComponent && (
					<div className="popup-header">
						<h2>{title}</h2>
						<button className="close-button" onClick={onClose}>
							&times;
						</button>
					</div>
				)}
				<div className="popup-body">
					{content}
				</div>
				{!isComponent && (
					<div className="popup-footer">
						<button className="close-button" onClick={onClose}>
							{'Close'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Popup;
