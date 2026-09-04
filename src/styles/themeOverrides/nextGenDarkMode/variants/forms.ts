import { astroTokensDark } from '@pingux/onyx-tokens';

import comboBox from './comboBox';
import { fieldControlWrapper, input } from './input';

export const select = {
  backgroundColor: 'backgroundBase',
  borderRadius: astroTokensDark.radius.input,
  border: '.5px solid',
  borderColor: '#69788B !important',
  color: 'text.primary',
  height: astroTokensDark.size.input.height,
  pr: astroTokensDark.spacing.input['padding-x'],
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
  color: astroTokensDark.color.gray[500],
  '& rect[id="unchecked-bg"]': {
    fill: astroTokensDark.color.gray[900],
  },
  'input:checked ~ &': {
    color: 'primary',
  },
  // The input is visually hidden; use the focus state propagated to the label for the outline.
  '.is-focused &': {
    outline: '2px solid',
    outlineColor: astroTokensDark.color.blue[400],
    outlineOffset: '2px',
  },
  'input:disabled ~ &': {
    opacity: 0.5,
  },
};

const label = {
  color: astroTokensDark.color.gray[100],
  radioGroup: {
    color: 'white',
  },
  radio: {
    color: 'white',
  },
  checkbox: {
    '&.is-disabled': {
      color: astroTokensDark.color.gray[100],
    },
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

const numberField = {
  arrowsWrapper: {
    ...fieldControlWrapper,
    '&.is-disabled': {
      '> input': {
        backgroundColor: astroTokensDark.color.input['readonly-bg'],
        borderColor: astroTokensDark.color.input.border,
      },
    },
    '&.is-read-only': {
      '> input': {
        backgroundColor: astroTokensDark.color.input['readonly-bg'],
        borderColor: astroTokensDark.color.input.border,
      },
    },
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
  numberField,
};
