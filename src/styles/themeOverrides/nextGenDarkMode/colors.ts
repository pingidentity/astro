import { astroTokensDark } from '@pingux/onyx-tokens';
import chroma from 'chroma-js';

import { white } from '../../colors';

export const overrides = {
  neutral: {
    90: '#455469',
  },
  disabled: '#30373f',
};

const font = {
  base: astroTokensDark.color.gray[100],
  light: astroTokensDark.color.gray[400],
  link: astroTokensDark.color.blue[400],
};

const hoverDark = chroma.mix('#23282e', 'white', 0.04, 'rgb').hex();

const border = {
  base: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
  dark: '#46505C',
  input: astroTokensDark.color.gray[500],
  separator: chroma.mix('#23282e', 'white', 0.15, 'rgb').hex(),
  attachment: '#39414b',
  hairline: '#737577',
};

const badge = {
  background: astroTokensDark.color.gray[800],
  textColor: astroTokensDark.color.gray[100],
};

const background = {
  base: astroTokensDark.color.gray[900],
  secondary: '#1a1e22',
  card: '#1a1e22',
  hover: hoverDark,
};

const twoTone = {
  bg: {
    orange: astroTokensDark.color.orange[500],
    cyan: astroTokensDark.color.cyan[500],
    green: astroTokensDark.color.green[500],
    purple: astroTokensDark.color.purple[500],
    pink: astroTokensDark.color.pink[500],
    red: astroTokensDark.color.red[500],
    yellow: astroTokensDark.color.yellow[500],
    teal: astroTokensDark.color.teal[500],
    blue: astroTokensDark.color.blue[500],
    white,
    indigo: astroTokensDark.color.indigo[500],
    lightBlue: astroTokensDark.color.blue[600],
    lightPink: astroTokensDark.color.pink[600],
    lightGreen: astroTokensDark.color.green[800],
    lightYellow: astroTokensDark.color.yellow[800],
    lightIndigo: astroTokensDark.color.indigo[700],
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
    lightBlue: astroTokensDark.color.blue[100],
    lightPink: astroTokensDark.color.pink[100],
    lightGreen: astroTokensDark.color.green[100],
    lightYellow: astroTokensDark.color.yellow[100],
    lightIndigo: astroTokensDark.color.indigo[100],
  },
};

const common = {
  dark: '#C0C9D5',
};

const backgroundBase = astroTokensDark.color.gray[900];
const backgroundSecondary = astroTokensDark.color.gray[900];
const backgroundCard = '#1a1e22';
const backgroundSuggestion = '#ecf0f5';
const backgroundHover = hoverDark;

const codeEditor = {
  backgroundColor: backgroundSecondary,
  headerColor: astroTokensDark.color.gray[900],
};

export const colors = {
  border,
  iconWrapper,
  ...overrides,
  twoTone,
  light: '#1A1E22',
  secondary: astroTokensDark.color.gray[400],
  dark: astroTokensDark.color.gray[400],
  lightblue: astroTokensDark.color.blue[600],
  lightindigo: astroTokensDark.color.indigo[700],
  lightpurple: astroTokensDark.color.purple[500],
  lightpink: astroTokensDark.color.pink[600],
  lightred: astroTokensDark.color.red[700],
  lightorange: astroTokensDark.color.orange[700],
  lightyellow: astroTokensDark.color.yellow[800],
  lightgreen: astroTokensDark.color.green[800],
  lightteal: astroTokensDark.color.teal[700],
  lightcyan: astroTokensDark.color.cyan[800],
  darkblue: astroTokensDark.color.blue[100],
  darkindigo: astroTokensDark.color.indigo[100],
  darkpurple: astroTokensDark.color.purple[100],
  darkpink: astroTokensDark.color.pink[100],
  darkred: astroTokensDark.color.red[100],
  darkorange: astroTokensDark.color.orange[100],
  darkyellow: astroTokensDark.color.yellow[100],
  darkgreen: astroTokensDark.color.green[100],
  darkteal: astroTokensDark.color.teal[100],
  darkcyan: astroTokensDark.color.cyan[100],
  text: {
    primary: astroTokensDark.color.gray[400],
    secondary: astroTokensDark.color.gray[100],
    message: 'white',
    fieldHelper: astroTokensDark.color.gray[400],
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
    dark: astroTokensDark.color.red[100],
  },
  common,
};
