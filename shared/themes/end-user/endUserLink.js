const endUserLink = {
  color: 'active',
  textDecoration: 'none',
  fontFamily: 'standard',
  outline: 'none',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    textDecoration: 'underline',
  },
  '&.is-disabled': {
    pointerEvents: 'none',
  },
};

export const defaultThemeOverrides = defaultTheme => ({
  color: defaultTheme.configuration.linkTextColor,
});

export default endUserLink;
