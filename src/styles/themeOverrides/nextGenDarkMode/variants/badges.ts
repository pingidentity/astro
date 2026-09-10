import { astroTokensDark } from '@pingux/onyx-tokens';

const baseBadge = {
  '& span': {
    color: 'badge.textColor',
  },
};

const primary = {
  backgroundColor: '#1a73e8 !important',

  '& span': {
    color: 'black',
  },
};

const secondary = {
  backgroundColor: '#324054 !important',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const success = {
  backgroundColor: '#22a75f !important',
  '& span': {
    color: 'black',
  },
};

const danger = {
  backgroundColor: '#da3a2b !important',
  '& span': {
    color: 'black',
  },
};

const warning = {
  backgroundColor: '#ffb946 !important',
  '& span': {
    color: 'black',
  },
};

const info = {
  backgroundColor: '#324054 !important',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const dark = {
  backgroundColor: '#c0c9d5 !important',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const activeStatusBadge = {
  ...primary,
  '& svg': {
    color: 'inherit',
    path: { fill: 'black' },
  },
};

const warningStatusBadge = {
  ...warning,
  '& svg': {
    color: 'inherit',
    path: { fill: 'black' },
  },
};

const criticalStatusBadge = {
  ...danger,
  '& svg': {
    color: 'inherit',
    path: { fill: 'black' },
  },
};

const healthyStatusBadge = {
  ...success,
  '& svg': {
    color: 'inherit',
    path: { fill: 'black' },
  },
};

const secondaryStatusBadge = {
  ...secondary,
  '& svg': {
    color: 'inherit',
    path: { fill: astroTokensDark.color.gray[100] },
  },
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
  color: astroTokensDark.color.gray[100],
  backgroundColor: '#23282E !important',
  borderColor: 'border.attachment',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const readOnlyFieldBadge = {
  color: astroTokensDark.color.gray[100],
  backgroundColor: '#23282E !important',
  borderColor: 'border.attachment',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const selectedItemBadge = {
  backgroundColor: '#155CBA !important',
  '& span': {
    color: astroTokensDark.color.gray[100],
  },
};

const itemBadgeWithSlot = {
  ...selectedItemBadge,
  '& svg': {
    path: {
      fill: astroTokensDark.color.gray[100],
    },
  },
};

const tableBaseBadgeSpanStyle = {
  fontSize: '11.25px',
  lineHeight: '1',
};

const tableBaseBadge = {
  active: {
    backgroundColor: `${astroTokensDark.color.blue[500]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokensDark.color.black,
    },
  },
  warning: {
    backgroundColor: `${astroTokensDark.color.yellow[500]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokensDark.color.black,
    },
  },
  critical: {
    backgroundColor: `${astroTokensDark.color.red[500]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokensDark.color.black,
    },
  },
  healthy: {
    backgroundColor: `${astroTokensDark.color.green[500]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokensDark.color.black,
    },
  },
  secondary: {
    backgroundColor: `${astroTokensDark.color.gray[500]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokensDark.color.black,
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
  selected: activeStatusBadge,
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
  tableBaseBadge,
};


export default badges;
