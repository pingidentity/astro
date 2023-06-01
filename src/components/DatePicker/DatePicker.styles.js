import { defaultFocus, input } from '../Input/Input.styles';

const inSlotContainer = {
  ...input.fieldControlWrapper,
  position: 'relative',
  width: 'fit-content',
};

const inputField = {
  ...input,
  width: 'auto',
  pr: 'xl',
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
};

export const containedIcon = {
  position: 'absolute',
  right: 5,
  width: 28,
  height: 28,
  top: '50%',
  transform: 'translateY(-50%)',
};

const segment = {
  '&:focus-visible': {
    outline: '1px solid',
    outlineColor: 'active',
    borderRadius: 2,
  },
};

export default {
  inSlotContainer,
  inputField,
  containedIcon,
  segment,
};
