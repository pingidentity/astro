import chroma from 'chroma-js';

import { nextGenColors } from '../../../themes/next-gen/tokens/colorTokens';

const baseIconButton = {
  path: { fill: 'dark' },
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'primary',
    outlineOffset: '3px',
  },
  '&.is-hovered': {
    path: { fill: chroma.mix(nextGenColors['gray-400'], 'black', 0.15, 'rgb').hex() },
    backgroundColor: 'transparent',
  },
  '&.is-pressed': {
    backgroundColor: 'gray-800',
    borderColor: 'gray-900',
    path: { fill: chroma.mix(nextGenColors['gray-400'], 'black', 0.15, 'rgb').hex() },
  },
};

const iconButtons = {
  base: {
    ...baseIconButton,
  },
  nextGen: {
    '&.is-hovered': {
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      path: { fill: 'black' },
    },
  },
  deleteAttachment: {
    backgroundColor: 'background.secondary',
    borderColor: 'border.attachment',
    '&.is-hovered': {
      backgroundColor: '#0a0b0d',
    },
  },
  filter: {
    ...baseIconButton,
    '&.is-hovered': {
      backgroundColor: 'gray-700',
    },
  },
};

const buttons = {
  primary: {
    color: 'black',
    '&.is-hovered': {
      color: 'black',
    },
    '&.is-pressed': {
      color: 'black',
    },
  },
  paginationMenu: {
    color: 'text.secondary',
  },
  neutral: {
    color: 'gray-400',
  },
  critical: {
    color: 'black',
    '&.is-hovered': {
      color: 'black',
    },
    '&.is-pressed': {
      color: 'black',
    },
  },
  inline: {
    color: 'blue-400',
    borderColor: 'blue-400',
    '&.is-hovered': {
      backgroundColor: 'active_hover',
      color: 'black',
      borderColor: 'blue',
    },
    '&.is-pressed': {
      color: 'black',
      borderColor: 'blue',
    },
  },
  inlinePrimary: {
    color: 'black',
    '&.is-hovered': {
      color: 'black',
    },
    '&.is-pressed': {
      color: 'black',
    },
  },
  withIcon: {
    color: 'blue-400',
    borderColor: 'blue-400',
    '&.is-hovered': {
      backgroundColor: 'active_hover',
      borderColor: 'blue',
      color: 'black',
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      color: 'black',
      borderColor: 'blue',
      path: { fill: 'black' },
    },
  },
  primaryWithIcon: {
    color: 'black',
    path: { fill: 'black' },
    '&.is-hovered': {
      color: 'black',
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      color: 'black',
      path: { fill: 'black' },
    },
  },
  inlineWithIcon: {
    color: 'blue-400',
    borderColor: 'blue-400',
    '&.is-hovered': {
      color: 'black',
      backgroundColor: 'active_hover',
      borderColor: 'blue',
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      color: 'black',
      borderColor: 'blue',
      path: { fill: 'black' },
    },
  },
  inlinePrimaryWithIcon: {
    color: 'black',
    path: { fill: 'black' },
    '&.is-hovered': {
      color: 'black',
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      color: 'black',
      path: { fill: 'black' },
    },
  },
  colorBlock: {
    bg: 'gray-200',
    borderColor: 'gray-200',
    path: { fill: 'black' },
    '& span': {
      color: 'black',
    },
    '&.is-hovered': {
      bg: 'blue-100',
      borderColor: 'blue-100',
    },
    '&.is-pressed': {
      bg: 'blue-100',
      borderColor: 'blue-100',
    },
    '&>svg': {
      color: 'black',
      fill: 'black',
    },
  },
  colorBlockPrimary: {
    path: { fill: 'black' },
    '& span': {
      color: 'black',
    },
    '&.is-hovered': {
      path: { fill: 'black' },
    },
    '&.is-pressed': {
      path: { fill: 'black' },
    },
    '&>svg': {
      color: 'black',
      fill: 'black',
    },
  },
  default: {
    color: 'blue-400',
    borderColor: 'blue-400',
    '&.is-pressed': {
      color: 'black',
      borderColor: 'blue',
    },
    '&.is-hovered': {
      backgroundColor: 'active_hover',
      borderColor: 'blue',
      color: 'black',
    },
  },
  link: {
    color: 'blue-400',
    '&.is-pressed': {
      textDecoration: 'underline',
      outline: 'none',
      color: chroma.mix(nextGenColors['blue-500'], 'white', 0.45, 'rgb').hex(),
    },
    '&.is-focused': {
      textDecoration: 'underline',
      color: chroma.mix(nextGenColors['blue-500'], 'white', 0.30, 'rgb').hex(),
      outline: 'none',
    },
  },
  iconButtons,
};

export default buttons;
