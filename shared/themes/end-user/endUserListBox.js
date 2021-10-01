/**
 * These styles affect the contents of the select dropdown menu for astro > 0.5.0
 */
const listBox = {
  outline: 'none',
  option: {
    px: 'md',
    py: 'sm',
    alignItems: 'center',
    outline: 'none',
    wordBreak: 'break-word',
    cursor: 'pointer',
    '&.is-selected': {
      pl: 0,
    },
    '&.is-focused': {
      color: 'white',
      bg: 'active',
    },
  },
};

export const defaultThemeOverrides = defaultTheme => ({
  option: {
    '&.is-focused': {
      color: defaultTheme.configuration.buttonTextColor,
      bg: defaultTheme.configuration.buttonColor,
    },
  },
});

export default listBox;
