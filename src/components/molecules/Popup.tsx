import React from 'react';
import { PopupType } from '../../@types/NotesTypes';

const Popup: React.FC<PopupType> = ({
	show,
	title,
	content,
	onClose
}) => {
	if (!show) {
		return null;
	}

	// Check if content is a React component and omit header/footer if so
	const isComponent = typeof content === 'object' && React.isValidElement(content);

	return (
		<div className="popup-overlay">
			<div className={`popup-content ${isComponent ? 'no-padding' : ''}`}>
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
