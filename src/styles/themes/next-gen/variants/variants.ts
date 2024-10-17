import codeView from '../codeView/codeView';

import buttons from './button';

const fieldHelperText = {
  title: {
    color: 'text.secondary',
    fontSize: 'sm',
    pt: '0px !important',
    mt: '.25rem',
    '&.is-error': {
      color: 'critical.dark',
    },
    '&.is-warning': {
      color: 'warning.bright',
    },
    '&.is-success': {
      color: 'success.dark',
    },
  },
};

const message = {
  item: {
    maxWidth: 400,
    pointerEvents: 'all',
    mb: 'md',
    p: '1.25rem',
    wordBreak: 'break-word',
    alignItems: 'center',
    backgroundColor: 'blue-100',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'teal-500',
    color: 'gray-700',
    fontSize: '15px !important',
    borderRadius: 4,
    '&.is-success': {
      bg: 'green-100',
      borderLeftColor: 'green-500',
      color: 'gray-700',
    },
    '&.is-warning': {
      bg: 'warning.light',
      borderLeftColor: 'yellow-500',
      color: 'gray-700',
    },
    '&.is-error, > .is-error': {
      bg: 'red-100',
      color: 'gray-700',
    },
    '&.is-error, > button > svg': {
      color: 'gray-700 !important',
      path: {
        fill: 'gray-700',
      },
    },
    '&.is-error': {
      borderLeftColor: 'red-500',
    },
  },
};

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

const modalSize = {
  xs: ['100%', '300px', '300px', '300px', '300px', '300px'],
  sm: ['100%', '500px', '500px', '500px', '500px', '500px'],
  md: ['100%', '500px', '500px', '500px', '800px', '800px'],
  lg: ['100%', '500px', '500px', '500px', '800px', '1140px'],
  full: ['100%', '100%', '100%', '100%', '100%', '100%'],
};

const modal = {
  content: {
    pt: '15px',
    borderRadius: '4px',
    opacity: 0,
    top: '0',
    transform: 'translate(0, -50px)',
    transition: 'opacity 300ms ease, transform 500ms ease-out',
    m: ['sm', 'sm', '1.75rem auto'],
    overflow: 'hidden',
    maxHeight: 'calc(100vh - 3.5rem)',
    '&.is-open-no-transition': {
      opacity: '100%',
      transform: 'none',
    },
    '&.is-open.is-transitioning': {
      opacity: '100%',
      transform: 'none',
    },
    '&.is-extra-small': {
      width: '100%',
      maxWidth: modalSize.xs,
    },
    '&.is-small': {
      width: '100%',
      maxWidth: modalSize.sm,
    },
    '&.is-medium': {
      width: '100%',
      maxWidth: modalSize.md,
    },
    '&.is-large': {
      width: '100%',
      maxWidth: modalSize.lg,
    },
    '&.is-full': {
      width: '100%',
      maxWidth: modalSize.full,
    },
  },
  container: {
    justifyContent: 'start',
  },
};

const tab = {
  borderRadius: '2px',
  pt: '.5rem',
  '& > span': {
    px: '1rem',
    fontSize: '.9375rem',
  },
  '&.is-focused': {
    boxShadow: 'none',
    outline: '3px solid',
    outlineColor: 'active',
    outlineOffset: '1px',
    '& > span': {
      outline: 'none',
    },
  },
  '& > div': {
    borderBottom: '3px solid',
    borderBottomColor: 'primary',
    ml: '0px',
  },
};

const menuTab = {
  ml: '0px !important',
};

const listBox = {
  container: {
    px: 'sm',
    py: 'xs',
  },
  option: {
    py: '.75rem',
    pl: '.75rem',
    pr: '1rem',
    '&.is-focused': {
      color: 'text.primary',
      bg: 'gray-100',
    },
    '&.is-selected': {
      color: 'text.primary',
      bg: 'lightblue',
      pl: 0,
      '&.is-focused': {
        color: 'text.primary',
      },
    },
  },
};

const menuItem = {
  item: {
    bg: 'transparent',
    padding: '10px 10px',
    outline: 'none',
    color: 'text.primary',
    cursor: 'pointer',
    '&.is-focused, &.is-selected, &.is-pressed': {
      bg: 'gray-100',
      color: 'text.primary',
      '> *': {
        color: 'text.primary',
      },
    },
    '&.is-pressed': {
      color: 'text.primary',
      bg: 'lightblue',
    },
  },
  separator: {
    my: 'sm',
  },
};

const separator = {
  base: {
    bg: 'gray-300',
    '&.is-vertical': {
      m: '0',
    },
  },
};


const avatar = {
  backgroundColor: 'lightcyan',
  color: 'darkcyan',
  cursor: 'pointer',
  '&.is-orange': {
    backgroundColor: 'lightorange',
    color: 'darkorange',
  },
  '&.is-green': {
    backgroundColor: 'lightgreen',
    color: 'darkgreen',
  },
  '&.is-purple': {
    backgroundColor: 'lightpurple',
    color: 'darkpurple',
  },
  '&.is-pink': {
    backgroundColor: 'lightpink',
    color: 'darkpink',
  },
  '&.is-red': {
    backgroundColor: 'lightred',
    color: 'darkred',
  },
  '&.is-yellow': {
    backgroundColor: 'lightyellow',
    color: 'darkyellow',
  },
  '&.is-cyan': {
    backgroundColor: 'lightcyan',
    color: 'darkcyan',
  },
  '&.is-teal': {
    backgroundColor: 'lightteal',
    color: 'darkteal',
  },
  display: 'flex',
  borderRadius: '50%',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'standard',
};

