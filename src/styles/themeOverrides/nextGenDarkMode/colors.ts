import chroma from 'chroma-js';

import { white } from '../../colors';
import { nextGenColors } from '../../themes/next-gen/tokens/colorTokens';

export const overrides = {
  neutral: {
    90: '#455469',
  },
  disabled: '#30373f',
};

const font = {
  base: nextGenColors['gray-100'],
  light: nextGenColors['gray-400'],
  link: nextGenColors['blue-400'],
};

const hoverDark = chroma.mix('#23282e', 'white', 0.04, 'rgb').hex();

const border = {
  base: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
  dark: '#46505C',
  input: nextGenColors['gray-500'],
  separator: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
  attachment: '#39414b',
  hairline: '#737577',
};

const badge = {
  background: nextGenColors['gray-800'],
  textColor: nextGenColors['gray-100'],
};

const background = {
  base: nextGenColors['gray-900'],
  secondary: '#1a1e22',
  card: '#1a1e22',
  hover: hoverDark,
};

const twoTone = {
  bg: {
    orange: nextGenColors['orange-500'],
    cyan: nextGenColors['cyan-500'],
    green: nextGenColors['green-500'],
    purple: nextGenColors['purple-500'],
    pink: nextGenColors['pink-500'],
    red: nextGenColors['red-500'],
    yellow: nextGenColors['yellow-500'],
    teal: nextGenColors['teal-500'],
    blue: nextGenColors['blue-500'],
    white,
    indigo: nextGenColors['indigo-500'],
    lightBlue: nextGenColors['blue-600'],
    lightPink: nextGenColors['pink-600'],
    lightGreen: nextGenColors['green-800'],
    lightYellow: nextGenColors['yellow-800'],
    lightIndigo: nextGenColors['indigo-700'],
  },
  text: {
    orange: 'black',
    cyan: 'black',
    green: 'black',
    purple: 'black',
    pink: 'black',
    red: 'black',
    yellow: 'black',
    teal: 'black',
    blue: 'black',
    indigo: 'black',
    lightBlue: 'black',
    lightPink: 'black',
    lightGreen: 'black',
    lightYellow: 'black',
    lightIndigo: 'black',
  },
};

const iconWrapper = {
  wrapper: {
    ...twoTone.bg,
  },
  icon: {
    orange: 'black',
    cyan: 'black',
    green: 'black',
    purple: 'black',
    pink: 'black',
    red: 'black',
    yellow: 'black',
    teal: 'black',
    blue: 'black',
    indigo: 'black',
    lightBlue: nextGenColors['blue-100'],
    lightPink: nextGenColors['pink-100'],
    lightGreen: nextGenColors['green-100'],
    lightYellow: nextGenColors['yellow-100'],
    lightIndigo: nextGenColors['indigo-100'],
  },
};

const common = {
  dark: '#C0C9D5',
};

const backgroundBase = nextGenColors['gray-900'];
const backgroundSecondary = nextGenColors['gray-900'];
const backgroundCard = '#1a1e22';
const backgroundSuggestion = '#ecf0f5';
const backgroundHover = hoverDark;

const codeEditor = {
  backgroundColor: backgroundSecondary,
  headerColor: nextGenColors['gray-900'],
};

export const colors = {
  border,
  iconWrapper,
  ...overrides,
  twoTone,
  light: '#1A1E22',
  secondary: nextGenColors['gray-400'],
  dark: nextGenColors['gray-400'],
  lightblue: nextGenColors['blue-600'],
  lightindigo: nextGenColors['indigo-700'],
  lightpurple: nextGenColors['purple-500'],
  lightpink: nextGenColors['pink-600'],
  lightred: nextGenColors['red-700'],
  lightorange: nextGenColors['orange-700'],
  lightyellow: nextGenColors['yellow-800'],
  lightgreen: nextGenColors['green-800'],
  lightteal: nextGenColors['teal-700'],
  lightcyan: nextGenColors['cyan-800'],
  darkblue: nextGenColors['blue-100'],
  darkindigo: nextGenColors['indigo-100'],
  darkpurple: nextGenColors['purple-100'],
  darkpink: nextGenColors['pink-100'],
  darkred: nextGenColors['red-100'],
  darkorange: nextGenColors['orange-100'],
  darkyellow: nextGenColors['yellow-100'],
  darkgreen: nextGenColors['green-100'],
  darkteal: nextGenColors['teal-100'],
  darkcyan: nextGenColors['cyan-100'],
  text: {
    primary: nextGenColors['gray-400'],
    secondary: nextGenColors['gray-100'],
    message: 'white',
    fieldHelper: nextGenColors['gray-400'],
  },
  background,
  backgroundBase,
  backgroundSecondary,
  backgroundCard,
  backgroundSuggestion,
  backgroundHover,
  font,
  badge,
  codeEditor,
  critical: {
    dark: nextGenColors['red-100'],
  },
  common,
};
