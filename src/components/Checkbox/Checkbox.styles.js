import { focus } from '../../styles/colors';

// Styles for default checkbox and variants go here.

// Default checkbox
export const checkbox = {
  color: 'active',
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    boxShadow: `inset 0px 0px 0px 1px ${focus}`,
  },
  'input ~ &.is-disabled': {
    color: 'neutral.80',
  },

  '&.is-disabled': {
    opacity: '1',
  },
};
