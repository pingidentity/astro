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

export default {
  nextGen,
  sideNav,
  footerLinks,
  footerHeader,
};
