// Styles for default select and variants go here.
import { input } from './input';
import { text } from '../variants/text';

const activeFloatLabel = {
  pt: 'md',
  pb: 'xs',
};

// Default select
export const select = {
  ...input,
  display: 'flex',
  alignItems: 'center',
  '&.is-focused': {
    boxShadow: 'focus',
  },
  '.is-float-label &': {
    ...activeFloatLabel,
  },
};

select.currentValue = {
  textAlign: 'left',
  flex: '1 1 0',
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  // rebass adds display: flex after other styles and ellipsis goes away
  display: 'inline !important',
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
  zIndex: 1,
  overflow: 'hidden',
};

select.option = {
  ...text.base,
  px: 'md',
  py: 'sm',
  alignItems: 'center',
  outline: 'none',
  wordBreak: 'break-word',
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

select.arrow = {
  ml: 'auto',
  '.is-float-label &': {
    mt: -10,
  },
};
