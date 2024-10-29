import { flat } from '../../../../components/Card/Card.styles';

const interactive = {
  boxShadow: 'none',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: 'border.base',
  transition: 'border-color .25s ease-in',
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
  },
  '&.is-hovered': {
    outline: 'none',
    borderColor: 'blue',
    bg: 'default',
  },
};

const container = {
  ...flat,
  p: 'lg',
};

const dark = {
  ...flat,
  border: 'none',
  backgroundColor: 'card.blue',
  p: 'lg',
  gap: 'lg',
};

const light = {
  ...flat,
  border: 'none',
  backgroundColor: 'card.gray',
  p: 'lg',
  gap: 'lg',
};

const activeCard = {
  ...interactive,
  borderColor: 'border.base',
  '&.is-hovered': {
    borderColor: 'active',
    bg: 'default',
  },
};

export default {
  interactive,
  dark,
  light,
  activeCard,
  container,
};
