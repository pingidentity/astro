// Styles for default select and variants go here.
import { input } from './input';
import { text } from '../variants/text';

// Default select
export const select = {
  ...input,
  lineHeight: 'unset',
  display: 'flex',
  alignItems: 'center',
  '&.is-focused': {
    boxShadow: 'focus',
  },
};

select.listBoxPopup = {
  position: 'absolute',
  width: '100%',
  padding: 0,
  listStyle: 'none',
  border: 'none',
  background: 'white',
  outline: 'none',
  boxShadow: 'standard',
};

select.option = {
  ...text.base,
  px: 'md',
  py: 'sm',
  alignItems: 'center',
  outline: 'none',
  cursor: 'pointer',
  '&.is-selected': {
    ...text.inputValue,
    pl: 0,
  },
  '&.is-focused': {
    color: 'white',
    bg: 'active',
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
