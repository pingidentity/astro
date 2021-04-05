// Styles for default label and variants go here.
import { text } from '../variants/text';

const activeFloatLabel = {
  fontWeight: 0,
  transform: 'translate(0, -8px) scale(0.75)',
};

// Default label
export const label = {
  ...text.label,
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
  '&.is-float-label': {
    fontSize: 'md',
    fontWeight: -1,
    position: 'absolute',
    zIndex: 1,
    top: '13px',
    left: 'md',
    mb: 0,
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
  },
  '.is-float-label-active &.is-float-label': {
    ...activeFloatLabel,
  },
  '&.is-left-label': {
    width: 'auto',
    pr: 'sm',
    mb: 0,
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

// NOTE: Rebass label adds 'flex' after other styles, so we have to use !important to override it
label.checkbox = {
  ...text.base,
  display: 'inline-flex !important',
  width: 'auto',
  alignItems: 'center',
  cursor: 'pointer',
};
