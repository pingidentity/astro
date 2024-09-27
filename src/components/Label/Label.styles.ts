// Styles for default label and variants go here.
import { ThemeUICSSObject } from 'theme-ui';

import { text } from '../Text/Text.styles';

const activeFloatLabel = {
  fontWeight: 0,
  transform: 'translate(0, -8px) scale(0.75)',
};

// Default label
export const label: ThemeUICSSObject = {
  ...text.label,
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
  '&.is-float-label': {
    textOverflow: 'ellipsis',
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 'md',
    fontWeight: -1,
    position: 'absolute',
    zIndex: 1,
    top: '13px',
    left: 'md',
    mb: 0,
    transformOrigin: 'top left',
    transition: 'all 0.1s ease-out',
    pointerEvents: 'none',
    paddingRight: '25px',
    paddingLeft: '1px', // Otherwise, certain characters get cut off on the left from the overflow
  },
  '.is-float-label-active &.is-float-label': {
    ...activeFloatLabel,
  },
  '&.is-left-label': {
    width: 'auto',
    pr: 'sm',
    mb: 0,
    alignSelf: 'center',
  },
};

// Variants below

label.indicator = {
  color: 'critical.bright',
  ml: 5,
};

label.radio = {
  ...text.base,
  cursor: 'pointer',
  alignItems: 'center',
  mb: 'xs',
};

// NOTE: ThemeUI label adds 'flex' after other styles, so we have to use !important to override it
label.checkbox = {
  ...text.base,
  display: 'inline-flex !important',
  div: {
    flexShrink: 0,
  },
  width: 'max-content',
  alignItems: 'center',
  cursor: 'pointer',
  '&.is-disabled': {
    opacity: '1',
    color: 'rgba(37, 55, 70, 0.5)',
  },
};

label.radioGroup = {
  ...label,
  fontWeight: 1,
};
