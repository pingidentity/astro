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
    backgroundColor: '#155CBA !important',
    '& span': {
      color: 'active_light',
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
    ...baseBadge,
  },
  success: {
    backgroundColor: '#0E4326 !important',
    '& span': {
      color: 'success_light',
    },
  },
  danger: {
    backgroundColor: '#83231A !important',
    '& span': {
      color: 'critical_light',
    },
  },
  warning: {
    backgroundColor: '#664A1C !important',
    '& span': {
      color: 'yellow-100',
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
    backgroundColor: '#F6F8FA !important',
    '& span': {
      color: 'black',
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
