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

export default {
  nextGen,
  sideNav,
  footerLinks,
  footerHeader,
  copyRightLink,
  footerLink,
  footerEALink,
};
