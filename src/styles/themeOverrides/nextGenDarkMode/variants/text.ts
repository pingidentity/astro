import { astroTokensDark } from '@pingux/onyx-tokens';

export const text = {
  listViewItemExpandedText: {
    color: astroTokensDark.color.gray[100],
  },
  listViewItemText: {
    color: 'text.secondary',
  },
  searchNavTabLabel: {
    px: 'lg',
    color: astroTokensDark.color.gray[400],
    '.is-selected &, .is-hovered &': {
      color: 'white',
    },
    '.is-selected &': {
      color: 'white',
    },
    '.is-disabled &': {
      color: 'neutral.80',
    },
  },
  listViewItemTextSelected: {
    color: astroTokensDark.color.gray[100],
  },
  listViewItemSubtext: {
    color: astroTokensDark.color.gray[400],
  },
  itemTitle: {
    fontWeight: 2,
    color: 'text.secondary',
  },
  copyRightText: {
    color: astroTokensDark.color.gray[400],
  },
  placeholder: {
    color: astroTokensDark.color.gray[400],
    fontWeight: 1,
  },
  messagesText: {
    '&.is-success, &.is-warning, &.is-error, &.is-default': {
      '& > a': {
        color: 'white',
      },
    },

  },
  pageHeaderBody: {
    color: 'text.secondary',
  },
  pageHeaderTitle: {
    color: astroTokensDark.color.gray[100],
  },
  linkSelectFieldLabel: {
    color: astroTokensDark.color.font.link,
  },
  tabLabel: {
    color: astroTokensDark.color.font.base,
    '.is-selected &': {
      color: astroTokensDark.color.font.link,
    },
    '.is-selected &, .is-hovered &': {
      color: astroTokensDark.color.font.link,
    },
  },
};
