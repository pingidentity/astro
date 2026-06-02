import { astroTokens } from '@pingux/onyx-tokens';

import { nextGenColors } from '../tokens/colorTokens';

import { iconWrapper } from './iconWrapper';
import twoTone from './twoTone';

const subColors = {
  lightblue: astroTokens.color.blue[100],
  lightindigo: astroTokens.color.indigo[100],
  lightpurple: astroTokens.color.purple[100],
  lightpink: astroTokens.color.pink[100],
  lightred: astroTokens.color.red[100],
  lightorange: astroTokens.color.orange[100],
  lightyellow: astroTokens.color.yellow[100],
  lightgreen: astroTokens.color.green[100],
  lightteal: astroTokens.color.teal[100],
  lightcyan: astroTokens.color.cyan[100],

  darkblue: astroTokens.color.blue[600],
  darkindigo: astroTokens.color.indigo[700],
  darkpurple: astroTokens.color.purple[500],
  darkpink: astroTokens.color.pink[600],
  darkred: astroTokens.color.red[700],
  darkorange: astroTokens.color.orange[700],
  darkyellow: astroTokens.color.yellow[800],
  darkgreen: astroTokens.color.green[800],
  darkteal: astroTokens.color.teal[700],
  darkcyan: astroTokens.color.cyan[800],
  mediumblue: astroTokens.color.blue[600],
  mediumindigo: astroTokens.color.indigo[600],
  mediumpurple: astroTokens.color.purple[600],
  mediumpink: astroTokens.color.pink[600],
  mediumred: astroTokens.color.red[600],
  mediumorange: astroTokens.color.orange[600],
  mediumyellow: astroTokens.color.yellow[600],
  mediumgreen: astroTokens.color.green[700],
  mediumteal: astroTokens.color.teal[600],
  mediumcyan: astroTokens.color.cyan[700],

  primary: astroTokens.color.primary,
  secondary: astroTokens.color.gray[600],
  info: astroTokens.color.primary,
  danger: astroTokens.color.critical,
  light: astroTokens.color.gray[100],
  dark: astroTokens.color.gray[800],
};

const colorsObject = {
  blue: astroTokens.color.blue[500],
  indigo: astroTokens.color.indigo[500],
  purple: astroTokens.color.purple[500],
  pink: astroTokens.color.pink[500],
  red: astroTokens.color.red[500],
  orange: astroTokens.color.orange[500],
  yellow: astroTokens.color.yellow[500],
  green: astroTokens.color.green[500],
  teal: astroTokens.color.teal[500],
  cyan: astroTokens.color.cyan[500],
  active: astroTokens.color.blue[500],
};

export const critical = {
  bright: colorsObject.red,
  dark: astroTokens.color.red.dark,
  light: astroTokens.color.red.light,
};

export const success = {
  bright: astroTokens.color.green[500],
  dark: astroTokens.color.green.dark,
  light: astroTokens.color.green.light,
};
export const warning = {
  bright: colorsObject.yellow,
  dark: astroTokens.color.yellow.dark,
  light: astroTokens.color.yellow.light,
};

export const info = {
  bright: colorsObject.blue,
  dark: astroTokens.color.blue.dark,
  light: astroTokens.color.blue.light,
};

const text = {
  primary: astroTokens.color.font.base,
  secondary: astroTokens.color.font.light,
  message: astroTokens.color.gray[700],
  fieldHelper: astroTokens.color.gray[500],
};

const border = {
  base: astroTokens.color.gray[300],
  input: astroTokens.color.gray[500],
  separator: astroTokens.color.gray[200],
  hairline: astroTokens.color.common.border,
};

const overrides = {
  neutral: {
    80: '#69788B',
  },
  focus: colorsObject.active,
  disabled: astroTokens.color.gray[100],
};

const background = astroTokens.color.blue[100];
const backgroundBase = 'white';
const backgroundSecondary = astroTokens.color.gray[100];
const backgroundCard = astroTokens.color.blue[100];
const backgroundSuggestion = '#ecf0f5';
const backgroundHover = astroTokens.color.gray[100];

const card = {
  blue: astroTokens.color.blue[100],
  gray: astroTokens.color.gray[100],
};

const badge = {
  textColor: astroTokens.color.font.base,
  background: astroTokens.color.gray[100],
};

const codeEditor = {
  backgroundColor: astroTokens.color.gray[900],
  headerColor: astroTokens.color.gray[900],
};

const tooltip = 'black';

const environmentBadge = {
  text: astroTokens.color.blue[500],
  background: astroTokens.color.blue[100],
};

const colors = {
  ...subColors,
  ...nextGenColors,
  ...overrides,
  badge,
  card,
  critical,
  success,
  warning,
  info,
  text,
  border,
  active: colorsObject.blue,
  primary: colorsObject.blue,
  background,
  backgroundBase,
  backgroundSecondary,
  backgroundCard,
  backgroundSuggestion,
  backgroundHover,
  iconWrapper,
  tooltip,
  environmentBadge,
  codeEditor,
  twoTone,
};

export default colors;
