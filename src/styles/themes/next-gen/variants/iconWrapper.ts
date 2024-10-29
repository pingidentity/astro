const circle = {
  '&.is-circle': {
    borderRadius: '50%',
  },
};

const iconWrapper = {
  sm: {
    borderRadius: '4px',
    minHeight: '32px',
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: '7px',
    ...circle,
  },
  md: {
    borderRadius: '4px',
    minHeight: '48px',
    minWidth: '48px',
    height: '48px',
    width: '48px',
    p: '12px',
    ...circle,
  },
  lg: {
    borderRadius: '16px',
    minHeight: '104px',
    minWidth: '104px',
    height: '104px',
    width: '104px',
    p: '28px',
    ...circle,
  },
};

export default {
  ...iconWrapper,
};
