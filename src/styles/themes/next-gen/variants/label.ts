import { astroTokens } from '@pingux/onyx-tokens';
import { ThemeUICSSObject } from 'theme-ui';

// @ts-expect-error - font-size is in default tokens but not in the type definition
const fontSizes = astroTokens.default['font-size'];

export const label: ThemeUICSSObject = {
  color: 'text.primary',
  fontSize: fontSizes.label,
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
