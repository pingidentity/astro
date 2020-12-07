// Styles for default select and variants go here.
import { input } from './input';

// Default select
export const select = {
  ...input,
  '&.is-focused': {
    boxShadow: 'focus',
  },
};

select.transparent = {
  'select': {
    bg: 'transparent',
  },
  '> div:after': {
    bg: 'transparent',
  },
};
