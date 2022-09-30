import { base } from '../Button/Buttons.styles';

const link = {
  color: 'active',
  fontFamily: 'standard',
  fontSize: '15px',
  textDecoration: 'none',
  outline: 'none',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    textDecoration: 'underline',
  },
  '&.is-disabled': {
    pointerEvents: 'none',
  },
  '&.is-current': {
    pointerEvents: 'none',
    ...base,
    fontWeight: 1,
  },
};

const containerLi = {
  'a.is-hovered.is-current ': {
    textDecoration: 'none',
  },
};

export default {
  link,
  containerLi,
};
