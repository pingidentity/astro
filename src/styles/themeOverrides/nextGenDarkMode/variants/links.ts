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
  color: 'gray-400',
};

const footerLink = {
  ...nextGen,
  color: 'gray-400',
};

const footerEALink = {
  ...nextGen,
  color: 'gray-400',
};

const app = {
  color: 'blue-400',
  '&.is-hovered': {
    textDecoration: 'underline',
    textDecorationColor: 'blue-300',
    color: 'blue-300',
  },
  '&.is-pressed': {
    color: 'blue-300',
    textDecorationColor: 'blue-300',
    textDecoration: 'underline',
  },
  '&:visited': {
    color: 'purple-100',
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
