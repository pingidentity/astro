// Styles for default label and variants go here.
import { text } from '../variants/text';

// Default label
export const label = {
  ...text.label,
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
};

// Variants below

label.indicator = {
  color: 'red',
  ml: 5,
};

label.radio = {
  ...text.base,
  cursor: 'pointer',
  alignItems: 'center',
  mb: 'xs',
};

// NOTE: Rebass label adds 'flex' after other styles, so we have to use !important to override it
label.checkbox = {
  ...text.base,
  display: 'inline-flex !important',
  width: 'auto',
  alignItems: 'center',
  cursor: 'pointer',
};
