import { focusWithCroppedOutline } from '../Button/Buttons.styles';
// Styles for default radio and variants go here.

// Default radio
const base = {
  width: 20,
  height: 20,
  color: 'active',
  mr: 'xs',
  // override the default focus styling
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    ...focusWithCroppedOutline,
  },
};

const outerContainer = {
  '.is-horizontal &': {
    mr: '15px',
  },
  // unset opacity to not affect the child element (label) opacity
  '&.is-disabled': {
    opacity: 'unset',
  },
};

const controlWrapper = {
  // unset opacity to not affect the child element (radio) opacity
  '&.is-disabled': {
    opacity: 'unset',
  },
};

// Used to give a border to radio elements
const container = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'active',
  borderRadius: 3,
  padding: 'md',
  mb: 'md',
};

// Used to add spacing for content shown when a radio is checked
const checkedContent = {
  pb: 'sm',
  pl: 'lg',
  color: 'text.secondary',
  fontSize: 'md',
};

export default {
  base,
  outerContainer,
  controlWrapper,
  container,
  checkedContent,
};
