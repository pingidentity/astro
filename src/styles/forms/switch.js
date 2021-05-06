export const label = {
  alignItems: 'center',
};

export const container = {
  mr: 5,
};

export const thumbContainer = {
  appearance: 'none',
  m: 0,
  p: 0,
  width: 42,
  height: 22,
  color: 'neutral.80',
  bg: 'neutral.80',
  border: '1px solid',
  borderColor: 'neutral.80',
  borderRadius: 9999,
  '.is-selected &': {
    bg: 'active',
    borderColor: 'active',
  },
  '.is-focused &': {
    boxShadow: 'focus',
  },
  '&:focus': {
    outline: 'none',
  },
};

export const thumb = {
  width: 20,
  height: 22,
  borderRadius: 9999,
  border: '1px solid',
  borderColor: 'neutral.80',
  bg: 'white',
  boxShadow: 'standard',
  transitionProperty: 'transform',
  transitionTimingFunction: 'ease-out',
  transitionDuration: '0.1s',
  transform: 'translateX(0)',
  '.is-selected &': {
    transform: 'translateX(20px)',
    borderColor: 'active',
  },
};
