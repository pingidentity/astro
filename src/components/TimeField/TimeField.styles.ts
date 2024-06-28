import { defaultFocus, input } from '../Input/Input.styles';

const inputField = {
  ...input,
  minWidth: '100px',
  width: 'auto',
  position: 'relative',
  '&:focus-within:not(.is-read-only)': {
    ...defaultFocus,
  },
  ':hover': {
    cursor: 'text',
  },
  '&.is-read-only': {
    backgroundColor: 'accent.95',
    border: 'none',
  },
  '&.is-24-hour': {
    minWidth: '0px',
  },
};

const segment = {
  '&:focus-visible': {
    outline: '1px solid',
    outlineColor: 'active',
    borderRadius: 4,
  },
};

export default {
  inputField,
  segment,
};
