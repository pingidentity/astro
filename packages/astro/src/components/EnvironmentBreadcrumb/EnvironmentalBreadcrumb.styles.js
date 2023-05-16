import { text } from '../Button/Buttons.styles';

const button = {
  current: {
    ...text,
    color: 'neutral.30',
    fontSize: 'md',
    fontWeight: 1,
    padding: '4px',
    '&.is-hovered': {
      color: 'active',
      textDecoration: 'none',
      boxShadow: 'none',
    },
    '&.is-focused': {
      outline: '1px solid',
      outlineColor: 'focus',
      outlineOffset: '1px',
    },
    '&.is-pressed': {
      color: 'accent.20',
      textDecoration: 'none',
    },
  },
  selectItem: {
    ...text,
    color: 'neutral.10',
    fontSize: 'md',
    fontWeight: 0,
    justifyContent: 'start',
  },
};

export default {
  button,
};
