import { focusWithCroppedOutline } from '../Button/Buttons.styles';

export const baseBadge = {
  cursor: 'default',
  p: '3px 5px 4px 5px',
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

const countDefault = {
  ...baseBadge,
  width: 'fit-content',
  minWidth: '17px',
  minHeight: '17px',
  p: '2px 5px 2px 5px',
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
    color: 'neutral.20',
    fontSize: '11px',
    textTransform: 'uppercase',
  },
};

export default {
  baseBadge,
  environmentBadge,
  itemBadgeWithSlot,
  multivaluesBadge,
  readOnlyBadge,
  selectedItemBadge,
  deleteButton,
  countBadge,
  countNeutral,
  badgeDeleteButton,
};
