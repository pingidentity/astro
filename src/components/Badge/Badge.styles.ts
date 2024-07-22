import { focusWithCroppedOutline } from '../Button/Buttons.styles';

export const baseBadge = {
  cursor: 'default',
  p: '3px 5px 3px 5px',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  borderRadius: '5px',
  fontWeight: 1,
  '& button': {
    backgroundColor: 'transparent',
    marginLeft: 'xs',
    marginTop: '1px',
    padding: '0',
    '&.is-hovered': {
      backgroundColor: 'white',
    },
    '& .mdi-icon': {
      marginLeft: '0',
      padding: '2px',
    },
  },
};

const defaultBadge = {
  ...baseBadge,
  backgroundColor: 'white !important',
  outline: '1px solid',
  outlineColor: 'neutral.80',
  '& span': {
    color: 'text.primary',
  },
};

const multivaluesBadge = {
  ...baseBadge,
  alignSelf: 'center',
  cursor: 'default',
  height: '100%',
  m: 5,
  mr: 10,
  ml: 0,
  '& span': {
    mr: '2px',
  },
};

const selectedItemBadge = {
  ...multivaluesBadge,
  py: 3,
  pr: 0,
  my: 3,
};

const readOnlyBadge = {
  ...multivaluesBadge,
  p: 2.54,
  border: '1px solid',
  borderColor: 'neutral.80',
};

const itemBadgeWithSlot = {
  ...readOnlyBadge,
  p: 3,
  my: 0,
  backgroundColor: 'white',
  '& span': {
    color: 'text.primary',
    mr: '2px',
    lineHeight: '16px',
  },
  maxHeight: '22px',
};

const environmentBadge = {
  ...baseBadge,
  alignSelf: 'center',
  height: '17px',
  minWidth: 'fit-content',
  ml: 8,
  '& span': {
    fontSize: 'xs',
    lineHeight: 1,
  },
};

export const deleteButton = {
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  p: 0,
  width: 14,
  mx: '3px !important',
  '&.is-focused': {
    ...focusWithCroppedOutline,
    bg: 'accent.40',
  },
};

export const badgeDeleteButton = {
  ...deleteButton,
  outline: 'none',
  path: {
    fill: 'neutral.40',
  },
  '&.is-focused': {
    ...focusWithCroppedOutline,
  },
  '&.is-hovered': {
    backgroundColor: '#e5e9f8 !important',
    path: {
      fill: 'neutral.40',
    },
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: '#4462ED !important',
  },
};

export const invertedBadgeDeleteButton = {
  ...badgeDeleteButton,
  path: {
    fill: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
  },
};

const countDefault = {
  ...baseBadge,
  width: 'fit-content',
  minWidth: '17px',
  minHeight: '17px',
  px: '5px',
  py: '2px',
  '& span': {
    fontSize: '11px',
    textTransform: 'uppercase',
  },
};

const countBadge = {
  ...countDefault,
  backgroundColor: '#640099 !important',
};

const countNeutral = {
  ...countDefault,
  backgroundColor: '#E4E6E9 !important',
  '& span': {
    color: 'neutral.30',
    fontSize: '11px',
    textTransform: 'uppercase',
  },
};

const convenienceDefault = {
  ...baseBadge,
  backgroundColor: '#4462ED !important',
  '& span': {
    fontWeight: 1,
  },
};

const calloutBadge = {
  ...baseBadge,
  height: '21px',
  backgroundColor: '#FFF !important',
  border: 'solid 1px',
  '& span': {
    color: 'text.primary',
  },
};

const errorCalloutBadge = {
  ...calloutBadge,
  borderColor: 'critical.bright',
};

const warningCalloutBadge = {
  ...calloutBadge,
  borderColor: '#E86900',
};

const successCalloutBadge = {
  ...calloutBadge,
  borderColor: 'success.bright',
};

const infoCalloutBadge = {
  ...calloutBadge,
  borderColor: 'text.secondary',
};

const statusBadge = {
  ...baseBadge,
  border: 'solid 1px',
  height: '21px',
  '& span': {
    color: 'text.primary',
  },
};

const criticalStatusBadge = {
  ...statusBadge,
  borderColor: 'critical.bright',
  backgroundColor: '#FFEBE7 !important',
};

const warningStatusBadge = {
  ...statusBadge,
  borderColor: '#E86900',
  backgroundColor: '#FFF6F2 !important',
};

const healthyStatusBadge = {
  ...statusBadge,
  borderColor: 'success.bright',
  backgroundColor: '#E5FFE9 !important',
};

const activeStatusBadge = {
  ...statusBadge,
  borderColor: 'active',
  backgroundColor: '#F7F8FD !important',
};

const invertedRemovableBadge = {
  ...baseBadge,
  height: '21px',
  '& span': {
    color: 'white',
  },
  '& button': {
    ml: '5px !important',
    mr: '0 !important',
    p: '3px',
    height: 15,
    width: 15,
  },
};

const removableBadge = {
  ...invertedRemovableBadge,
  border: '1px solid',
  backgroundColor: 'white !important',
  borderColor: 'neutral.80',
  '& span': {
    color: 'text.primary',
  },
};

const dataTableBase = {
  ...baseBadge,
  border: '1px',
  borderStyle: 'solid',
  flexDirection: 'row-reverse !important' as 'row-reverse',
  bg: 'white !important',
};

const dataTable = {
  pending: {
    ...dataTableBase,
    '& span, & > svg': {
      color: 'line.light',
    },
    borderColor: 'line.light',
  },
  failed: {
    ...dataTableBase,
    '& span, & > svg': {
      color: 'warning.bright',
    },
    borderColor: 'warning.bright',
  },
  rejected: {
    ...dataTableBase,
    '& span, & > svg': {
      color: 'critical.bright',
    },
    borderColor: 'critical.bright',
  },
  approved: {
    ...dataTableBase,
    '& span, & > svg': {
      color: 'success.dark',
    },
    borderColor: 'success.dark',
  },
};

export default {
  activeStatusBadge,
  badgeDeleteButton,
  baseBadge,
  convenienceDefault,
  countBadge,
  countNeutral,
  criticalStatusBadge,
  defaultBadge,
  deleteButton,
  environmentBadge,
  errorCalloutBadge,
  infoCalloutBadge,
  itemBadgeWithSlot,
  multivaluesBadge,
  readOnlyBadge,
  selectedItemBadge,
  invertedBadgeDeleteButton,
  successCalloutBadge,
  warningCalloutBadge,
  warningStatusBadge,
  healthyStatusBadge,
  removableBadge,
  invertedRemovableBadge,
  dataTable,
};
