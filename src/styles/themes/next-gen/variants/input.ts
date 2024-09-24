import { ThemeUICSSObject } from 'theme-ui';

import { text } from './text';

const defaultFocus = {
  boxShadow: '0 1px 1px rgba(0,0,0,.075), 0 0 0 .0625rem blue',
};

const readOnlyandDisabledStyles = {
  backgroundColor: 'gray-100',
  border: '1px solid',
  borderColor: 'border.base',
  opacity: 1,
};

export const input: ThemeUICSSObject = {
  fontSize: 'md',
  p: '0.75rem',
  backgroundColor: 'white',
  borderColor: 'border.base',
  '&.is-focused': {
    ...defaultFocus,
  },
  borderRadius: '4px',
  fontWeight: 1,
  height: '50px',
  '&::placeholder': text.placeholder,
};

input.search = {
  ...input,
  '&.is-disabled': {
    ...readOnlyandDisabledStyles,
    '> input': {
      ...readOnlyandDisabledStyles,
    },
  },
};

input.containedIcon = {
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

export const fieldControlWrapper = {
  '> textarea': {
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'border.base !important',
    outline: 'none',
  },
  '&.is-disabled': {
    '> label': {
      opacity: 1,
    },
    // Override global opacity for disabled items because the children will handle their own opacity
    // and it will otherwise stack the opacity effect.
    opacity: 1,
    '> input': {
      fontWeight: 400,
      ...readOnlyandDisabledStyles,
    },
    '> textarea': {
      fontWeight: 400,
      ...readOnlyandDisabledStyles,
    },
    '&:after': {
      display: 'none',
    },
  },
  '&:after': {
    display: 'none',
  },
  '& > input': {
    borderLeftWidth: 1,
  },
  '> button': {
    borderLeftWidth: 1,
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'border.base',
  },
  '&.is-read-only': {
    '> input': {
      backgroundColor: 'gray-100',
      border: '1px solid',
      borderColor: 'border.base !important',
    },
    '> textarea': {
      backgroundColor: 'gray-100',
      border: '1px solid',
      borderColor: 'border.base !important',
    },
    '&:after': {
      display: 'none',
    },
  },
  '&.is-focused': {
    '> textarea': {
      outline: 'none',
      ...defaultFocus,
    },
  },
};

input.fieldControlWrapper = {
  ...fieldControlWrapper,
};

input.multivaluesWrapper = {
  ...fieldControlWrapper,
  borderColor: 'border.base',
  borderStyle: 'solid',
  borderWidth: 1,
  flexDirection: 'row !important' as 'row',
  flexWrap: 'wrap',
  pt: 6,
  pr: 10,
  pb: 5,
  pl: 12,
  borderRadius: '4px',
  alignItems: 'center',
  height: '50px',
  '> input': {
    border: 'none',
    flex: 1,
    height: 27,
    lineHeight: '100%',
    p: 5,
    '&.is-focused': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-error': {
    borderColor: 'critical.dark',
  },
};

input.numberField = {
  ...input,
  pr: '28px',
};
