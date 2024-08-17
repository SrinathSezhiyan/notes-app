import Image from "../static/icons/Image"

export const AddNoteInitialState = {
	form: {
		title: '',
		content: '',
		color: '',
		image: ''
	},
	expanded: false
}

export const FileField = {
	name: 'image',
  accept: '.png, .jpg, .jpeg, gif',
  hovertext: 'Image',
  maxSize: 2 * 1024 * 1024,
  icon: <Image />
}