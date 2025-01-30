const nextGen = {
  color: 'gray-800',
  fontSize: 'md',
  py: 'sm',
  px: 'md',
  textDecoration: 'none',
  borderRadius: '4px',
  lineHeight: '1.5',
  minHeight: '22.5px',
  fontFamily: 'standard',
  cursor: 'pointer',
  '&.is-hovered': {
    color: 'blue-600',
  },
  '&.is-pressed': {
    color: 'blue-600',
  },
};

const onyx = {
  ...nextGen,
};

const sideNav = {
  ...nextGen,
  px: '0',
  display: 'block',
  position: 'relative',
  cursor: 'pointer',
  '&:before': {
    position: 'absolute',
    display: 'block',
    borderRadius: '.25rem',
    content: '""',
    top: '0',
    right: '-1rem',
    bottom: 0,
    left: '-1rem',
    transition: 'background-color .15s ease',
  },
  '&.is-selected': {
    color: 'blue-600',
    '&:before': {
      backgroundColor: 'active_light',
    },
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
  onyx,
  sideNav,
  footerLinks,
  footerHeader,
};
