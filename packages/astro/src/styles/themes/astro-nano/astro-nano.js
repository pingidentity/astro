import chroma from 'chroma-js';
import { merge } from 'theme-ui';

import astroTheme from '../../theme';

const scaleFont = 1.2;
const borderRadius = 4;

const focusStyles = {
  boxShadow: 'none',
  outline: '1px solid #000000',
  outlineOffset: 2,
  outlineColor: 'active',
};

const inputFocusStyles = {
  borderColor: 'active',
  outline: '4px solid #000000',
  outlineColor: 'accent.90',
};

const baseButton = {
  borderRadius,
  fontWeight: 400,
  height: '50px',
  '&.is-hovered': {
    boxShadow: 'none',
    color: 'white',
    bg: 'activeDark',
  },
  '&.is-pressed': {
    bg: 'activeDarker',
  },
  '&:focus-visible': focusStyles,
  '&.is-focused': focusStyles,
};

const linkStyles = {
  '&.is-hovered': {
    color: 'activeDark',
  },
  '&.is-pressed': {
    color: 'activeDarker',
  },
};

const modifyTheme = {
  buttons: {
    default: {
      color: 'active',
      ...baseButton,
    },
    primary: {
      ...baseButton,
    },
  },
  cards: {
    container: {
      borderRadius,
      flexGrow: [1, 0],
      maxWidth: astroTheme.breakpoints[0],
      bg: 'white',
      alignItems: 'stretch',
      py: [0, 'xl'],
      my: 'auto',
      boxShadow: ['none', astroTheme.cards.container.boxShadow],
      width: ['100%', '450px'],
      minHeight: 'fit-content',
    },
    cardBody: {
      flexGrow: [1, 0],
    },
  },
  colors: {
    activeDark: chroma(astroTheme.colors.active).darken(0.5).hex(),
    activeDarker: chroma(astroTheme.colors.active).darken(1).hex(),
  },
  fontSizes: {
    xs: scaleFont * astroTheme.fontSizes.xs,
    sm: scaleFont * astroTheme.fontSizes.sm,
    md: scaleFont * astroTheme.fontSizes.md,
    lg: scaleFont * astroTheme.fontSizes.lg,
    xl: scaleFont * astroTheme.fontSizes.xl,
    xx: scaleFont * astroTheme.fontSizes.xx,
    xxx: '48px',
  },
  forms: {
    input: {
      fontSize: 'md',
      borderRadius,
      height: '50px',
      '&:focus': inputFocusStyles,
      primary: {
        ...astroTheme.forms.input,
        borderRadius,
        fontSize: 'xxx',
        borderColor: 'neutral.60',
        height: '75px',
        textAlign: 'center',
        letterSpacing: '12px',
        fontWeight: 'bold',
        '&:focus': inputFocusStyles,
      },
    },
  },
  links: {
    web: linkStyles,
    app: linkStyles,
  },
  text: {
    title: {
      fontWeight: 700,
    },
    footer: {
      color: 'text.secondary',
      fontSize: 'xs',
    },
    label: {
      color: 'text.primary',
    },
  },
  variants: {
    wrapper: {
      alignItems: 'center',
      justifyContent: 'space-between',
      bg: ['white', 'accent.99'],
      py: 'lg',
      gap: 'lg',
      overflow: 'auto',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

export default merge(astroTheme, modifyTheme);
