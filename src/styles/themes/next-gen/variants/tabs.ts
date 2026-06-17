export const tabs = {
  '&.is-horizontal': {
    gap: '0px',
  },
};

export const menuTab = {
  ml: '0px !important',
};

export const tab = {
  borderRadius: '2px',
  '& > span': {
    px: 'md',
    fontSize: 'md',
  },
  '&.is-focused': {
    boxShadow: 'none',
    outline: '1px solid',
    outlineColor: 'active',
    outlineOffset: '0px',
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

export const tabLine = {
  height: '3px',
};
