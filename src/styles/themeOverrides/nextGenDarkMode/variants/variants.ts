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
    backgroundColor: 'background.base',
    border: '1px solid',
    borderColor: 'border.input',
    borderRadius: '4px',
  },
  option: {
    py: '.75rem',
    pl: '.75rem',
    pr: '1rem',
    bg: 'background.base',
    '&.is-focused': {
      color: 'text.primary',
      bg: 'gray-800',
    },
    '&.is-selected': {
      color: 'text.primary',
      bg: 'gray-800',
      pl: 0,
      '&.is-focused': {
        color: 'text.primary',
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
    bg: 'background.base',
  },
  headingContainer: {
    bg: 'background.base',
  },
  buttonsContainer: {
    bg: 'background.base',
  },
};

const rockerButton = {
  innerContainer: {
    backgroundColor: 'background.base',
  },
  thumbSwitch: {
    backgroundColor: 'background.base',
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
    backgroundColor: 'background.secondary',
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
};
