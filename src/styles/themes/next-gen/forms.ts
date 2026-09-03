import { astroTokens } from '@pingux/onyx-tokens';

import { isSafari } from '../../safariAgent.js';

import colors from './colors/colors';
import tShirtSizes from './customProperties/tShirtSizes';
import { fieldControlWrapper, input } from './variants/input';
import { label } from './variants/label';
import { switchable } from './variants/switch';

export const checkbox = {
  height: '19.25px',
  width: '19.25px',
  color: 'text.secondary',
  mr: '8px',
  'input ~ &.is-focused': {
    boxShadow: `inset 0px 0px 0px 1px ${colors.focus}`,
  },
};

export const select = {
  borderRadius: astroTokens.radius.input,
  borderColor: 'border.input',
  color: 'text.primary',
  height: astroTokens.size.input.height,
  pr: astroTokens.spacing.input['padding-x'],
  '&.is-disabled': {
    opacity: 1,
    borderColor: 'border.input',
    backgroundColor: 'disabled',
  },
  currentValue: {
    color: 'text.primary',
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    ml: 'xs',
    '& > svg': {
      minWidth: tShirtSizes.xs,
      width: tShirtSizes.xs,
      height: tShirtSizes.xs,
    },
  },
};

export const search = {
  wrapper: {
    opacity: 1,
  },
  icon: {
    color: 'font.base',
    ml: '20px',
  },
};

export const comboBox = {
  input: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: astroTokens.radius.input,
    height: '50px',
  },
  button: {
    border: 'none !important',
  },
  inputInContainerSlot: {
    right: astroTokens.spacing.input['padding-x'],
  },
};

export const numberField = {
  arrowsWrapper: {
    ...fieldControlWrapper,
  },
};

export const radio = {
  base: {
    color: 'text.secondary',
    mr: '8px',
    'input ~ &.is-focused':
      /* istanbul ignore next */
      isSafari ? {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'focus',
        boxSizing: 'border-box',
        transform: 'scale(1.1)',
        transformOrigin: 'center',
      }
      /* istanbul ignore next */
        : {
          outline: '1px solid',
          outlineColor: 'focus',
          outlineOffset: '1px',
        },
  },
};

export const timeField = {
  inputField: {
    ...input,
    color: 'font.base',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 'body',
    minWidth: '105px',
    '&:focus-within:not(.is-read-only)': {
      borderColor: 'focus',
      outline: '1px solid',
      outlineColor: 'focus',
      outlineOffset: '0px',
    },
    '&.is-read-only': {
      border: '1px solid',
      borderColor: 'border.input',
      backgroundColor: 'disabled',
    },
    '&.is-disabled': {
      opacity: 1,
      border: '1px solid',
      borderColor: 'border.input',
      backgroundColor: 'disabled',
    },
  },
  segment: {
    px: '2px',
    textTransform: 'uppercase',
    '&:empty': {
      px: 0,
    },
  },
};

export default {
  input,
  label,
  checkbox,
  comboBox,
  select,
  radio,
  search,
  switch: switchable,
  numberField,
  timeField,
};
