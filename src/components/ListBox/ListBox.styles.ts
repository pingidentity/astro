import { ThemeUICSSObject } from 'theme-ui';

import { text } from '../Text/Text.styles';

const listBox: ThemeUICSSObject = {
  outline: 'none',
};

listBox.option = {
  ...text.base,
  px: 'md',
  py: 'sm',
  alignItems: 'center',
  outline: 'none',
  wordBreak: 'break-word',
  cursor: 'pointer',
  '&.is-selected': {
    ...text.inputValue,
    pl: 0,
  },
  '&.is-focused': {
    color: 'white',
    bg: 'active',
  },
};

listBox.selectField = {
  maxHeight: '200px',
  overflow: 'auto',
  pl: 0,
  outline: 'none',
};

listBox.sectionTitle = {
  fontSize: 'sm',
  fontWeight: '3',
  color: 'text.secondary',
  height: '36px',
  ml: 'sm',
  justifyContent: 'center',
};

export default listBox;
