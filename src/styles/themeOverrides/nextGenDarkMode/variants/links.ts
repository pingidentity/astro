import { astroTokensDark } from '@pingux/onyx-tokens';

const nextGen = {
  color: 'text.primary',
  '&.is-hovered': {
    color: '#72a9f1',
  },
  '&.is-pressed': {
    color: '#72a9f1',
  },
};
const sideNav = {
  color: 'text.primary',
  '&.is-hovered': {
    color: '#72a9f1',
  },
  '&.is-pressed': {
    color: '#72a9f1',
  },
};

const footerLinks = {
  ...sideNav,
};

const footerHeader = {
  ...footerLinks,
  fontWeight: '2',
};

const copyRightLink = {
  ...nextGen,
  color: astroTokensDark.color.gray[400],
};

const footerLink = {
  ...nextGen,
  color: astroTokensDark.color.gray[400],
};

const footerEALink = {
  ...nextGen,
  color: astroTokensDark.color.gray[400],
};

const app = {
  color: astroTokensDark.color.blue[400],
  '&.is-hovered': {
    textDecoration: 'underline',
    textDecorationColor: astroTokensDark.color.blue[300],
    color: astroTokensDark.color.blue[300],
  },
  '&.is-pressed': {
    color: astroTokensDark.color.blue[300],
    textDecorationColor: astroTokensDark.color.blue[300],
    textDecoration: 'underline',
  },
  '&:visited': {
    color: astroTokensDark.color.purple[100],
  },
};

export default {
  app,
  nextGen,
  sideNav,
  footerLinks,
  footerHeader,
  copyRightLink,
  footerLink,
  footerEALink,
};
