import attachment from '../../../../components/AIComponents/Attachment/Attachment.styles';
import skeleton from '../../../../components/Skeleton/Skeleton.styles';
import codeView from '../codeView/codeView';

import accordion from './accordion';
import { avatar } from './avatar';
import { box } from './box';
import button, { defaultFocus } from './button';
import callout from './callout';
import { dataTable } from './dataTable';
import { footer } from './footer';
import iconWrapper from './iconWrapper';
import { listView, listViewItem, lisViewItemChart } from './listview';
import { menu, menuItem } from './menu';
import { message } from './messages';
import { navBar } from './navbar';
import panelHeader from './panelHeader';
import popoverMenu from './popoverMenu';
import prompt from './prompt';
import rangeCalendar from './rangeCalendar';
import response from './response';
import searchNav from './searchNav';
import stepper from './stepper';
import suggestion from './suggestion';
import suggestions from './suggestions';
import { table } from './table';
import { tableBase } from './tableBase';
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

export const badgeDeleteButton = {
  ...button.iconButtons.base,
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  p: 0,
  width: 14,
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
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.5)',
    borderRadius: '1em',
    opacity: 0,
    transition: 'opacity 300ms ease, transform 500ms ease-out',
    m: ['sm', 'sm', '1.75rem auto'],
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
  headingContainer: {
    borderBottom: '1px solid',
    borderBottomColor: 'gray-200',
    bg: 'backgroundBase',
    borderRadius: '1em 1em 0px 0px',
  },
  header: {
    bg: 'backgroundBase',
    borderBottom: '1px solid',
    borderBottomColor: 'gray-200',
    borderRadius: '1em 1em 0px 0px',
    px: 'lg',
    py: 'md',
  },
  bodyContainer: {
    p: 'lg',
  },
  body: {
    p: 'lg',
  },
  footer: {
    borderTop: '1px solid',
    borderTopColor: 'gray-200',
    borderRadius: '0px 0px 1em 1em',
    p: 'lg',
  },
  footerContainer: {
    borderTop: '1px solid',
    borderTopColor: 'gray-200',
    borderRadius: '0px 0px 1em 1em',
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
    pr: 'md',
    justifyContent: 'space-between',
    '&.is-focused': {
      color: 'text.primary',
      bg: 'gray-100',
    },
    '&.is-selected': {
      color: 'text.primary',
      bg: 'lightblue',
      pl: '.75rem',
      '&.is-focused': {
        color: 'text.primary',
      },
    },
    '&.is-pressed': {
      color: 'text.primary',
      bg: 'lightblue',
    },
    '&.is-condensed': {
      pl: 'md',
      bg: 'backgroundBase',
      '&.is-selected': {
        bg: 'backgroundBase',
      },
      '&.is-focused': {
        bg: 'backgroundBase',
      },
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
    backgroundColor: 'backgroundBase',
    borderColor: 'border.hairline',
  },
  aiPanelContainer: {
    backgroundColor: 'backgroundBase',
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
    backgroundColor: 'backgroundBase',
  },
};

const buttonBar = {
  container: {
    gap: 'sm',
    backgroundColor: 'backgroundBase',
  },
  justifyRightContainer: {
    gap: 'sm',
    backgroundColor: 'backgroundBase',
  },
};

const rockerButton = {
  innerContainer: {
    boxShadow: 'none',
    backgroundColor: 'common.backgroundBase',
    borderRadius: '50px',
    padding: 0,
    border: 'none',
  },
  thumbSwitch: {
    textTransform: 'none',
    backgroundColor: 'common.backgroundBase',
    padding: 'md',
    height: '50px',
    color: 'active',
    border: '1px solid',
    borderColor: 'active',
    borderRadius: 0,
    '&:not(:last-of-type)': {
      borderRight: 'none',
    },
    '&:first-of-type': {
      borderTopLeftRadius: '50px',
      borderBottomLeftRadius: '50px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '50px',
      borderBottomRightRadius: '50px',
    },
    '&.is-selected': {
      color: 'white',
      backgroundColor: 'active',
      '& > div.status-icon': {
        bg: 'white',
        '& > svg': {
          path: {
            fill: 'active',
          },
        },
      },
    },
    '&.is-hovered': {
      borderColor: '#1462C8',
      backgroundColor: '#1462C8 !important',
      color: 'white',
    },
    '&.is-pressed': {
      borderColor: '#135CBC',
      backgroundColor: '#135CBC !important',
      color: 'white',
    },
    '&.is-focused': {
      ...defaultFocus,
      position: 'relative',
      zIndex: '1000',
    },
  },
};

const loader = {
  withinListView: {
    color: 'active',
    py: 'sm',
  },
  circleSpinner: {
    borderColor: 'backgroundBase',
  },
};

const breadcrumb = {
  link: {
    fontWeight: 2,
    fontSize: 'lg',
  },
};

const statusIcon = {
  base: {
    '&.is-default': {
      bg: 'gray-100',
      path: {
        fill: 'gray-700',
      },
    },
    '&.is-critical': {
      bg: 'red-100',
      path: {
        fill: 'red-700',
      },
    },
    '&.is-warning': {
      bg: 'yellow-100',
      path: {
        fill: 'yellow-800',
      },
    },
    '&.is-info': {
      bg: 'blue-100',
      path: {
        fill: 'blue-600',
      },
    },
    '&.is-major': {
      bg: 'orange-100',
      path: {
        fill: 'orange-700',
      },
    },
    '&.is-minor': {
      bg: 'yellow-100',
      path: {
        fill: 'yellow-800',
      },
    },
    '&.is-warning-neutral': {
      bg: 'gray-100',
      path: {
        fill: 'gray-700',
      },
    },
    '&.is-fatal': {
      bg: 'gray-700',
      path: {
        fill: 'gray-100',
      },
    },
    '&.is-selected.is-selected': {
      bg: 'white',
      '& > svg': {
        path: {
          fill: 'active',
        },
      },
    },
  },
};

export default {
  accordion,
  attachment,
  avatar,
  breadcrumb,
  box,
  buttonBar,
  callout,
  codeView,
  dataTable,
  fieldHelperText,
  footer,
  iconWrapper,
  listBox,
  listView,
  listViewItem,
  lisViewItemChart,
  loader,
  menu,
  menuItem,
  menuTab,
  message,
  modal,
  navBar,
  overlayPanel,
  panelHeader,
  popoverMenu,
  progressBar,
  prompt,
  rangeCalendar,
  response,
  rockerButton,
  searchNav,
  separator,
  skeleton,
  stepper,
  suggestion,
  suggestions,
  statusIcon,
  tab,
  table,
  tableBase,
  tabs,
  tooltip,
};
