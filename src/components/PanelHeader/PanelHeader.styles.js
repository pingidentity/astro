const container = {
  bg: 'accent.99',
  borderBottom: '1px',
  borderBottomColor: 'accent.90',
  borderBottomStyle: 'solid',
  justifyContent: 'center',
  minHeight: 60,
};

const emptyData = {
  flexShrink: 0,
  alignItems: 'center',
};

const data = {
  ...emptyData,
  flexShrink: 1,
  mr: 'sm',
};

const controls = {
  alignItems: 'center',
  alignSelf: 'center',
  flexShrink: 0,
  gap: 'sm',
  ml: 'auto',
  mr: 'md',
};

const wrapper = {
  display: 'flex',
  flex: '1 1 0px',
};

const rightOfData = {
  alignSelf: 'center',
};

export default {
  container,
  controls,
  data,
  emptyData,
  rightOfData,
  wrapper,
};
