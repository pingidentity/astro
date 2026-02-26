import { astroTokensDark } from '@pingux/onyx-tokens';

import { colors } from '../colors';

export const listViewItem = {
  styledListItem: {
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'border.attachment',
    },
    bg: 'backgroundBase',
    '&.is-selected': {
      bg: 'background.hover',
    },
    '&.is-hovered': {
      bg: 'background.hover',
    },
    '&.is-focused': {
      boxShadow: '0 0 0 3px inset #1a73e8',
      bg: 'background.hover',
    },
  },
  expandableStyledListItem: {
    '&.is-hovered': {
      bg: 'background.hover',
    },
    '&.is-selected': {
      bg: 'background.hover',
    },
    '&.is-focused': {
      bg: 'background.hover',
    },
  },
  expandIcon: {
    color: astroTokensDark.color.gray[100],
    fill: `${colors.secondary} !important`,
  },
  expandableRow: {
    '&.has-separator': {
      borderBottomColor: 'border.attachment',
    },
  },
};

export const listView = {
  container: {
    borderColor: 'border.attachment',
  },
};

export const lisViewItemChart = {
  title: {
    color: astroTokensDark.color.gray[100],
  },
  count: {
    color: astroTokensDark.color.gray[100],
  },
  countLabel: {
    color: astroTokensDark.color.gray[100],
  },
  chartLabel: {
    color: astroTokensDark.color.gray[100],
  },
  trend: {
    color: astroTokensDark.color.gray[100],
  },
  chartButton: {
    color: astroTokensDark.color.gray[100],
  },
};
