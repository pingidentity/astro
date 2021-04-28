// Styles for default select and variants go here.
import { input } from './input';

const activeFloatLabel = {
  pt: 'md',
  pb: 'xs',
};

// Default select
export const select = {
  ...input,
  height: '42px',
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
