import { astroTokens } from '@pingux/onyx-tokens';

export const menu = {
  p: 'sm',
  border: '1px solid',
  borderColor: 'border.base',
};

export const menuSection = {
  sectionTitle: {
    fontWeight: '1',
    fontSize: 'tiny',
    lineHeight: 'md',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    height: 'unset',
    py: 'sm',
    px: '12px',
    color: 'font.light',
    ml: 0,
  },
};

export const menuItem = {
  item: {
    bg: 'transparent',
    padding: '12px 12px',
    outline: 'none',
    color: astroTokens.color.gray[700],
    fontSize: 'md',
    lineHeight: 'body',
    cursor: 'pointer',
    borderRadius: '4px',
    '&.is-hovered': {
      bg: astroTokens.color.gray[100],
      color: '#121518',
      '> *': {
        color: '#121518',
      },
    },
    '&.is-focused': {
      bg: astroTokens.color.gray[100],
      color: '#121518',
      outline: '1px solid',
      outlineOffset: '1px',
      outlineColor: 'primary',
      '> *': {
        color: '#121518',
      },
    },
    '&.is-pressed, &.is-selected': {
      bg: 'lightblue',
      color: '#121518',
      '> *': {
        color: '#121518',
      },
    },
  },
  separator: {
    my: 'sm',
  },
};
