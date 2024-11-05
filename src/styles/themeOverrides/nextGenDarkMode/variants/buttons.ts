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
  default: {
    '&.is-pressed': {
      color: 'black',
    },
    '&.is-hovered': {
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
