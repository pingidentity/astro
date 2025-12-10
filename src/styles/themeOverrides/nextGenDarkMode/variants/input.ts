import { ThemeUICSSObject } from 'theme-ui';

import { text } from './text';

export const input: ThemeUICSSObject = {
  backgroundColor: 'backgroundBase',
  borderColor: 'border.input',
  '&::placeholder': text.placeholder,
};

export const fieldControlWrapper = {
  '> textarea': {
    borderColor: 'border.input',
    backgroundColor: 'backgroundBase',
  },
};

input.fieldControlWrapper = {
  ...fieldControlWrapper,
};

input.multivaluesWrapper = {
  backgroundColor: 'backgroundBase',
  '&.is-read-only': {
    boxShadow: 'inset 0 0 0 100px #30373f',
    border: '1px solid',
    borderColor: 'border.input',
    '> input': {
      backgroundColor: 'disabled',
    },
  },
};

input.promptInput = {
  color: 'gray-100',
};

input.search = {
  ...input,
};
