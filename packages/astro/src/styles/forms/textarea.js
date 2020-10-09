// Styles for default input and variants go here.

// Default input styling
export const textarea = {
  appearance: 'none',
  boxSizing: 'border-box',
  lineHeight: '1em',
  textOverflow: 'ellipsis',
  bg: 'white',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'white',
  borderRadius: 2,
  boxShadow: 'standard',
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

