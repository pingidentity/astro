import { astroTokensDark } from '@pingux/onyx-tokens';

import comboBox from './comboBox';
import { fieldControlWrapper, input } from './input';

export const datePicker = {
  inSlotContainer: {
    minWidth: '400px',
  },
  inputField: {
    ...input,
    color: astroTokensDark.color.font.base,
    width: '100%',
    p: `${astroTokensDark.spacing.input['md-s']}px !important`,
    pr: '44px !important',
    '&:focus-within:not(.is-read-only)': {
      borderColor: 'focus',
      boxShadow: 'none',
      outline: '1px solid',
      outlineColor: 'focus',
      outlineOffset: '0px',
    },
    '&.is-read-only': {
      border: '1px solid',
      borderColor: 'border.input',
      backgroundColor: astroTokensDark.color.input['readonly-bg'],
      boxShadow: 'none',
    },
    '&.is-disabled': {
      opacity: 1,
      border: '1px solid',
      borderColor: 'border.input',
      backgroundColor: 'disabled',
      color: astroTokensDark.color.font.base,
      boxShadow: 'none',
    },
  },
  segment: {
    color: astroTokensDark.color.font.base,
    '&:empty': {
      color: astroTokensDark.color.font.base,
    },
  },
};

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
    outlineOffset: '0px',
  },
  'input:disabled ~ &': {
    opacity: 0.5,
  },
};

const label = {
  color: astroTokensDark.color.gray[100],
  radioGroup: {
    color: astroTokensDark.color.input.text,
  },
  radio: {
    color: astroTokensDark.color.input.text,
  },
  checkboxFieldGroup: {
    color: 'text.primary',
  },
  checkboxFieldGroupItem: {
    color: 'text.primary',
    '&.is-disabled, &.is-read-only': {
      color: 'text.primary',
    },
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
  container: {
    borderColor: 'gray-800',
    backgroundColor: 'gray-900',
  },
  thumb: {
    '&.is-selected': {
      bg: 'white',
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
  datePicker,
};
