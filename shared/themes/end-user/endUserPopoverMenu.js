import input from './forms/endUserInput';

/**
 * These styles affect the dropdown box for astro > 0.5.0
 */
const container = {
  ...input,
  position: 'absolute',
  width: '100%',
  padding: 0,
  zIndex: 10000,
  background: 'white',
  boxShadow: 'standard',
};

export const defaultThemeOverrides = defaultTheme => ({
  container: {
    borderColor: defaultTheme.configuration.buttonColor,
  },
});

export default {
  container,
};
