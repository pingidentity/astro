const container = {
  backgroundColor: 'light',
  mt: '12px',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'gray-200',
  position: 'relative',
  maxWidth: '15rem',
  minWidth: '15rem',
  '&.is-full-screen': {
    maxWidth: '20rem',
    minWidth: '20rem',
  },
};

const iconWrapper = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
};

export default {
  container,
  iconWrapper,
};
