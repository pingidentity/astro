import { defaultFocus } from '../Button/Buttons.styles';

const tab = {
  pt: 'md',
  cursor: 'pointer',
  alignItems: 'center',
  display: 'inline-flex',
  borderBottom: '2px solid transparent',
  outline: 'none',
  marginBottom: '-1px',
  position: 'relative',
  zIndex: '2',
  '&.is-focused': {
    '& > span': {
      ...defaultFocus,
      borderRadius: '4px',
    },
  },
  '&.is-disabled': {
    cursor: 'default',
  },
  '&.is-selected': {
    borderBottomWidth: '2px',
    borderBottomColor: 'active',
  },
};

const list = {
  borderBottom: '1px solid',
  borderBottomColor: 'border.hairline',
};

export default {
  tab,
  list,
};
