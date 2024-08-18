import React, { useState } from "react";
import Card from "../molecules/Card";
import { SingleNoteSate, ViewNotesType } from "../../@types/NotesTypes";
import Popup from "../molecules/Popup";
import AddNote from "./AddNote";

const ViewNotes: React.FC<ViewNotesType> = ({
	notes,
	type,
	handlePinOrUnpin,
	handleDelete
}) => {
	const [popupNote, setPopupNote] = useState<SingleNoteSate>();

	const handlePopup = (id: string | undefined) => {
		const note = notes.find((note: SingleNoteSate) => note.id === id);
		setPopupNote(note);
	}

	return (
		<div className="view-notes">
			{notes.map((note: SingleNoteSate) => (
				<Card
					key={note.id}
					note={note}
					type={type}
					handleClick={handlePopup}
					handlePinOrUnpin={handlePinOrUnpin}
					handleDelete={handleDelete}
				/>
			))}
			<Popup
				show={popupNote !== undefined}
				content={
					<AddNote
						modal={true}
						note={popupNote}
						handlePopup={() => setPopupNote(undefined)}
					/>
				}
				onClose={() => setPopupNote(undefined)}
			/>
		</div>
	);
};

export default ViewNotes;
