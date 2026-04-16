import { astroTokensDark } from '@pingux/onyx-tokens';
import chroma from 'chroma-js';


const baseIconButton = {
  path: { fill: 'dark' },
  '&.is-hovered': {
    path: { fill: astroTokensDark.color.gray[400] },
    backgroundColor: 'light',
  },
  '&.is-pressed': {
    backgroundColor: 'light',
    borderColor: astroTokensDark.color.gray[900],
    path: { fill: astroTokensDark.color.gray[400] },
  },
};

const hintButton = {
  ...baseIconButton,
};

const modalCloseButton = {
  ...baseIconButton,
};

const iconButtons = {
  base: {
    ...baseIconButton,
  },
  inverted: {
    path: {
      fill: 'black',
    },
    '&.is-pressed': {
      backgroundColor: chroma.mix('white', 'black', 0.125, 'rgb').hex(),
    },
    '&.is-hovered': {
      backgroundColor: 'white',
    },
  },
  searchClearButton: {
    '&.is-hovered': {
      backgroundColor: 'backgroundSecondary',
    },
    '&.is-pressed': {
      backgroundColor: 'backgroundSecondary',
    },
  },
  hintButton,
  deleteAttachment: {
    backgroundColor: 'backgroundSecondary',
    borderColor: 'border.attachment',
    '&.is-hovered': {
      backgroundColor: '#0a0b0d',
    },
  },
  filter: {
    ...baseIconButton,
    '&.is-hovered': {
      backgroundColor: astroTokensDark.color.gray[700],
    },
  },
  modalCloseButton: {
    ...baseIconButton,
  },
  modalHeaderCloseButton: {
    ...baseIconButton,
  },
  messageCloseButton: {
    ...baseIconButton,
    '&.is-hovered': {
      backgroundColor: astroTokensDark.color.gray.light,
    },
  },
  tooltip: {
    button: {
      ...baseIconButton,
      '&.is-hovered': {
        path: { fill: astroTokensDark.color.gray[400] },
        backgroundColor: astroTokensDark.color.common.light,
      },
    },
  },
};

const searchNavTabLabel = {
  color: astroTokensDark.color.gray[400],
  '&.is-hovered': {
    color: 'white',
    '& > svg': {
      fill: 'white',
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
    color: astroTokensDark.color.gray[400],
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
    color: astroTokensDark.color.blue[400],
    borderColor: astroTokensDark.color.blue[400],
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
    color: astroTokensDark.color.blue[400],
    borderColor: astroTokensDark.color.blue[400],
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
    color: astroTokensDark.color.blue[400],
    borderColor: astroTokensDark.color.blue[400],
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
    bg: astroTokensDark.color.gray[200],
    borderColor: astroTokensDark.color.gray[200],
    path: { fill: 'black' },
    '& span': {
      color: 'black',
    },
    '&.is-hovered': {
      bg: astroTokensDark.color.blue[100],
      borderColor: astroTokensDark.color.blue[100],
    },
    '&.is-pressed': {
      bg: astroTokensDark.color.blue[100],
      borderColor: astroTokensDark.color.blue[100],
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
    color: astroTokensDark.color.blue[400],
    borderColor: astroTokensDark.color.blue[400],
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
    color: astroTokensDark.color.blue[400],
    '&.is-pressed': {
      textDecoration: 'underline',
      outline: 'none',
      color: chroma.mix(astroTokensDark.color.blue[500], 'white', 0.45, 'rgb').hex(),
    },
    '&.is-focused': {
      textDecoration: 'underline',
      color: chroma.mix(astroTokensDark.color.blue[500], 'white', 0.3, 'rgb').hex(),
      outline: 'none',
    },
  },
  iconButtons,
  searchNavTabLabel,
  modalCloseButton,
  listBoxLink: {
    color: astroTokensDark.color.blue[400],
    '&.is-pressed': {
      color: chroma.mix(astroTokensDark.color.blue[500], 'white', 0.45, 'rgb').hex(),
    },
    '&.is-focused': {
      color: chroma.mix(astroTokensDark.color.blue[500], 'white', 0.3, 'rgb').hex(),
    },
  },
};

export default buttons;
