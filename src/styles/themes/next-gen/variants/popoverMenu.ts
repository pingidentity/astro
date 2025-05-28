const container = {
  transition: 'opacity 200ms ease',
  opacity: 0,
  '&.is-mounted.is-transitioning': {
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
