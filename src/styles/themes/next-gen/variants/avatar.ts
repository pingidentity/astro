import { astroTokens } from '@pingux/onyx-tokens';

import sizes from '../sizes';

export const avatar = {
  cursor: 'pointer',
  '&.is-orange': {
    backgroundColor: 'lightorange',
    color: 'darkorange',
  },
  '&.is-green': {
    backgroundColor: 'lightgreen',
    color: 'darkgreen',
  },
  '&.is-purple': {
    backgroundColor: 'lightpurple',
    color: 'darkpurple',
  },
  '&.is-pink': {
    backgroundColor: 'lightpink',
    color: 'darkpink',
  },
  '&.is-red': {
    backgroundColor: 'lightred',
    color: 'darkred',
  },
  '&.is-yellow': {
    backgroundColor: 'lightyellow',
    color: 'darkyellow',
  },
  '&.is-cyan': {
    backgroundColor: 'lightcyan',
    color: 'darkcyan',
  },
  '&.is-teal': {
    backgroundColor: 'lightteal',
    color: 'darkteal',
  },
  '&.is-blue': {
    backgroundColor: 'lightblue',
    color: 'darkblue',
  },
  '&.is-indigo': {
    backgroundColor: 'lightindigo',
    color: 'darkindigo',
  },
  '&.size-sm': {
    width: sizes.avatar.sm,
    height: sizes.avatar.sm,
  },
  '&.size-md': {
    width: sizes.avatar.md,
    height: sizes.avatar.md,
  },
  '&.size-xmd': {
    width: sizes.avatar.xmd,
    height: sizes.avatar.xmd,
  },
  '&.size-lg': {
    width: sizes.avatar.lg,
    height: sizes.avatar.lg,
  },
  '&.size-xl': {
    width: sizes.avatar.xl,
    height: sizes.avatar.xl,
  },
  '&.font-size-sm': {
    fontSize: sizes.avatarFontSize.sm,
  },
  '&.font-size-md': {
    fontSize: sizes.avatarFontSize.md,
  },
  '&.font-size-xmd': {
    fontSize: sizes.avatarFontSize.xmd,
  },
  '&.font-size-lg': {
    fontSize: sizes.avatarFontSize.lg,
  },
  '&.font-size-xl': {
    fontSize: sizes.avatarFontSize.xl,
  },
  '&.is-square': {
    borderRadius: '4px',
  },
  '&.is-square.size-lg': {
    borderRadius: '8px',
  },
  '&.is-square.size-xl': {
    borderRadius: '16px',
  },
  '&.is-logo': {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: astroTokens.color.gray[200],
    backgroundColor: 'transparent',
    '&.size-sm': {
      img: {
        width: sizes.avatarLogo.sm,
        height: sizes.avatarLogo.sm,
        borderRadius: '0px',
      },
    },
    '&.size-md': {
      img: {
        width: sizes.avatarLogo.md,
        height: sizes.avatarLogo.md,
        borderRadius: '0px',
      },
    },
    '&.size-xmd': {
      img: {
        width: sizes.avatarLogo.xmd,
        height: sizes.avatarLogo.xmd,
        borderRadius: '0px',
      },
    },
    '&.size-lg': {
      img: {
        width: sizes.avatarLogo.lg,
        height: sizes.avatarLogo.lg,
        borderRadius: '0px',
      },
    },
    '&.size-xl': {
      img: {
        width: sizes.avatarLogo.xl,
        height: sizes.avatarLogo.xl,
        borderRadius: '0px',
      },
    },
  },
  '&.is-image:not(.is-logo)': {
    '&.size-sm': {
      img: {
        width: sizes.avatar.sm,
        height: sizes.avatar.sm,
      },
    },
    '&.size-md': {
      img: {
        width: sizes.avatar.md,
        height: sizes.avatar.md,
      },
    },
    '&.size-xmd': {
      img: {
        width: sizes.avatar.xmd,
        height: sizes.avatar.xmd,
      },
    },
    '&.size-lg': {
      img: {
        width: sizes.avatar.lg,
        height: sizes.avatar.lg,
      },
    },
    '&.size-xl': {
      img: {
        width: sizes.avatar.xl,
        height: sizes.avatar.xl,
      },
    },
  },
  display: 'flex',
  borderRadius: '50%',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'standard',
};
