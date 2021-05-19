import { input } from './input';
// Styles for default input and variants go here.

export const textarea = {
  ...input,
  height: 'unset',
  '&.is-unresizable': {
    resize: 'none',
  },
  '.is-float-label &': {
    height: 'unset',
  },
};
