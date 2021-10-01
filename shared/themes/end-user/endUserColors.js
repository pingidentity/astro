const textColors = {
  secondary: '#798087',
  active: '#2996cc',
};

const fieldHelperTextColors = {
  default: '#3d454d',
  defaultBackground: '#e1eef5',
  error: '#a31300',
  errorBackground: '#eddad9',
};

const endUserColors = {
  active: '#2996cc',
  activeHover: '#3d88ae',
  critical: '#a31300',
  warning: '#eeb91c',
  success: '#21934c',
  neutral: {
    10: '#575f67',
    20: '#686f77',
    30: '#798087',
    40: '#8b9197',
    50: '#9da2a8',
    60: '#afb4b8',
    70: '#c2c6ca',
    80: '#d5d8db',
    90: '#e8ebed',
    95: '#f8f8f8',
  },
  line: {
    hairline: '#8b9197',
  },
  card: '#FFFFFF',
  background: '#EDEDED',
  text: textColors,
  fieldHelperText: fieldHelperTextColors,
};

const airColors = {
  button: '#FF6600',
  buttonText: '#FFFFFF',
  bodyText: '#341C0B',
  headingText: '#002942',
  link: '#313B87',
  card: '#FFFFFF',
  background: '#F0F8FF',
  headerBackground: '#002942',
};

const focusColors = {
  button: '#cb0020',
  buttonText: '#ffffff',
  bodyText: '#4a4a4a',
  headingText: '#cb0020',
  link: '#2996cc',
  card: '#fcfcfc',
  background: '#ededed',
};

const muralColors = {
  button: '#61b375',
  buttonText: '#ffffff',
  bodyText: '#000000',
  headingText: '#000000',
  link: '#2996cc',
  card: '#fcfcfc',
  background: '',
};

const pingDefaultColors = {
  button: '#2996cc',
  buttonText: '#ffffff',
  bodyText: '#686f77',
  headingText: '#686f77',
  link: '#2996cc',
  card: '#ffffff',
  background: '#ededed',
};

const slateColors = {
  button: '#4A4A4A',
  buttonText: '#FFFFFF',
  bodyText: '#4C4C4C',
  headingText: '#4A4A4A',
  link: '#5F5F5F',
  card: '#FFFFFF',
  background: '',
};

const splitColors = {
  button: '#263956',
  buttonText: '#ffffff',
  bodyText: '#263956',
  headingText: '#686f77',
  link: '#263956',
  card: '#fcfcfc',
  background: '#263956',
};

export const templateOverrides = {
  air: airColors,
  focus: focusColors,
  mural: muralColors,
  default: pingDefaultColors,
  slate: slateColors,
  split: splitColors,
};

export const defaultThemeOverrides = defaultTheme => ({
  cardBg: defaultTheme.configuration.cardColor,
  logoBg: defaultTheme.configuration.headerBackgroundColor,
  line: {
    hairline: defaultTheme.configuration.buttonColor,
  },
});

export default endUserColors;
