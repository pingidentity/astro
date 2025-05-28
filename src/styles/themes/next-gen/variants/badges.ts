import buttons from './button';

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

const primary = {
  ...baseBadge,
  backgroundColor: '#eaf1fb !important',
  '& span': {
    ...badgeFont,
    color: '#1967d2',
  },
};

const secondary = {
  ...baseBadge,
  backgroundColor: '#f6f8fa !important',
  '& span': {
    ...badgeFont,
    color: 'gray-900',
  },
};

const success = {
  ...baseBadge,
  backgroundColor: '#d3eddf !important',
  '& span': {
    ...badgeFont,
    color: 'success.dark',
  },
};

const danger = {
  ...baseBadge,
  backgroundColor: '#f8d8d5 !important',
  '& span': {
    ...badgeFont,
    color: 'red-700',
  },
};

const warning = {
  ...baseBadge,
  backgroundColor: '#fff1da !important',
  '& span': {
    ...badgeFont,
    color: 'yellow-700',
  },
};

const dark = {
  ...baseBadge,
  backgroundColor: 'black !important',
  '& span': {
    ...badgeFont,
    color: 'white',
  },
};

const selectedItemBadge = {
  ...baseBadge,
  backgroundColor: '#eaf2fd !important',
  paddingRight: '0px !important',
  '& span': {
    ...badgeFont,
    fontSize: '14px',
    color: 'text.primary',
    fontWeight: 400,
  },
};

const readOnlyBadge = {
  '& span': {
    fontSize: '14px',
  },
};

const info = {
  ...baseBadge,
  backgroundColor: '#eaf2fd !important',
  '& span': {
    ...badgeFont,
    color: 'darkblue',
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

export const badges = {
  baseBadge: {
    ...baseBadge,
  },
  default: {
    ...baseBadge,
  },
  primary,
  secondary,
  success,
  danger,
  warning,
  dark,
  selectedItemBadge,
  readOnlyBadge,
  activeStatusBadge,
  warningStatusBadge,
  criticalStatusBadge,
  healthyStatusBadge,
  secondaryStatusBadge,
  badgeDeleteButton,
  info,
};
