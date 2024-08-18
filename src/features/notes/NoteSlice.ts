import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SingleNoteSate } from "../../@types/NotesTypes";

interface NotesState {
	pinned: SingleNoteSate[];
	saved: SingleNoteSate[];
}

const initialState: NotesState = {
	pinned: [],
	saved: [],
};

const NotesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		addNotes: (state, action: PayloadAction<SingleNoteSate>) => {
			const newNote = {
				...action.payload,
				id: Date.now().toString(),
			};
			state.saved = [newNote, ...state.saved];
		},
		pinNote: (state, action: PayloadAction<string>) => {
			const noteId = action.payload;
			const savedIndex = state.saved.findIndex((note) => note.id === noteId);

			if (savedIndex !== -1) {
				// Move note from saved to pinned
				const noteToPin = state.saved[savedIndex];
				state.saved.splice(savedIndex, 1);
				state.pinned.push(noteToPin);
			}
		},
		unpinNote: (state, action: PayloadAction<string>) => {
			const noteId = action.payload;
			const savedIndex = state.pinned.findIndex((note) => note.id === noteId);

			if (savedIndex !== -1) {
				// Move note from pinned to saved
				const noteToPin = state.pinned[savedIndex];
				state.pinned.splice(savedIndex, 1);
				state.saved.push(noteToPin);
			}
		},
		deleteSavedNote: (state, action: PayloadAction<string>) => {
			const noteId = action.payload;

			// Remove note from saved
			state.saved = state.saved.filter((note) => note.id !== noteId);
		},
		deletePinnedNote: (state, action: PayloadAction<string>) => {
			const noteId = action.payload;

			// Remove note from saved
			state.pinned = state.pinned.filter((note) => note.id !== noteId);
		},
		updateNote: (state, action: PayloadAction<SingleNoteSate>) => {
			let pinnedNote = state.pinned.findIndex((note) => note.id === action.payload.id);
			let savedNote = state.saved.findIndex((note) => note.id === action.payload.id);

			if (pinnedNote !== -1) {
				state.pinned[pinnedNote] = action.payload;
			} else {
				state.saved[savedNote] = action.payload;
			}	
		},
		removeNotes: () => {
			return initialState;
		},
	},
});

export const {
	addNotes,
	removeNotes,
	pinNote,
	unpinNote,
	deleteSavedNote,
	deletePinnedNote,
	updateNote
} = NotesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default NotesSlice.reducer;
