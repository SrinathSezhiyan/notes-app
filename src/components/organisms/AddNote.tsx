import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import InputTextFieldAtom from "../atoms/InputTextFieldAtom";
import InputTextAreaFieldAtom from "../atoms/InputTextAreaFieldAtom";
import Button from "../atoms/Button";
import { AddNoteState, AddNoteType, FileFieldType } from "../../@types/NotesTypes";
import { AddNoteInitialState, FileField } from "../../constants/NotesStates";
import { useDispatch } from "react-redux";
import { addNotes, updateNote } from "../../features/notes/NoteSlice";
import InputColorFieldAtom from "../atoms/InputColorFieldAtom";
import FileUpload from "../molecules/FileUpload";
import ImageField from "../atoms/ImageField";

const AddNote: React.FC<AddNoteType> = ({
	modal,
	handlePopup,
	note
}) => {
	const dispatch = useDispatch();
	const [state, setState] = useState<AddNoteState>(AddNoteInitialState);
	const formRef = useRef<HTMLFormElement>(null);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let { name, value } = e.target;
		setState((prevState: AddNoteState) => ({
			...prevState,
			form: {
				...prevState.form,
				[name]: value
			}
		}));

		if (state.expanded && e.target instanceof HTMLTextAreaElement) {
			e.target.style.height = "auto"; // Reset the height
			e.target.style.height = `${Math.min(e.target.scrollHeight, window.innerHeight * 0.78)}px`; // Expand up to 80% of the viewport height
		}
	}

	// Handle click outside of the form
	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setState((prevState: AddNoteState) => ({
				...prevState,
				expanded: false
			}));
		}
	};

	// Add event listener for clicks
	useEffect(() => {
		if (modal && note) {
			setState((prevState: AddNoteState) => ({
				...prevState,
				form: note,
				expanded: modal ?? false
			}));
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTextAreaClick = () => {
		setState((prevState: AddNoteState) => ({
			...prevState,
			expanded: true
		}));
	}

	const handleSubmit = () => {
		if (state.form.content !== '') {
			if (modal) {
				dispatch(updateNote(state.form))
			} else {
				dispatch(addNotes(state.form));
			}
			setState(AddNoteInitialState);
			handlePopup && handlePopup();
		}
	}

	const handleClear = () => {
		setState(AddNoteInitialState);
		handlePopup && handlePopup();
	}

	const handleFileUpload = (file: File, field: FileFieldType) => {
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setState((prevState) => ({
					...prevState,
					form: {
						...prevState.form,
						[field.name]: reader.result as string
					}
				}));
			};
			reader.readAsDataURL(file);
		}
	}

	return (
		<form ref={formRef} className={`${modal ? 'create-note-modal' : 'create-note'}`} style={{ backgroundColor: state.form.color }}>
			{state.expanded && (
				<InputTextFieldAtom
					name="title"
					handleChange={handleChange}
					value={state.form.title}
					placeholder="Title"
				/>
			)}
			<InputTextAreaFieldAtom
				className={state.expanded ? 'expanded-text-area' : ''}
				name="content"
				handleClick={handleTextAreaClick}
				handleChange={handleChange}
				value={state.form.content}
				placeholder="Take a note..."
				rows={state.expanded ? 3 : 1}
			/>
			{state.expanded && (
				<>
					{state.form.image && (
						<ImageField
							value={state.form.image}
							altText={'Notes-image'}
						/>
					)}
					<div className="note-footer">
						<div className="file-color">
							<InputColorFieldAtom
								name="color"
								value={state.form.color}
								handleChange={handleChange}
							/>
							<FileUpload
								field={FileField}
								handleChange={handleFileUpload}
							/>
						</div>
						<div className="create-button-group">
							<Button
								className="clear_button"
								handleClick={handleClear}
								title={'Clear'}
							/>
							<Button
								className="save_button"
								handleClick={handleSubmit}
								title={'Save'}
							/>
						</div>
					</div>
				</>
			)}
		</form>
	);
};

export default AddNote;
