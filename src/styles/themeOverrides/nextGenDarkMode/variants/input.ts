import { ThemeUICSSObject } from 'theme-ui';

import { text } from './text';

export const input: ThemeUICSSObject = {
  backgroundColor: 'background.base',
  borderColor: 'border.input',
  '&::placeholder': text.placeholder,
};


export const fieldControlWrapper = {
  '> textarea': {
    borderColor: 'border.input',
    backgroundColor: 'background.base',
  },
};

input.fieldControlWrapper = {
  ...fieldControlWrapper,
};

input.multivaluesWrapper = {
  backgroundColor: 'background.base',
};

input.search = {
  ...input,
};
