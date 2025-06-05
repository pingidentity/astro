import { avatar } from './avatar';
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
    border: 0,
    boxShadow: 'none',
    backgroundColor: 'gray-900',
    'button': {
      backgroundColor: 'gray-900',
      color: 'blue-400',
      '&.is-selected': {
        color: 'gray-900',
      },
      '&.is-hovered': {
        color: 'gray-900',
      },
      '&.is-pressed': {
        color: 'gray-900',
      },
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
};
