import attachment from '../../../../components/AIComponents/Attachment/Attachment.styles';
import skeleton from '../../../../components/Skeleton/Skeleton.styles';
import codeView from '../codeView/codeView';

import { avatar } from './avatar';
import button from './button';
import { dataTable } from './dataTable';
import { footer } from './footer';
import iconWrapper from './iconWrapper';
import { listView, listViewItem, lisViewItemChart } from './listview';
import { menu, menuItem } from './menu';
import { message } from './messages';
import { navBar } from './navbar';
import popoverMenu from './popoverMenu';
import prompt from './prompt';
import response from './response';
import suggestion from './suggestion';
import suggestions from './suggestions';
import { menuTab, tab, tabs } from './tabs';
import tooltip from './tooltip';

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
    p: 0,
    borderRadius: '4px',
    opacity: 0,
    top: '0',
    transform: 'translate(0, -50px)',
    transition: 'opacity 300ms ease, transform 500ms ease-out',
    m: ['sm', 'sm', '1.75rem auto'],
    maxHeight: 'calc(100vh - 3.5rem)',
    overflowY: 'auto',
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
  header: {
    px: 'lg',
    py: 'md',
    borderBottom: '1px solid',
    borderBottomColor: 'border.base',
    bg: 'background.base',
  },
  footer: {
    borderTop: '1px solid',
    borderTopColor: 'border.base',
    px: 'lg',
    py: 'md',
  },
  buttonsContainer: {
    bottom: 0,
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

const rockerButton = {
  innerContainer: {
    height: 50,
    boxShadow: 'none',
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: 0,
    'button': {
      backgroundColor: 'white',
      padding: '0px 15px',
      height: '100%',
      color: 'active',
      border: '1px solid',
      borderColor: 'active',
      borderRadius: 0,
      '&.is-selected': {
        color: 'white',
        backgroundColor: 'active',
      },
      '&.is-hovered': {
        backgroundColor: '#1462C8 !important',
        color: 'white',
      },
      '&.is-pressed': {
        backgroundColor: '#135CBC !important',
        color: 'white',
      },
      '&.is-focused': {
        outline: '2px solid',
        outlineColor: 'focus',
        outlineOffset: '2px',
      },
    },
    'button:not(:first-child)': {
      borderLeft: 0,
    },
    'button:first-child': {
      borderTopLeftRadius: '50px',
      borderBottomLeftRadius: '50px',
    },
    'button:last-child': {
      borderTopRightRadius: '50px',
      borderBottomRightRadius: '50px',
    },

  },
  thumbSwitch: {
    textTransform: 'none',
  },
};

const loader = {
  withinListView: {
    color: 'active',
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
  lisViewItemChart,
  dataTable,
  codeView,
  popoverMenu,
  prompt,
  tabs,
  menu,
  iconWrapper,
  overlayPanel,
  suggestions,
  suggestion,
  response,
  skeleton,
  rockerButton,
  tooltip,
  footer,
  loader,
};
