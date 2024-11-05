const badgeFont = {
  fontSize: '11.25px',
  fontWeight: 2,
};

const baseBadge = {
  alignItems: 'center',
  justifyContent: 'center',
  py: '.25em',
  px: '.4em',
  borderRadius: '4px',
  fontSize: '11.25px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  width: 'fit-content',
  '& span': {
    ...badgeFont,
  },
};

const badges = {
  primary: {
    backgroundColor: '#1a73e8 !important',
    '& span': {
      color: 'black',
    },
  },
  secondary: {
    ...baseBadge,
    backgroundColor: '#324054 !important',
    '& span': {
      ...badgeFont,
      color: 'gray-400',
    },
  },
  baseBadge: {
    backgroundColor: '#324054 !important',
    '& span': {
      color: 'dark',
    },
  },
  success: {
    backgroundColor: '#2ed47a !important',
    '& span': {
      color: 'black',
    },
  },
  danger: {
    backgroundColor: '#f7685b !important',
    '& span': {
      color: 'black',
    },
  },
  warning: {
    backgroundColor: '#984c0c !important',
    '& span': {
      color: 'black',
    },
  },
  info: {
    ...baseBadge,
    backgroundColor: '#324054 !important',
    '& span': {
      color: 'dark',
      ...badgeFont,
    },
  },
  dark: {
    backgroundColor: '#c0c9d5 !important',
    '& span': {
      color: 'gray-900',
    },
  },
  selectedItemBadge: {
    ...baseBadge,
    backgroundColor: '#1a73e8 !important',
    paddingRight: '0px !important',
    pl: '10px',
    '& span': {
      ...badgeFont,
      fontSize: '14px',
      color: 'gray-400',
      fontWeight: 400,
    },
  },


};


export default badges;
