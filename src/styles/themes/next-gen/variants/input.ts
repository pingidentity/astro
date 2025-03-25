import { ThemeUICSSObject } from 'theme-ui';

import { text } from './text';

const defaultFocus = {
  boxShadow: '0 1px 1px rgba(0,0,0,.075), 0 0 0 .0625rem blue',
};

const readOnlyandDisabledStyles = {
  backgroundColor: 'disabled',
  border: '1px solid',
  borderColor: 'border.input',
  opacity: 1,
};

export const input: ThemeUICSSObject = {
  fontSize: 'md',
  fontFamily: 'standard',
  p: '0.75rem',
  backgroundColor: 'background.base',
  borderColor: 'border.input',
  '&.is-focused': {
    ...defaultFocus,
  },
  borderRadius: '4px',
  fontWeight: 1,
  '&::placeholder': text.placeholder,
};

input.promptInput = {
  ...input,
  position: 'absolute',
  pl: '0px',
  border: 'none',
  outline: 'none !important',
  overflowY: 'hidden',
  resize: 'none',
  lineHeight: '24px',
  minHeight: '26px',
  height: '26px',
  p: '0px',
  '&.is-focused': {
    border: 'none !important',
    outline: 'none !important',
  },
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
    borderColor: 'border.input !important',
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
    borderColor: 'border.input',
  },
  '&.is-read-only': {
    '> input': {
      backgroundColor: 'gray-100',
      border: '1px solid',
      borderColor: 'border.input !important',
    },
    '> textarea': {
      backgroundColor: 'gray-100',
      border: '1px solid',
      borderColor: 'border.input !important',
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

input.promptInputWrapper = {
  ...fieldControlWrapper,
  border: '1px solid',
  borderColor: 'border.input',
  borderRadius: '4px',
  minHeight: '50px',
  '&.is-focused': {
    boxShadow: '0 1px 1px rgba(0,0,0,.075), 0 0 0 .0625rem blue',
  },
};

input.multivaluesWrapper = {
  ...fieldControlWrapper,
  borderColor: 'border.input',
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
  minHeight: '50px',
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

input.promptInputRow = {
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  flexGrow: '1',
  overflowX: 'hidden',
  overflowY: 'auto',
  py: '12px',
};

input.promptInputAttachmentWrapper = {
  gap: '1.5rem',
  overflowX: 'auto',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  px: '.75rem',
};
