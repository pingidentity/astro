import attachment from '../../../../components/AIComponents/Attachment/Attachment.styles';
import skeleton from '../../../../components/Skeleton/Skeleton.styles';
import codeView from '../codeView/codeView';

import { avatar } from './avatar';
import button from './button';
import iconWrapper from './iconWrapper';
import { listView, listViewItem } from './listview';
import { menu, menuItem } from './menu';
import { message } from './messages';
import { navBar } from './navbar';
import prompt from './prompt';
import response from './response';
import suggestion from './suggestion';
import suggestions from './suggestions';
import { menuTab, tab, tabs } from './tabs';

const fieldHelperText = {
  title: {
    fontSize: 'sm',
    pt: '0px !important',
    mt: '.25rem',
    '&.is-default': {
      color: 'text.fieldHelper',
    },
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
  ...button.iconButtons.base,
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
    '&.is-pressed': {
      color: 'text.primary',
      bg: 'lightblue',
    },
  },
};

const separator = {
  base: {
    bg: 'border.base',
    '&.is-vertical': {
      m: '0',
    },
  },
  navBarSeparator: {
    my: '.5rem',
    mx: '0px',
    maxWidth: '236px',
    backgroundColor: 'border.separator',
  },
  navBarSubtitleSeparator: {
    backgroundColor: 'border.separator',
  },
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

const dataTable = {
  container: {
    border: '1px solid',
    borderColor: 'border.base',
    borderRadius: '16px',
  },
  tableRow: {
    borderTop: '1px solid',
    borderTopColor: 'border.base',
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

const overlayPanel = {
  container: {
    backgroundColor: 'background.base',
    border: 'none',
  },
  aiPanelContainer: {
    backgroundColor: 'background.base',
    border: 'none',
    borderLeft: 'none',
    position: 'fixed',
    overflowY: 'scroll',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '-2px 0px 2px 1px rgba(37, 55, 70, 0.15)',
    display: 'flex !important',
    opacity: 0,
    right: '-50%',
    transition: 'all 500ms',
    maxWidth: '100%',
    p: 'lg',
    '&.is-small': {
      width: '420px',
    },
    '&.is-full': {
      width: 'container.full',
    },
    '&.is-open.is-transitioning': {
      right: 0,
      opacity: 1,
    },
  },
  body: {
    gap: 'md',
    minHeight: '100%',
    maxWidth: '768px',
    alignSelf: 'center',
  },
  innerPanel: {
    backgroundColor: 'background.base',
  },
};

export default {
  attachment,
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
  prompt,
  tabs,
  menu,
  iconWrapper,
  overlayPanel,
  suggestions,
  suggestion,
  response,
  skeleton,
};
