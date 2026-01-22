import { colors } from '../colors';

import { avatar } from './avatar';
import callout from './callout';
import { footer } from './footer';
import iconBadge from './iconBadge';
import { listView, listViewItem, lisViewItemChart } from './listview';
import { menu, menuItem } from './menu';
import { message } from './message';
import { navBar } from './navbar';
import skeleton from './skeleton';

const listBox = {
  container: {
    backgroundColor: 'backgroundBase',
    border: '1px solid',
    borderColor: 'transparent',
    borderRadius: '4px',
  },
  option: {
    color: 'gray-400',
    '&.is-focused': {
      color: 'gray-200',
      bg: '#2C323A',
    },
    '&.is-selected': {
      color: 'gray-200',
      bg: '#2C323A',
      '&.is-focused': {
        color: 'gray-200',
      },
    },
    '&.is-condensed': {
      color: 'gray-400',
      '&.is-focused': {
        color: 'gray-200',
      },
    },
  },
};

const tab = {
  '&.is-selected': {
    '& > span': {
      color: 'text.secondary',
    },
  },
  '&.is-hovered': {
    '& > span': {
      color: 'text.secondary',
    },
  },
};

const modal = {
  content: {
    bg: 'backgroundBase',
  },
  headingContainer: {
    borderBottom: '1px solid',
    borderBottomColor: 'border.base',
    bg: 'backgroundBase',
  },
  header: {
    borderBottom: '1px solid',
    borderBottomColor: 'border.base',
    bg: 'backgroundBase',
  },
  body: {
    bg: 'backgroundBase',
  },
  footer: {
    borderTop: '1px solid',
    borderTopColor: 'border.base',
    bg: 'backgroundBase',
  },
  footerContainer: {
    borderTop: '1px solid',
    borderTopColor: 'border.base',
    bg: 'backgroundBase',
  },
  buttonsContainer: {
    bg: 'backgroundBase',
  },
};

const rockerButton = {
  innerContainer: {
    backgroundColor: 'backgroundBase',
  },
  thumbSwitch: {
    backgroundColor: 'backgroundBase',
    color: 'blue-400',
    '&.is-selected': {
      color: 'black',
      '& > div.status-icon': {
        bg: 'black',
      },
    },
    '&.is-hovered': {
      color: 'black',
    },
    '&.is-pressed': {
      color: 'black',
    },
  },
};

const attachment = {
  container: {
    backgroundColor: 'backgroundSecondary',
    borderColor: 'border.attachment',
  },
};

const tooltip = {
  inline: {
    color: 'blue-400',
  },
};

const statusIcon = {
  base: {
    '&.is-default': {
      bg: 'gray-100',
      path: {
        fill: 'black',
      },
    },
    '&.is-critical': {
      bg: 'red-500',
      path: {
        fill: 'black',
      },
    },
    '&.is-warning': {
      bg: 'yellow-500',
      path: {
        fill: 'black',
      },
    },
    '&.is-info': {
      bg: 'blue-500',
      path: {
        fill: 'black',
      },
    },
    '&.is-major': {
      bg: 'orange-500',
      path: {
        fill: 'black',
      },
    },
    '&.is-minor': {
      bg: 'yellow-500',
      path: {
        fill: 'black',
      },
    },
    '&.is-warning-neutral': {
      bg: 'gray-700',
      path: {
        fill: 'gray-100',
      },
    },
    '&.is-fatal': {
      bg: 'gray-100',
      path: {
        fill: 'gray-700',
      },
    },
    '&.is-selected.is-selected': {
      bg: 'black',
      '& > svg': {
        path: {
          fill: 'active',
        },
      },
    },
  },
};

export default {
  rockerButton,
  attachment,
  avatar,
  message,
  menu,
  menuItem,
  listViewItem,
  listView,
  lisViewItemChart,
  navBar,
  listBox,
  modal,
  tab,
  iconBadge,
  skeleton,
  footer,
  tooltip,
  popoverMenu: {
    container: {
      background: '#23282e',
      border: '1px solid #69788B',
    },
  },
  dataTable: {
    selectableTableRow: {
      '&.is-selected': {
        bg: 'background.hover',
      },
      '&.is-hovered': {
        bg: 'background.hover',
      },
      '&.is-focused': {
        boxShadow: '0 0 0 3px inset #1a73e8',
      },
    },
  },
  callout,
  table: {
    caption: {
      color: 'text.secondary',
    },
    head: {
      color: 'text.secondary',
    },
    data: {
      color: 'text.secondary',
    },
  },
  tableBase: {
    caption: {
      color: 'text.secondary',
    },
    thead: {
      '&.is-sticky': {
        boxShadow: `0 1px 0 ${colors.border.base}`,
      },
    },
    head: {
      color: 'text.secondary',
    },
    data: {
      color: 'text.secondary',
    },
  },
  statusIcon,
  fieldHelperText: {
    title: {
      '&.is-default': {
        color: 'text.fieldHelper',
      },
      '&.is-error': {
        color: 'critical.bright',
      },
      '&.is-warning': {
        color: 'warning.bright',
      },
      '&.is-success': {
        color: 'success.bright',
      },
    },
  },
  overlayPanel: {
    container: {
      border: '1px solid border.separator',
      boxShadow: 'none',
    },
  },
  breadcrumb: {
    link: {
      color: 'blue-400',
      '&.is-current': {
        color: 'text.secondary',
      },
    },
  },
};
