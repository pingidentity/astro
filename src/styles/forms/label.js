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
  mb: 'xs',
  ...text.base,
};

// NOTE: Rebass label adds 'flex' after other styles, so we have to use !important to override it
export const checkboxLabel = {
  display: 'inline-flex !important',
  width: 'auto',
  alignItems: 'center',
  cursor: 'pointer',
};
