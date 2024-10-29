import { ThemeUICSSObject } from 'theme-ui';

export const label: ThemeUICSSObject = {
  color: 'text.primary',
  fontSize: '.9375rem',
  '&.is-float-label': {
    fontSize: 'md',
    fontWeight: 1,
  },
  '.is-float-label-active &.is-float-label': {
    fontSize: 'sm',
    left: '12px',
  },
  opacity: 1,
  checkbox: {
    fontSize: '.9375rem',
    display: 'inline-flex !important',
    div: {
      flexShrink: 0,
    },
    width: 'max-content',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radioGroup: {
    fontSize: '.9375rem',
  },
};
