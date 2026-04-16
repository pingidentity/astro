import { astroTokens } from '@pingux/onyx-tokens';
import { ThemeUICSSObject } from 'theme-ui';

const fontSizes = astroTokens.default['font-size'];

export const label: ThemeUICSSObject = {
  color: 'text.primary',
  fontSize: fontSizes.label,
  mb: 'sm',
  fontWeight: 'body',
  '&.is-float-label': {
    fontSize: fontSizes.label,
    fontWeight: 1,
    top: '15px',
  },
  '.is-float-label-active &.is-float-label': {
    fontSize: 'sm',
    left: '12px',
  },
  opacity: 1,
  checkbox: {
    fontSize: fontSizes.label,
    display: 'inline-flex !important',
    div: {
      flexShrink: 0,
    },
    width: 'max-content',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radioGroup: {
    color: 'text.primary',
    fontSize: fontSizes.label,
    mb: 'md',
  },
};
