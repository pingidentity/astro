const nextGen = {
  color: 'gray-800',
  fontSize: 'md',
  py: 'sm',
  px: 'md',
  textDecoration: 'none',
  borderRadius: '4px',
  lineHeight: '22.5px',
  minHeight: '22.5px',
  fontFamily: 'standard',
  '&.is-hovered': {
    color: '#155cba',
  },
  '&.is-pressed': {
    color: '#155cba',
  },
};

const sideNav = {
  ...nextGen,
  px: '0',
  display: 'block',
  position: 'relative',
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
    color: '#155cba',
    '&:before': {
      backgroundColor: 'active_light',
    },
  },
};

export default {
  nextGen,
  sideNav,
};
