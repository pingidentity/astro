import { text } from '../variants/text';

const listBox = {
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

export default listBox;
