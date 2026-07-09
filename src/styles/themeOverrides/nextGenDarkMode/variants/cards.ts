import { astroTokensDark } from '@pingux/onyx-tokens';

const cards = {
  dark: {
    border: '1px solid',
    borderColor: 'border.attachment',
    boxShadow: 'standard',
    bg: 'transparent',
  },
  light: {
    border: '1px solid',
    borderColor: 'border.attachment',
    boxShadow: 'standard',
    bg: 'transparent',
  },
  withShadow: {
    boxShadow: 'none',
    borderColor: 'border.attachment',
    backgroundColor: 'transparent',
  },
  interactive: {
    borderColor: 'border.attachment',
  },
  container: {
    borderColor: 'border.attachment',
  },
  activeCard: {
    borderColor: 'border.attachment',
  },
  tableWrapper: {
    borderColor: astroTokensDark.color.common.border,
  },
};
export default cards;
