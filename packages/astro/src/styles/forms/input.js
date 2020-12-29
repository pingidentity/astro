import { text } from '../variants/text';
import statuses from '../../utils/devUtils/constants/statuses';

// Styles for default input and variants go here.

// Default input styling
export const input = {
  ...text.inputValue,
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
  outline: 'none',
  '&.is-focused': {
    borderColor: 'accent.80',
    boxShadow: 'focus',
  },
  '&::placeholder': text.placeholder,
  '&::-ms-expand': {
    display: 'none',
  },
};

// Example variant input
input.large = {
  ...input,
  lineHeight: '2em',
  height: '4em',
};

// Used to give a blue left border to inputs
input.container = {
  position: 'relative',
  '&:after': {
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    content: '""',
    position: 'absolute',
    bg: 'active',
    width: 3,
    top: 0,
    left: 0,
    bottom: 0,
  },
  '&.is-disabled': {
    // Override global opacity for disabled items because the children will handle their own opacity
    // and it will otherwise stack the opacity effect.
    opacity: 1,
    '&:after': {
      opacity: 0.5,
    },
  },
  [`&.is-${statuses.ERROR}::after`]: {
    bg: 'critical.bright',
  },
  [`&.is-${statuses.SUCCESS}::after`]: {
    bg: 'success.bright',
  },
  [`&.is-${statuses.WARNING}::after`]: {
    bg: 'warning.bright',
  },
};
