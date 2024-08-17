import React, { useEffect, useRef, useState } from "react";
import { CardsType } from "../../@types/NotesTypes";
import More from "../../static/icons/More";
import Delete from "../../static/icons/Delete";
import Pin from "../../static/icons/Pin";
import UnPin from "../../static/icons/UnPin";
import Button from "../atoms/Button";
import ImageField from "../atoms/ImageField";

const Card: React.FC<CardsType> = ({
	note,
	handlePinOrUnpin,
	handleDelete,
	handleClick,
	type
}) => {
	const [isOverflowing, setIsOverflowing] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Check if the content exceeds the maximum height
		if (contentRef?.current?.scrollHeight && contentRef?.current?.scrollHeight > 120) {
			setIsOverflowing(true);
		}
	}, []);

	return (
		<div className="note" style={{ backgroundColor: note.color }} onClick={() => handleClick(note.id)}>
			{note.title && <div className="note-title">{note.title}</div>}
			<div ref={contentRef} className="note-content">
				{note.content}
			</div>
			{note.image && (
				<ImageField
					value={note.image}
					altText={'Notes-image'}
				/>
			)}
			<div className="note-icons">
				<Button
					className="icon"
					hoverText={`${type === 'pinned' ? 'Unpin note' : 'Pin note'}`}
					handleClick={(event) => {
						event.stopPropagation();
						handlePinOrUnpin(note.id, type)
					}}
				>
					{type === 'pinned' ? <UnPin /> : <Pin />}
				</Button>
				<Button
					className="icon"
					hoverText={'Delete note'}
					handleClick={(event) => {
						event.stopPropagation(); // Prevents the click from bubbling up
						handleDelete(note.id, type);
					}}
				>
					<Delete />
				</Button>
			</div>
			{isOverflowing && (
				<Button
					className="icon"
					hoverText="More"
				>
					<More />
				</Button>
			)}
		</div>
	);
};

export default Card;