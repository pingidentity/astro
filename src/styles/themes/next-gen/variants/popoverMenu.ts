const container = {
  transition: 'opacity 200ms ease',
  '&.animate': {
    opacity: 0,
  },
  '&.animate.is-mounted.is-transitioning': {
    opacity: '100%',
  },
};

const arrow = {
  color: 'white',
  '&:before': {
    content: '""',
    position: 'absolute',
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
};

export default {
  container,
  arrow,
};
