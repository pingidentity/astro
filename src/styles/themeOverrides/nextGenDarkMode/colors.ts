import chroma from 'chroma-js';

import { nextGenColors } from '../../themes/next-gen/tokens/colorTokens';

export const overrides = {
  neutral: {
    90: '#455469',
  },
  disabled: '#30373f',
};

const hoverDark = chroma.mix('#23282e', 'white', 0.04, 'rgb').hex();

const border = {
  base: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
  dark: chroma.mix('#23282e', 'white', 0.25, 'rgb').hex(),
  input: nextGenColors['gray-500'],
  separator: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
};

const iconWrapper = {
  wrapper: {
    orange: nextGenColors['orange-500'],
    cyan: nextGenColors['cyan-500'],
    green: nextGenColors['green-500'],
    purple: nextGenColors['purple-500'],
    pink: nextGenColors['pink-500'],
    red: nextGenColors['red-500'],
    yellow: nextGenColors['yellow-500'],
    teal: nextGenColors['teal-500'],
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
  },
};

export const colors = {
  border,
  iconWrapper,
  ...overrides,
  light: nextGenColors['gray-900'],
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
  background: {
    base: nextGenColors['gray-900'],
    secondary: '#1a1e22',
    card: '#1a1e22',
    hover: hoverDark,
  },
};
