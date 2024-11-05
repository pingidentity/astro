import { ThemeUICSSObject } from 'theme-ui';

export const input: ThemeUICSSObject = {
  backgroundColor: 'background.base',
  borderColor: 'border.input',
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
