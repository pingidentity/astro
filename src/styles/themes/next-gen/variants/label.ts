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
  checkboxFieldGroup: {
    color: 'text.primary',
    fontSize: fontSizes.label,
    mb: 'sm',
    fontWeight: 'body',
    opacity: 1,
    flexWrap: 'wrap',
  },
  checkboxFieldGroupItem: {
    fontSize: fontSizes.label,
    display: 'inline-flex !important',
    div: {
      flexShrink: 0,
    },
    width: 'max-content',
    alignItems: 'center',
    cursor: 'pointer',
    minWidth: 0,
    maxWidth: '100%',
    flexWrap: 'wrap',
    '> div': {
      mr: 'md',
    },
    // Keyboard focus ring: the field-label gets .is-focused while the hidden
    // input inside it holds focus, so surface the ring on the checkbox icon.
    '&.is-focused input:focus ~ svg': {
      boxShadow: `inset 0px 0px 0px 1px ${astroTokens.color.primary}`,
    },
  },
};
