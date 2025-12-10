const container = {
  fontFamily: 'standard',
  justifyContent: 'center',
  backgroundColor: 'gray-800',
};

const wrapper = {
  px: ['1.5rem', '1.5rem', '1.5rem', '3rem', '3rem', '3rem'],
  py: 'sm',
  maxWidth: '1540px',
  mx: 'auto',
  width: '100%',
  flexDirection: [
    'column',
    'column',
    'column',
    'column',
    'column',
    'row',
  ],
  justifyContent: 'space-between',
  alignItems: 'center',
};

const footerLeftSection = {
  columnGap: 'sm',
  flexDirection: [
    'column',
    'column',
    'column',
    'column',
    'column',
    'row',
  ],
};

const footerNav = {
  listStyle: 'none',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: ['center', 'center', 'center', 'center', 'center', 'flex-end'],
  gap: 'xs',
  flexWrap: 'wrap',
  my: 'sm',
};

export const footer = {
  container,
  wrapper,
  footerLeftSection,
  footerNav,
};
