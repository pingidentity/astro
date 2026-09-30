export const tabs = {
  mb: 'md',
  '&.is-horizontal': {
    gap: '0px',
  },
};

export const tabPickerExpandIcon = {
  ml: 'sm',
  width: '16px',
  height: '16px',
};

export const menuTab = {
  ml: '0px !important',
};

export const tab = {
  borderRadius: '2px',
  '& > span': {
    px: 'md',
    fontSize: 'md',
    mb: 'sm',
    mt: 'sm',
    minWidth: 0,
  },
  '&.is-focused': {
    boxShadow: 'none',
    outline: '1px solid',
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

export const tabLine = {
  height: '3px',
};
