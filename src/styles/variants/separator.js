const base = {
  bg: 'neutral.80',
  width: '100%',
  height: '1px',
  my: '5px',
  '&.is-vertical': {
    width: '1px',
    height: '100%',
    mx: '5px',
  },
};

const navBarSeparator = {
  ...base,
  width: '100%',
  backgroundColor: 'neutral.60',
};

const navBarSubtitleSeparator = {
  ...base,
  ml: '45px',
  width: 'calc(100% - 75px)',
  mb: '15px',
  backgroundColor: 'neutral.60',
};

export default {
  base,
  navBarSeparator,
  navBarSubtitleSeparator,
};
