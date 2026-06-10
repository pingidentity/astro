import { astroTokensDark } from '@pingux/onyx-tokens';

export const menuItem = {
  item: {
    bg: 'transparent',
    padding: '12px 12px',
    outline: 'none',
    color: astroTokensDark.color.gray[400],
    cursor: 'pointer',
    '&.is-hovered': {
      bg: '#2C323A',
      color: astroTokensDark.color.gray[200],
      '> *': {
        color: astroTokensDark.color.gray[200],
      },
    },
    '&.is-focused': {
      bg: '#2C323A',
      color: astroTokensDark.color.gray[200],
      outline: '1px solid',
      outlineOffset: '1px',
      outlineColor: 'primary',
      '> *': {
        color: astroTokensDark.color.gray[200],
      },
    },
    '&.is-selected, &.is-pressed': {
      color: 'text.secondary',
      bg: astroTokensDark.color.gray[800],
      '> *': {
        color: astroTokensDark.color.gray[200],
      },
    },
  },
  separator: {
    my: 'sm',
  },
};

export const menu = {
  backgroundColor: astroTokensDark.color.common.bg.base,
};
