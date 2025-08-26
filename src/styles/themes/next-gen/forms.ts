import { isSafari } from '../../safariAgent.js';

import colors from './colors/colors';
import tShirtSizes from './customProperties/tShirtSizes';
import { fieldControlWrapper, input } from './variants/input';
import { label } from './variants/label';

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
  borderRadius: '4px',
  borderColor: 'border.input',
  color: 'text.primary',
  height: '50px',
  '&.is-disabled': {
    opacity: 1,
    borderColor: 'border.input',
    backgroundColor: 'disabled',
  },
  currentValue: {
    color: 'text.primary',
  },
  arrow: {
    width: '20px',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: '4px',
    height: '50px',
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

export default {
  input,
  label,
  checkbox,
  comboBox,
  select,
  radio,
  search,
  numberField,
};
