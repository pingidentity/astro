import { text } from '../variants/text';
import statuses from '../../utils/devUtils/constants/statuses';

// Styles for default input and variants go here.

const activeFloatLabel = {
  pt: 'md',
  pb: 'xs',
};

// Default input styling
export const input = {
  ...text.inputValue,
  appearance: 'none',
  boxSizing: 'border-box',
  lineHeight: '1.25em',
  height: '40px',
  textOverflow: 'ellipsis',
  paddingRight: '100px',
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
  '.is-float-label &': {
    height: '45px',
  },
  '.is-float-label-active &': {
    ...activeFloatLabel,
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

input.small = {
  ...input,
  height: '28px',
  pb: '2px,',
  pt: '2px',
  pl: 'sm',
  pr: 'sm',
};

input.wrapper = {
  position: 'relative',
  '&.is-left-label': {
    display: 'inline-grid',
    gridTemplateRows: 'auto auto',
  },
  '> .is-default': {
    width: '100%',
  },
};

// Used to give a blue left border to inputs
input.container = {
  position: 'relative',
  height: 'max-content',
  '> input': {
    borderLeftWidth: 0,
  },
  '> button': {
    borderLeftWidth: 0,
  },
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
  '&.has-no-status-indicator > input': {
    borderLeftWidth: 1,
  },
  '&.has-no-status-indicator > button': {
    borderLeftWidth: 1,
  },
  '&.has-no-status-indicator:after': {
    width: 0,
  },
  '&.is-disabled': {
    // Override global opacity for disabled items because the children will handle their own opacity
    // and it will otherwise stack the opacity effect.
    opacity: 1,
    '&:after': {
      opacity: 0.5,
    },
  },
  '&.is-read-only': {
    '> input': {
      backgroundColor: 'accent.95',
      border: 'none',
    },
    '&:after': {
      display: 'none',
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

input.containedIcon = {
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

input.multivaluesWrapper = {
  ...input.container,
  bg: 'white',
  borderColor: 'neutral.80',
  borderStyle: 'solid',
  borderWidth: 1,
  flexDirection: 'row!important',
  flexWrap: 'wrap',
  left: 3,
  p: 10,
  pl: 12,
  '&.has-no-status-indicator': {
    left: 0,
  },
  '&:after': {
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    content: '""',
    position: 'absolute',
    bg: 'active',
    width: 3,
    top: 0,
    left: -3,
    bottom: 0,
  },
  '> input': {
    border: 'none',
    flex: 1,
    height: 30,
    lineHeight: '100%',
    p: 5,
    '&.is-focused': {
      boxShadow: 'none',
    },
  },
};

input.numberField = {
  ...input,
  pr: '27px',
};
