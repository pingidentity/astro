import { astroTokens } from '@pingux/onyx-tokens';
import { ThemeUICSSObject } from 'theme-ui';

import { text } from './text';

const defaultFocus = {
  boxShadow: '0 1px 1px rgba(0,0,0,.075), 0 0 0 .0625rem blue',
};

const readOnlyandDisabledStyles = {
  backgroundColor: astroTokens.color.input['readonly-bg'],
  border: '1px solid',
  borderColor: astroTokens.color.input.border,
  opacity: 1,
};

export const input: ThemeUICSSObject = {
  height: astroTokens.size.input.height,
  fontSize: 'md',
  fontFamily: 'standard',
  p: '0.75rem',
  backgroundColor: 'backgroundBase',
  borderColor: 'border.input',
  '&.is-focused': {
    ...defaultFocus,
  },
  borderRadius: astroTokens.radius.input,
  fontWeight: 1,
  '&::placeholder': text.placeholder,
  '.is-float-label &': {
    height: astroTokens.size.input.height,
  },
};

input.large = {
  ...input,
  height: '4em',
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
  borderRadius: astroTokens.radius.input,
  height: astroTokens.size.input.height,
  pl: '4em !important',
  pr: '20px !important',
  py: '13px !important',
  lineHeight: 'body',
  color: 'font.base',
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
    borderRadius: astroTokens.radius.input,
    border: '1px solid',
    borderColor: 'border.input',
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
    borderRadius: astroTokens.radius.input,
    border: '1px solid',
    borderColor: astroTokens.color.input.border,
  },
  '&.is-read-only': {
    '> input': {
      backgroundColor: astroTokens.color.input['readonly-bg'],
      border: '1px solid',
      borderColor: astroTokens.color.input.border,
    },
    '> textarea': {
      backgroundColor: astroTokens.color.input['readonly-bg'],
      border: '1px solid',
      borderColor: astroTokens.color.input.border,
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
  borderColor: astroTokens.color.input.border,
  borderRadius: astroTokens.radius.input,
  minHeight: astroTokens.size.input.height,
  '&.is-focused': {
    boxShadow: '0 1px 1px rgba(0,0,0,.075), 0 0 0 .0625rem blue',
  },
};

input.multivaluesWrapper = {
  ...fieldControlWrapper,
  borderStyle: 'solid',
  borderWidth: 1,
  flexDirection: 'row !important' as 'row',
  flexWrap: 'wrap',
  pt: 6,
  pr: 10,
  pb: 5,
  pl: 12,
  borderRadius: astroTokens.radius.input,
  alignItems: 'center',
  minHeight: astroTokens.size.input.height,
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
  '&.is-read-only': {
    alignItems: 'center',
    boxShadow: 'inset 0 0 0 100px #F6F8FA',
    border: '1px solid',
    borderColor: 'gray-900',
    '> input': {
      backgroundColor: 'backgroundSecondary',
    },
    '&:after': {
      display: 'none',
    },
  },
  '&.is-disabled': {
    backgroundColor: 'disabled',
    '> input': {
      backgroundColor: 'disabled',
      border: 'none',
    },
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

input.dropDownContentRight = {
  background: 'inherit',
  '& button': {
    borderRadius: '0px 4px 4px 0px !important',
    '&.is-focused': {
      outline: '2px solid',
      outlineOffset: '2px',
      outlineColor: astroTokens.color['gray-700'],
    },
  },
};

input.dropDownContentLeft = {
  '& button': {
    borderRadius: '4px 0px 0px 4px !important',
    '&.is-focused': {
      outline: '2px solid',
      outlineOffset: '2px',
      outlineColor: astroTokens.color['gray-700'],
    },
  },
};
