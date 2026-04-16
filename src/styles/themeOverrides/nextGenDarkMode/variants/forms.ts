import { astroTokensDark } from '@pingux/onyx-tokens';

import comboBox from './comboBox';
import { input } from './input';

export const select = {
  backgroundColor: 'backgroundBase',
  borderRadius: astroTokensDark.radius.input,
  border: '.5px solid',
  borderColor: '#69788B !important',
  color: 'text.primary',
  height: astroTokensDark.size.input.height,
  '&.is-disabled': {
    opacity: 1,
    borderColor: 'border.input',
    backgroundColor: 'disabled',
  },
  currentValue: {
    color: 'text.primary',
  },
};

export const radio = {
  base: {
    color: 'text.primary',
  },
};

export const checkbox = {
  color: 'text.primary',
};

const label = {
  color: astroTokensDark.color.gray[100],
  radioGroup: {
    color: 'white',
  },
  radio: {
    color: 'white',
  },
};

const selectOption = {
  backgroundColor: 'backgroundBase',
  color: 'text.primary',
  px: 'md',
  py: 'sm',
  alignItems: 'center',
  outline: 'none',
  cursor: 'pointer',
  '&.is-selected': {
    pl: 0,
  },
  '&.is-focused': {
    color: 'white',
    bg: 'active',
  },
};

const switchable = {
  thumb: {
    '&.is-selected': {
      bg: 'black',
    },
  },
};

const search = {
  icon: {
    fill: `${astroTokensDark.color.font.base} !important`,
  },
};

export default {
  input,
  checkbox,
  radio,
  label,
  search,
  select: {
    ...select,
    option: {
      ...selectOption,
    },
  },
  switch: switchable,
  comboBox,
};
