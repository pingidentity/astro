// Styles for default radio and variants go here.

import { focusWithCroppedOutline } from '../variants/buttons';

// Default radio
export const radio = {
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

export const radioField = {
  '.is-horizontal &': {
    mr: '15px',
  },
};
