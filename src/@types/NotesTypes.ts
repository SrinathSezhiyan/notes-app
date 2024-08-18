import { ReactNode } from "react";

export interface SingleNoteSate {
  id?: string;
  title: string;
  content: string;
  color: string;
  image: string;
}

export interface AddNoteState {
  form: SingleNoteSate;
  expanded: boolean;
}

export interface CardsType {
  note: SingleNoteSate;
  type: string;
  handleClick: (id: string | undefined) => void;
  handlePinOrUnpin: (id: string | undefined, type: string) => void;
  handleDelete: (id: string | undefined, type: string) => void;
}

export interface ViewNotesType {
  notes: SingleNoteSate[];
  type: string;
  handlePinOrUnpin: (id: string | undefined, type: string) => void;
  handleDelete: (id: string | undefined, type: string) => void;
}

export interface PopupType {
  show: boolean;
  title?: string;
  content: ReactNode;
  onClose: () => void;
}

export interface AddNoteType {
  modal?: boolean;
  note?: SingleNoteSate;
  handlePopup?: () => void;
}

export interface FileFieldType {
  name: string;
  accept: string;
  hovertext?: string;
  maxSize: number;
  icon: ReactNode;
}
