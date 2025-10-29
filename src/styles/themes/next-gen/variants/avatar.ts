import sizes from '../sizes';

export const avatar = {
  backgroundColor: 'lightcyan',
  color: 'darkcyan',
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
  '&.font-size-lg': {
    fontSize: sizes.avatarFontSize.lg,
  },
  '&.font-size-xl': {
    fontSize: sizes.avatarFontSize.xl,
  },
  '&.is-square': {
    borderRadius: '4px',
  },
  display: 'flex',
  borderRadius: '50%',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'standard',
};
