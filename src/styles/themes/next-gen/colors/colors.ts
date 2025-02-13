import { nextGenColors } from '../tokens/colorTokens';

import { iconWrapper } from './iconWrapper';

const subColors = {
  lightblue: nextGenColors['blue-100'],
  lightindigo: nextGenColors['indigo-100'],
  lightpurple: nextGenColors['purple-100'],
  lightpink: nextGenColors['pink-100'],
  lightred: nextGenColors['red-100'],
  lightorange: nextGenColors['orange-100'],
  lightyellow: nextGenColors['yellow-100'],
  lightgreen: nextGenColors['green-100'],
  lightteal: nextGenColors['teal-100'],
  lightcyan: nextGenColors['cyan-100'],

  darkblue: nextGenColors['blue-600'],
  darkindigo: nextGenColors['indigo-700'],
  darkpurple: nextGenColors['purple-500'],
  darkpink: nextGenColors['pink-600'],
  darkred: nextGenColors['red-700'],
  darkorange: nextGenColors['orange-700'],
  darkyellow: nextGenColors['yellow-800'],
  darkgreen: nextGenColors['green-800'],
  darkteal: nextGenColors['teal-700'],
  darkcyan: nextGenColors['cyan-800'],

  mediumblue: nextGenColors['blue-600'],
  mediumindigo: nextGenColors['indigo-600'],
  mediumpurple: nextGenColors['purple-600'],
  mediumpink: nextGenColors['pink-600'],
  mediumred: nextGenColors['red-600'],
  mediumorange: nextGenColors['orange-600'],
  mediumyellow: nextGenColors['yellow-600'],
  mediumgreen: nextGenColors['green-700'],
  mediumteal: nextGenColors['teal-600'],
  mediumcyan: nextGenColors['cyan-700'],

  primary: nextGenColors.blue,
  secondary: nextGenColors['gray-600'],
  info: nextGenColors.blue,
  danger: nextGenColors.red,
  light: nextGenColors['gray-100'],
  dark: nextGenColors['gray-800'],
};

const colorsObject = {
  blue: '#1a73e8',
  indigo: '#BA4DE1',
  purple: '#6f42c1',
  pink: '#d63384',
  red: '#da3a2b',
  orange: '#fd7e14',
  yellow: '#ffb946',
  green: '#22a75f',
  teal: '#17A2B8',
  cyan: '#0dcaf0',
  active: '#1a73e8',
};

export const critical = {
  bright: colorsObject.red,
  dark: nextGenColors['red-600'],
  light: colorsObject.red,
};
export const success = {
  bright: nextGenColors['green-600'],
  dark: nextGenColors['green-800'],
  light: nextGenColors['green-100'],
};
export const warning = {
  bright: colorsObject.yellow,
  dark: nextGenColors['yellow-800'],
  light: nextGenColors['yellow-100'],
};

const text = {
  primary: nextGenColors['gray-900'],
  secondary: nextGenColors['gray-500'],
  message: nextGenColors['gray-700'],
  fieldHelper: nextGenColors['gray-500'],
};

const border = {
  base: nextGenColors['gray-300'],
  input: nextGenColors['gray-500'],
  separator: nextGenColors['gray-200'],
};

const overrides = {
  neutral: {
    80: '#69788B',
  },
  focus: colorsObject.active,
  disabled: nextGenColors['gray-100'],
};

const background = {
  base: 'white',
  secondary: nextGenColors['gray-100'],
  card: nextGenColors['blue-100'],
  suggestion: '#ecf0f5',
};

const card = {
  blue: nextGenColors['blue-100'],
  gray: nextGenColors['gray-100'],
};

const colors = {
  ...subColors,
  ...nextGenColors,
  ...overrides,
  card,
  critical,
  success,
  warning,
  text,
  border,
  active: colorsObject.blue,
  primary: colorsObject.blue,
  background,
  iconWrapper,
};

export default colors;
