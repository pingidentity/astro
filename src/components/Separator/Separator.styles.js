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
  my: 0,
};

const navBarSubtitleSeparator = {
  ...base,
  mt: '15px',
  mb: '15px',
  ml: '45px',
  width: 'calc(100% - 60px)',
  backgroundColor: 'neutral.60',
};

export default {
  base,
  navBarSeparator,
  navBarSubtitleSeparator,
};
