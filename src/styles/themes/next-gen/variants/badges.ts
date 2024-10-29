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

export const badgeDeleteButton = {
  ...buttons.iconButtons.base,
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  p: 0,
  width: 14,
};

export const badges = {
  primary: {
    ...baseBadge,
    backgroundColor: '#eaf1fb !important',
    '& span': {
      ...badgeFont,
      color: '#1967d2',
    },
  },
  baseBadge: {
    ...baseBadge,
    backgroundColor: '#eaf1fb !important',
    '& span': {
      ...badgeFont,
      color: '#1967d2',
    },
  },
  secondary: {
    ...baseBadge,
    backgroundColor: '#f6f8fa !important',
    '& span': {
      ...badgeFont,
      color: 'gray-900',
    },
  },
  success: {
    ...baseBadge,
    backgroundColor: '#d3eddf !important',
    '& span': {
      ...badgeFont,
      color: 'success.dark',
    },
  },
  danger: {
    ...baseBadge,
    backgroundColor: '#f8d8d5 !important',
    '& span': {
      ...badgeFont,
      color: 'red-700',
    },
  },
  warning: {
    ...baseBadge,
    backgroundColor: '#fff1da !important',
    '& span': {
      ...badgeFont,
      color: 'yellow-700',
    },
  },
  dark: {
    ...baseBadge,
    backgroundColor: 'black !important',
    '& span': {
      ...badgeFont,
      color: 'white',
    },
  },
  selectedItemBadge: {
    ...baseBadge,
    backgroundColor: '#eaf2fd !important',
    paddingRight: '0px !important',
    '& span': {
      ...badgeFont,
      fontSize: '14px',
      color: 'text.primary',
      fontWeight: 400,
    },
  },
  readOnlyBadge: {
    '& span': {
      fontSize: '14px',
    },
  },
  badgeDeleteButton,
};
