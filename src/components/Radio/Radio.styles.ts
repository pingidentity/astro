// Styles for default radio and variants go here.

import { isSafari } from '../../styles/safariAgent.js';
import { focusWithCroppedOutline } from '../Button/Buttons.styles';

// Default radio
const base = {
  width: 20,
  height: 20,
  color: 'active',
  mr: 'xs',
  // override the default focus styling
  'input:focus ~ &': {
    bg: 'transparent',
    boxSizing: 'border-box',
  },
  'input ~ &.is-focused':
  /* istanbul ignore next */
  isSafari ? {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'focus',
    boxSizing: 'border-box',
    transform: 'scale(1.1)',
    transformOrigin: 'center',
  }
  /* istanbul ignore next */
    : focusWithCroppedOutline,
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
