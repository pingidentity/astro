import { input } from './input';
// Styles for default input and variants go here.

export const textarea = {
  ...input,
  '&.is-unresizable': {
    resize: 'none',
  },
};
