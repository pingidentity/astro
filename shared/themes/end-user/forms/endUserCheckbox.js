import text from '../endUserText';

const endUserCheckbox = {
  ...text.base,
  color: 'line.hairline',
  mr: 'sm',
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
  },
};

export const defaultThemeOverrides = defaultTheme => ({
  color: defaultTheme.configuration.buttonColor,
});

export default endUserCheckbox;
