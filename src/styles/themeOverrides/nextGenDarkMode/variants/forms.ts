import { input } from './input';

export const select = {
  backgroundColor: 'backgroundBase',
  borderRadius: '4px',
  border: '.5px solid',
  borderColor: '#69788B !important',
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

export const radio = {
  base: {
    color: 'text.primary',
  },
};

export const checkbox = {
  color: 'text.primary',
};

const label = {
  color: 'gray-100',
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

export default {
  input,
  checkbox,
  radio,
  label,
  select: {
    ...select,
    option: {
      ...selectOption,
    },
  },
  switch: switchable,
};
