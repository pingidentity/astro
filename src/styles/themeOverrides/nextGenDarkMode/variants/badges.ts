const baseBadge = {
  color: 'badge.textColor',
};

const primary = {
  backgroundColor: '#1a73e8 !important',
  color: 'black',
};

const secondary = {
  backgroundColor: '#324054 !important',
  color: 'gray-100',
};

const success = {
  backgroundColor: '#22a75f !important',
  color: 'black',
};

const danger = {
  backgroundColor: '#da3a2b !important',
  color: 'black',
};

const warning = {
  backgroundColor: '#ffb946 !important',
  color: 'black',
};

const info = {
  backgroundColor: '#324054 !important',
  color: 'gray-100',
};

const dark = {
  backgroundColor: '#c0c9d5 !important',
  color: 'gray-100',
};

const activeStatusBadge = {
  ...primary,
};

const warningStatusBadge = {
  ...warning,
};

const criticalStatusBadge = {
  ...danger,
};

const healthyStatusBadge = {
  ...success,
};

const secondaryStatusBadge = {
  ...secondary,
};

const countBadge = {
  backgroundColor: '#F6F8FA !important',
  '& span': {
    color: 'black',
  },
};

const countNeutral = {
  backgroundColor: '#455469 !important',
  '& span': {
    color: 'white',
  },
};

const readOnlyBadge = {
  color: 'gray-100',
  backgroundColor: '#23282E !important',
  borderColor: 'border.attachment',
  '& span': {
    color: 'gray-100',
  },
};

const readOnlyFieldBadge = {
  color: 'gray-100',
  backgroundColor: '#23282E !important',
  borderColor: 'border.attachment',
  '& span': {
    color: 'gray-100',
  },
};

const selectedItemBadge = {
  backgroundColor: '#155CBA !important',
  '& span': {
    color: 'gray-100',
  },
};

const itemBadgeWithSlot = {
  ...selectedItemBadge,
  '& svg': {
    path: {
      fill: 'gray-100',
    },
  },
};

const badges = {
  baseBadge,
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  dark,
  activeStatusBadge,
  warningStatusBadge,
  criticalStatusBadge,
  healthyStatusBadge,
  secondaryStatusBadge,
  countBadge,
  countNeutral,
  selectedItemBadge,
  readOnlyBadge,
  readOnlyFieldBadge,
  itemBadgeWithSlot,
  errorCalloutBadge: {
    backgroundColor: '#23282e !important',
    '& span': {
      color: 'font.base',
    },
  },
  infoCalloutBadge: {
    backgroundColor: '#23282e !important',
    '& span': {
      color: 'font.base',
    },
  },
  successCalloutBadge: {
    backgroundColor: '#23282e !important',
    '& span': {
      color: 'font.base',
    },
  },
  warningCalloutBadge: {
    backgroundColor: '#23282e !important',
    '& span': {
      color: 'font.base',
    },
  },
};


export default badges;
