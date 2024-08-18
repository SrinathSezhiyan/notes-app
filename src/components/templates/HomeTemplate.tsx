import React from "react";
import AddNote from "../organisms/AddNote";
import ViewNotes from "../organisms/ViewNotes";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePinnedNote,
	deleteSavedNote,
	pinNote,
	selectNotes,
	unpinNote
} from "../../features/notes/NoteSlice";

const HomeTemplate: React.FC = () => {
	const notes = useSelector(selectNotes);
	const dispatch = useDispatch();

	// Handling on click of pin icon
	const handlePinOrUnPin = (id: string | undefined, type: string) => {
		if (id) {
			if (type == 'pinned') {
				dispatch(unpinNote(id))
			} else {
				dispatch(pinNote(id))
			}
		}
	}

	// Handling on click of delete
	const handleDelete = (id: string | undefined, type: string) => {
		if (id) {
			if (type == 'pinned') {
				dispatch(deletePinnedNote(id))
			} else {
				dispatch(deleteSavedNote(id))
			}
		}
	}

	return (
		<div className="home-template">
			<AddNote />
			{notes.pinned.length > 0 && (
				<div className="notes-section">
					<h2>{'Pinned'}</h2>
					<ViewNotes
						notes={notes.pinned}
						type={'pinned'}
						handleDelete={handleDelete}
						handlePinOrUnpin={handlePinOrUnPin}
					/>
				</div>
			)}
			{notes.saved.length > 0 && (
				<div className="notes-section">
					<h2>{'Others'}</h2>
					<ViewNotes
						notes={notes.saved}
						type={'saved'}
						handleDelete={handleDelete}
						handlePinOrUnpin={handlePinOrUnPin}
					/>
				</div>
			)}
		</div>
	);
};

export default HomeTemplate;
