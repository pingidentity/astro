// Styles for default select and variants go here.
import { ThemeUICSSObject } from 'theme-ui';

import { text } from '../../styles/variants';
import { defaultFocus, input } from '../Input/Input.styles';

const activeFloatLabel = {
  pt: 'md',
  pb: 'xs',
};

// Default select
export const select: ThemeUICSSObject = {
  ...input,
  display: 'flex',
  alignItems: 'center',
  '&.is-focused': {
    ...defaultFocus,
  },
  '.is-float-label &': {
    height: '45px',
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
  // ThemeUI adds display: flex after other styles and ellipsis goes away
  display: 'inline !important',
};

select.listBoxPopup = {
  ...input,
  position: 'absolute',
  width: '100%',
  height: 'fit-content',
  padding: '0',
  zIndex: 2,
  borderTop: 'none',
  background: 'white',
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

select.arrow = {
  ml: 'auto',
  '.is-float-label &': {
    mt: -10,
  },
  '> svg': {
    transition: 'all 0.2s linear',
  },
};
