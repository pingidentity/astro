import { defaultFocus } from '../Button/Buttons.styles';

const header = {
  cursor: 'pointer',
  lineHeight: '30px',
  pl: 'sm',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  bg: 'white',
  color: 'neutral.10',
  flexGrow: 1,
  fontWeight: 700,
  border: '1px solid transparent',
  '&.is-focused': {
    ...defaultFocus,
    zIndex: '10',
  },
  minHeight: '64px',
  '&.is-hovered': {
    backgroundColor: 'accent.99',
  },
  '&.is-pressed': {
    color: 'accent.20',
    '& div > div > div > span': {
      color: 'accent.20',
    },
  },
};

const body = {
  display: 'none !important',
  pl: 'sm',
  width: '100%',
  '&.is-selected': {
    display: 'flex !important',
  },
  ':focus': {
    outline: 'none',
  },
};

const item = {
  ':focus': {
    outline: 'none',
  },
};

export default {
  header,
  body,
  item,
};
