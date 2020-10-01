// Styles for default label and variants go here.
import { text } from '../variants/text';

// Default label
export const label = {
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
  ...text.label,
};

export const radioLabel = {
  cursor: 'pointer',
  alignItems: 'center',
};

/*
FIXME: Label uses 'flex' by default, see if there is a better alternative to using '!important' here
*/
export const checkboxLabel = {
  display: 'inline-flex !important',
  width: 'auto',
  alignItems: 'center',
  cursor: 'pointer',
};
