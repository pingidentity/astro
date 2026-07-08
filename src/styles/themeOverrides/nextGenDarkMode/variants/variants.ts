import { astroTokensDark } from '@pingux/onyx-tokens';

import { avatar } from './avatar';
import callout from './callout';
import { footer } from './footer';
import iconBadge from './iconBadge';
import { listView, listViewItem, lisViewItemChart } from './listview';
import { menu, menuItem } from './menu';
import { message } from './message';
import { navBar } from './navbar';
import rangeCalendar from './rangeCalendar';
import skeleton from './skeleton';
import stepper from './stepper';

const listBox = {
  container: {
    backgroundColor: 'backgroundBase',
    borderRadius: astroTokensDark.radius.md,
  },
  option: {
    color: astroTokensDark.color.gray[400],
    '&.is-focused': {
      color: astroTokensDark.color.gray[200],
      bg: '#2C323A',
    },
    '&.is-selected': {
      color: astroTokensDark.color.gray[200],
      bg: '#2C323A',
      '&.is-focused': {
        color: astroTokensDark.color.gray[200],
      },
    },
    '&.is-condensed': {
      color: astroTokensDark.color.gray[400],
      '&.is-focused': {
        color: astroTokensDark.color.gray[200],
      },
    },
    '&.is-focus-visible': {
      zIndex: 1,
      outline: '1px solid #ffffff',
      outlineOffset: '-1px',
      boxShadow: `inset 0 0 0 2px ${astroTokensDark.color.blue[500]}`,
    },
  },
};

const tab = {};

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
    color: astroTokensDark.color.blue[400],
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
    color: astroTokensDark.color.font.link,
    '&.is-hovered': {
      color: astroTokensDark.color.blue[300],
    },
  },
};

const statusIcon = {
  base: {
    '&.is-default': {
      bg: astroTokensDark.color.gray[100],
      span: {
        color: 'black',
      },
    },
    '&.is-critical': {
      bg: astroTokensDark.color.red[500],
      span: {
        color: 'black',
      },
    },
    '&.is-warning': {
      bg: astroTokensDark.color.yellow[500],
      span: {
        color: 'black',
      },
    },
    '&.is-info': {
      bg: astroTokensDark.color.blue[500],
      span: {
        color: 'black',
      },
    },
    '&.is-major': {
      bg: astroTokensDark.color.orange[500],
      span: {
        color: 'black',
      },
    },
    '&.is-minor': {
      bg: astroTokensDark.color.yellow[500],
      span: {
        color: 'black',
      },
    },
    '&.is-warning-neutral': {
      bg: astroTokensDark.color.gray[700],
      span: {
        color: astroTokensDark.color.gray[100],
      },
    },
    '&.is-fatal': {
      bg: astroTokensDark.color.gray[100],
      span: {
        color: astroTokensDark.color.gray[700],
      },
    },
    '&.is-selected.is-selected': {
      bg: 'black',
      span: {
        color: 'active',
      },
    },
  },
};

const environmentBreadcrumb = {
  button: {
    current: {
      color: astroTokensDark.color.gray[100],
      fontWeight: 2,
    },
  },
};

export default {
  rockerButton,
  rangeCalendar,
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
  environmentBreadcrumb,
  modal,
  tab,
  iconBadge,
  skeleton,
  stepper,
  footer,
  tooltip,
  popoverMenu: {
    container: {
      background: '#23282e',
      border: '1px solid',
      borderColor: '#39414B',
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
    container: {
      '&.is-last-column-sticky': {
        'thead tr th:last-of-type': {
          backgroundColor: 'backgroundBase',
          '&::after': { backgroundColor: astroTokensDark.color.common['border-dark'] },
        },
        'tbody tr': {
          '&:nth-of-type(odd) td:last-of-type': {
            '&::after': { backgroundColor: astroTokensDark.color.common['border-dark'] },
          },
          '&:nth-of-type(even) td:last-of-type': {
            backgroundColor: 'backgroundBase',
            '&::after': { backgroundColor: astroTokensDark.color.common['border-dark'] },
          },
        },
      },
    },
    caption: {
      color: astroTokensDark.color.font.base,
      borderBottomColor: astroTokensDark.color.common.border,
    },
    thead: {
      borderBottomColor: astroTokensDark.color.common.border,
      '&.is-sticky': {
        boxShadow: `0 1px 0 ${astroTokensDark.color.common.border}`,
      },
    },
    tbody: {
      borderTopColor: astroTokensDark.color.common.border,
    },
    row: {
      borderBottomColor: astroTokensDark.color.common.border,
      '&.is-hovered': {
        bg: astroTokensDark.color['table-row'].hover.bg,
        '& > td:last-of-type': {
          bg: astroTokensDark.color['table-row'].hover.bg,
        },
      },
      '&:nth-of-type(odd)': {
        bg: astroTokensDark.color.common.bg.base,
        '&.is-hovered': {
          bg: astroTokensDark.color['table-row'].hover.bg,
        },
        '& > td:last-of-type': {
          bg: astroTokensDark.color.common.bg.base,
        },
      },
    },
    head: {
      color: astroTokensDark.color.font.base,
    },
    data: {
      color: astroTokensDark.color.font.base,
    },
    resizer: {
      backgroundColor: astroTokensDark.color.common['border-dark'],
    },
  },
  statusIcon,
  fieldHelperText: {
    title: {
      '&.is-default': {
        color: 'text.fieldHelper',
      },
      '&.is-error': {
        color: 'text.error',
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
  accordionGrid: {
    header: {
      '&.is-hovered': {
        backgroundColor: '#2C323A',
      },
    },
  },
  imageUpload: {
    button: {
      background: 'transparent',
    },
    noImagePreview: {
      color: `${astroTokensDark.color.gray[100]} !important`,
    },
  },
};
