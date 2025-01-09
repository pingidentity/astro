import colors from './colors/colors';
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
};

export const search = {
  wrapper: {
    opacity: 1,
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
    'input ~ &.is-focused': {
      outline: '1px solid',
      outlineColor: '#1a73e8',
      outlineOffset: '-3px',
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
