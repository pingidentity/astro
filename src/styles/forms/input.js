import { text } from '../variants/text';

// Styles for default input and variants go here.

// Default input styling
export const input = {
  ...text.base,
  appearance: 'none',
  boxSizing: 'border-box',
  lineHeight: '1em',
  textOverflow: 'ellipsis',
  bg: 'white',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'neutral.80',
  borderRadius: 2,
  px: 'md',
  py: 'sm',
  width: '100%',
  '&:focus': {
    outline: 'none',
    borderColor: 'accent.80',
  },
  '&::placeholder': {
    fontStyle: 'italic',
    fontWeight: 300,
    color: 'text.secondary',
  },
  '&::-ms-expand': {
    display: 'none',
  },
};

// Example variant input
export const largeInput = {
  ...input,
  lineHeight: '2em',
  height: '4em',
};
