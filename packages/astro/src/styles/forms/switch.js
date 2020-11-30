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
  width: 33,
  height: 18,
  color: 'active',
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'active',
  borderRadius: 9999,
  '.is-selected &': {
    bg: 'active',
  },
  '.is-focused &': {
    boxShadow: 'focus',
  },
  '&:focus': {
    outline: 'none',
  },
};

export const thumb = {
  ml: -1,
  width: 16,
  height: 18,
  borderRadius: 9999,
  border: '1px solid',
  borderColor: 'active',
  bg: 'white',
  transitionProperty: 'transform',
  transitionTimingFunction: 'ease-out',
  transitionDuration: '0.1s',
  transform: 'translateX(0)',
  '.is-selected &': {
    transform: 'translateX(16px)',
  },
};
