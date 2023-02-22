export const wordWrap = {
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
};

const baseFont = {
  ...wordWrap,
  fontFamily: 'standard',
  WebkitFontSmoothing: 'antialiased',
  textTransform: 'none',
};

const fieldHelperText = {
  title: {
    ...baseFont,
    fontSize: 'md',
    p: '15px !important',
    minWidth: 169,
    borderRadius: '0 0 2px 2px',
    animation: 'fade-down-in 0.2s',
    '&::first-letter': {
      textTransform: 'uppercase !important',
    },
    '&.is-default': {
      backgroundColor: 'fieldHelperText.defaultBackground',
      color: 'fieldHelperText.default',
    },
    '&.is-error': {
      backgroundColor: 'fieldHelperText.errorBackground',
      color: 'fieldHelperText.error',
    },
  }
};

const endUserText = {
  base: {
    ...baseFont,
    color: 'neutral.20',
    fontSize: 'md',
  },
  bodyWeak: {
    ...baseFont,
    fontSize: 'sm',
    color: 'text.secondary',
  },
  heading: {
    ...baseFont,
    color: 'neutral.20',
    fontWeight: '400',
    fontSize: 'lg',
    fontFamily: 'standard',
  },
  title: {
    ...baseFont,
    color: 'neutral.20',
    fontWeight: '400',
    fontSize: 'lg',
    fontFamily: 'standard',
  },
  subheading: {
    ...baseFont,
    fontSize: 'md',
  },
  label: {
    ...baseFont,
    fontSize: 15,
    fontWeight: 600,
    color: 'text.secondary',
  },
  input: {
    ...baseFont,
    color: 'neutral.30',
    fontSize: 15,
    fontWeight: 600,
  },
  fieldHelperText,
};

export const defaultThemeOverrides = defaultTheme => ({
  heading: {
    color: defaultTheme.configuration.headingTextColor,
  },
  subheading: {
    color: defaultTheme.configuration.headingTextColor,
  },
  base: {
    color: defaultTheme.configuration.bodyTextColor,
  },
});

export default endUserText;
