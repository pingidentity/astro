import { avatar } from './avatar';
import iconBadge from './iconBadge';
import { listView, listViewItem } from './lsitview';
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
};

export default {
  avatar,
  message,
  menu,
  menuItem,
  listViewItem,
  listView,
  navBar,
  listBox,
  modal,
  tab,
  iconBadge,
  skeleton,
};
