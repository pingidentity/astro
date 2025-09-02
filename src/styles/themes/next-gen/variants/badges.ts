import buttons from './button';

const badgeFont = {
  fontSize: '12px',
  fontWeight: 2,
};

const badgeIconStyle = {
  '& span': {
    ...badgeFont,
    color: 'inherit',
  },
  '& button': {
    alignSelf: 'center',
    p: '0',
    bg: 'transparent',
    '&.is-hovered': {
      bg: 'transparent',
      '& svg': {
        path: {
          fill: 'inherit',
        },
      },
    },
  },
  '& svg': {
    path: {
      fill: 'inherit',
    },
  },
};

const baseBadge = {
  alignItems: 'center',
  justifyContent: 'center',
  py: '.25em',
  px: '.4em',
  borderRadius: '4px',
  maxHeight: '18px',
  minHeight: '18px',
  fontSize: '12px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  width: 'fit-content',
  color: 'text.primary',
  ...badgeIconStyle,
};


const primary = {
  ...baseBadge,
  backgroundColor: '#EAF2FD !important',
  color: 'blue-600',
};

const secondary = {
  ...baseBadge,
  backgroundColor: '#f6f8fa !important',
  color: 'gray-900',
};

const success = {
  ...baseBadge,
  backgroundColor: '#D3EDDF !important',
  color: 'success.dark',
};

const danger = {
  ...baseBadge,
  backgroundColor: '#F8D8D5 !important',
  color: 'red-700',
};

const warning = {
  ...baseBadge,
  backgroundColor: '#FFF1DA !important',
  color: 'yellow-800',
};

const dark = {
  ...baseBadge,
  backgroundColor: 'black !important',
  color: 'white',
};

const info = {
  ...baseBadge,
  backgroundColor: '#EAF2FD !important',
  color: 'darkblue',
};

const selectedItemBadge = {
  ...baseBadge,
  backgroundColor: '#eaf2fd !important',
  paddingRight: '0px !important',
  '& span': {
    ...badgeFont,
    color: 'text.primary',
    fontWeight: 400,
  },
};

const readOnlyBadge = {
  ...baseBadge,
  border: 'none',
  '& span': {
    ...badgeFont,
    color: 'text.primary',
    fontWeight: 2,
  },
};

const readOnlyFieldBadge = {
  ...readOnlyBadge,
  '& span': {
    ...badgeFont,
    color: 'white',
  },
};

const itemBadgeWithSlot = {
  ...readOnlyBadge,
  bg: '#f6f8fa !important',
  fontWeight: 2,
  '& span': {
    ...badgeFont,
    color: 'text.primary',
  },
};

export const badgeDeleteButton = {
  ...buttons.iconButtons.base,
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  p: 0,
  width: 14,
};

const dataTableBadge = {
  minWidth: '100px',
  border: 'none',
};

const activeStatusBadge = {
  ...primary,
  ...dataTableBadge,
};

const warningStatusBadge = {
  ...warning,
  ...dataTableBadge,
};

const criticalStatusBadge = {
  ...danger,
  ...dataTableBadge,
};

const healthyStatusBadge = {
  ...success,
  ...dataTableBadge,
};

const secondaryStatusBadge = {
  ...secondary,
  ...dataTableBadge,
};

const countBadge = {
  ...baseBadge,
  backgroundColor: '#455469 !important',
  '& span': {
    ...badgeFont,
    color: 'white',
  },
};

const countNeutral = {
  ...secondary,
};

const invertedRemovableBadge = {
  ...dark,
};

const removableBadge = {
  ...secondary,
  border: 'none',
};

export const badges = {
  baseBadge: {
    ...baseBadge,
  },
  default: {
    ...baseBadge,
  },
  primary,
  countBadge,
  countNeutral,
  secondary,
  success,
  danger,
  warning,
  dark,
  info,
  selectedItemBadge,
  readOnlyBadge,
  readOnlyFieldBadge,
  activeStatusBadge,
  warningStatusBadge,
  criticalStatusBadge,
  healthyStatusBadge,
  secondaryStatusBadge,
  badgeDeleteButton,
  itemBadgeWithSlot,
  removableBadge,
  invertedRemovableBadge,
  errorCalloutBadge: {
    backgroundColor: 'white !important',
  },
  infoCalloutBadge: {
    backgroundColor: 'white !important',
  },
  successCalloutBadge: {
    backgroundColor: 'white !important',
  },
  warningCalloutBadge: {
    backgroundColor: 'white !important',
  },
};
