import sizes from '../sizes';

const circle = {
  '&.is-circle': {
    borderRadius: '50%',
  },
};

const iconWrapper = {
  xs: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.xs,
    minWidth: sizes.avatar.xs,
    height: sizes.avatar.xs,
    width: sizes.avatar.xs,
    fontSize: sizes.avatarFontSize.xs,
    ...circle,
  },
  sm: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.sm,
    minWidth: sizes.avatar.sm,
    height: sizes.avatar.sm,
    width: sizes.avatar.sm,
    fontSize: sizes.avatarFontSize.sm,
    ...circle,
  },
  md: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.md,
    minWidth: sizes.avatar.md,
    height: sizes.avatar.md,
    width: sizes.avatar.md,
    fontSize: sizes.avatarFontSize.md,
    ...circle,
  },
  lg: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.lg,
    minWidth: sizes.avatar.lg,
    height: sizes.avatar.lg,
    width: sizes.avatar.lg,
    fontSize: sizes.avatarFontSize.lg,
    ...circle,
  },
  xl: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.xl,
    minWidth: sizes.avatar.xl,
    height: sizes.avatar.xl,
    width: sizes.avatar.xl,
    fontSize: sizes.avatarFontSize.xl,
    ...circle,
  },
};

export default {
  ...iconWrapper,
};