const progressBarContainer = {
  backgroundColor: 'gray-200',
  borderRadius: '.5rem',
  height: '1rem',
};

const progressBar = {
  transition: 'width .6s ease',
  container: {
    ...progressBarContainer,
  },
  percentageBar: {
    ...progressBarContainer,
    backgroundColor: 'active',
  },
};

const listViewItem = {
  rightOfData: {
    flexShrink: 4,
    whiteSpace: 'nowrap',
  },
  iconContainer: {
    ml: '0px',
  },
  styledListItem: {
    bg: 'white',
    '&.is-selected': {
      bg: 'gray-100',
    },
    borderBottom: 'none',
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'gray-200',
    },
    '&.is-hovered': {
      bg: 'gray-100',
    },
    '&.is-focused': {
      boxShadow: '0 0 0 3px inset #1a73e8',
      bg: 'gray-100',
    },
  },
  styledContainer: {
    py: 'md',
    px: 'lg',
    bg: 'transparent',
    '&.is-hovered': {
      bg: 'transparent',
      cursor: 'pointer',
    },
  },
  expandableStyledListItem: {
    pr: '1.25rem',
    pl: 0,
  },
  expandableItemBody: {
    px: '1.5rem',
  },
  expandableRow: {
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'gray-300',
    },
  },
};

const navBarSelected = {
  backgroundColor: 'lightblue',
};

const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '-2px',
};

const navBar = {
  container: {
    width: '252px',
    p: 'sm',
    backgroundColor: 'white',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  },
  sectionButton: {
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: 'gray-200',
    },
    '&.is-focused': {
      ...navBarFocus,
    },
  },
  itemButton: {
    color: 'text.primary',
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: 'gray-200',
      color: 'text.primary',
    },
    '&.is-selected': {
      bg: 'lightblue',
      color: 'darkblue',
    },
  },
  subtitle: {
    color: 'text.primary',
  },
  headerText: {
    color: 'text.primary',
    '.is-selected &': {
      color: 'darkblue',
    },
  },
  headerNav: {
    color: 'text.primary',
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-focused': {
      boxShadow: 'none',
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
    },
  },
  item: {
    px: '1rem',
    py: '.75rem',
    color: 'text.primary',
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '> div > svg': {
      fill: 'text.primary',
    },
    '&.is-selected': {
      ...navBarSelected,
      '> div > svg': {
        fill: 'darkblue',
      },
    },
    '&.is-focused': {
      outline: '2px solid',
      outlineColor: 'active',
      outlineOffset: '-2px',
      boxShadow: 'none',
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
    },
  },
  itemHeaderContainer: {
    px: '1rem',
    py: '.75rem',
    '&.is-selected': {
      ...navBarSelected,
    },
    backgroundColor: 'transparent',
    '> svg': {
      fill: 'text.primary',
    },
    '> div > svg': {
      fill: 'text.primary',
    },
  },
};

const listView = {
  container: {
    borderRadius: '16px',
    border: '1px solid',
    borderColor: '#e7eef4',
    '& > div > div': {
      '& > div:first-of-type': {
        '& > div > div': {
          borderRadius: '16px 16px 0 0',
        },
      },
      '& > div:last-of-type': {
        '& > div > div': {
          borderRadius: ' 0 0 16px 16px',
        },
      },
    },
  },
};

const dataTable = {
  container: {
    border: '1px solid',
    borderColor: 'gray-300',
    borderRadius: '16px',
  },
  tableRow: {
    borderTop: '1px solid',
    borderTopColor: 'gray-300',
    borderBottom: '0',
    pl: 'lg',
  },
  tableHeadWrapper: {
    borderBottom: '0',
  },
  tableHeadCell: {
    pl: 'lg',
    fontWeight: '2',
    fontSize: 'md',
  },
  rowHeader: {
    py: '20px !important',
  },
  tableCell: {
    fontSize: 'md',
  },
};

/* const codeView = {
  wrapper: {
    backgroundColor: 'gray-900',
    borderRadius: '4px',
    '> button >svg': {
      color: 'gray-300',
      path: {
        fill: 'gray-300',
      },
    },
    '> pre': {
      p: 'md',
    },
  },
}; */

const tabs = {
  gap: '0px',
};

const menu = {
  p: 'sm',
  border: '1px solid',
  borderColor: 'gray-300',
};

export default {
  navBar,
  fieldHelperText,
  message,
  modal,
  tab,
  menuTab,
  listBox,
  separator,
  menuItem,
  avatar,
  listViewItem,
  progressBar,
  listView,
  dataTable,
  codeView,
  tabs,
  menu,
};
