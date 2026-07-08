import { astroTokens } from '@pingux/onyx-tokens';

import buttons from './button';

const badgeFont = {
  fontWeight: '2',
};

const badgeIconStyle = {
  '& span': {
    ...badgeFont,
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
  padding: '2.81px 4px',
  borderRadius: '4px',
  fontSize: 'unset',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  width: 'fit-content',
  color: 'text.primary',
  ...badgeIconStyle,
};

const primary = {
  ...baseBadge,
  backgroundColor: '#EAF2FD !important',
  '& span': {
    ...badgeFont,
    color: astroTokens.color.blue[600],
  },
};

const secondary = {
  ...baseBadge,
  backgroundColor: '#f6f8fa !important',
  '& span': {
    ...badgeFont,
    color: astroTokens.color.gray[900],
  },
};

const success = {
  ...baseBadge,
  '& span': {
    ...badgeFont,
    color: astroTokens.color.green[800],
  },
  backgroundColor: '#D3EDDF !important',
};

const danger = {
  ...baseBadge,
  backgroundColor: '#F8D8D5 !important',
  '& span': {
    ...badgeFont,
    color: astroTokens.color.red[700],
  },
};

const warning = {
  ...baseBadge,
  backgroundColor: '#FFF1DA !important',
  '& span': {
    ...badgeFont,
    color: astroTokens.color.yellow[800],
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

const info = {
  ...baseBadge,
  backgroundColor: '#EAF2FD !important',
  '& span': {
    ...badgeFont,
    color: 'darkblue',
  },
};

const selectedItemBadge = {
  ...baseBadge,
  backgroundColor: '#eaf2fd !important',
  paddingRight: '0px !important',
  '& span': {
    ...badgeFont,
    color: 'text.primary',
  },
};

const readOnlyBadge = {
  ...baseBadge,
  border: '1px solid',
  borderColor: 'border.hairline',
  backgroundColor: '#FFFFFF !important',
  '& span': {
    ...badgeFont,
    color: 'text.primary',
    lineHeight: 'xs',
  },
};

const readOnlyFieldBadge = {
  ...readOnlyBadge,
  '& span': {
    ...badgeFont,
    color: 'text.primary',
    lineHeight: 'xs',
  },
};

const itemBadgeWithSlot = {
  ...selectedItemBadge,
  border: 'none',
  '& span': {
    ...badgeFont,
    color: 'text.primary',
  },
  '& svg': {
    fill: 'text.primary',
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
  border: 'none',
  ...primary,
};

const warningStatusBadge = {
  border: 'none',
  ...warning,
};

const criticalStatusBadge = {
  border: 'none',
  ...danger,
};

const healthyStatusBadge = {
  border: 'none',
  ...success,
};

const secondaryStatusBadge = {
  border: 'none',
  ...secondary,
};

const tableBaseBadgeBaseStyle = {
  ...baseBadge,
  minWidth: '100px',
  border: 'none',
};

const tableBaseBadgeSpanStyle = {
  fontSize: '11.25px',
  lineHeight: '1',
};

const tableBaseBadge = {
  active: {
    ...tableBaseBadgeBaseStyle,
    backgroundColor: `${astroTokens.color.blue[100]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokens.color.blue[600],
    },
  },
  warning: {
    ...tableBaseBadgeBaseStyle,
    backgroundColor: `${astroTokens.color.yellow[100]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokens.color.blue[600],
    },
  },
  critical: {
    ...tableBaseBadgeBaseStyle,
    backgroundColor: `${astroTokens.color.red[100]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokens.color.red[800],
    },
  },
  healthy: {
    ...tableBaseBadgeBaseStyle,
    backgroundColor: `${astroTokens.color.green[100]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokens.color.green[800],
    },
  },
  secondary: {
    ...tableBaseBadgeBaseStyle,
    backgroundColor: `${astroTokens.color.gray[100]} !important`,
    '& > span': {
      ...tableBaseBadgeSpanStyle,
      color: astroTokens.color.gray[800],
    },
  },
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

const environmentBadge = {
  backgroundColor: '#EAF2FD',
  color: `${astroTokens.color.blue[600]}`,
};

export const badges = {
  dataTableBadge,
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
  selected: activeStatusBadge,
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
  environmentBadge,
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
  tableBaseBadge,
};
