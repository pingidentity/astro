import { text } from '../variants/text';

const listBox = {
  position: 'absolute',
  width: '100%',
  padding: 0,
  listStyle: 'none',
  border: 'none',
  background: 'white',
  outline: 'none',
  boxShadow: 'standard',
  zIndex: 1,
  overflow: 'hidden',
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
