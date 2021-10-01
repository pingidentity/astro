const endUserRadio = {
  width: 20,
  height: 20,
  color: 'line.hairline',
  mr: 'sm',
  // override the default focus styling
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    bg: 'highlight',
  },
};

export const defaultThemeOverrides = defaultTheme => ({
  color: defaultTheme.configuration.buttonColor,
});

export default endUserRadio;
