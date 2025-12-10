const base = {
  bg: 'neutral.80',
  width: '100%',
  height: '1px',
  my: '5px',
  flexShrink: 0,
  '&.is-vertical': {
    width: '1px',
    height: '100%',
    mx: '5px',
  },
};

const navBarSeparator = {
  ...base,
  width: 'auto',
  my: 'md',
  mx: 'md',
  backgroundColor: 'neutral.60',
};

const navBarSubtitleSeparator = {
  ...navBarSeparator,
  ml: '45px',
};

export default {
  base,
  navBarSeparator,
  navBarSubtitleSeparator,
};
