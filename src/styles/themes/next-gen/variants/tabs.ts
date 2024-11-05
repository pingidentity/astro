export const tabs = {
  gap: '0px',
};

export const menuTab = {
  ml: '0px !important',
};

export const tab = {
  borderRadius: '2px',
  pt: '.5rem',
  '& > span': {
    px: '1rem',
    fontSize: '.9375rem',
  },
  '&.is-focused': {
    boxShadow: 'none',
    outline: '3px solid',
    outlineColor: 'active',
    outlineOffset: '1px',
    '& > span': {
      outline: 'none',
    },
  },
  '& > div': {
    borderBottom: '3px solid',
    borderBottomColor: 'primary',
    ml: '0px',
  },
};
