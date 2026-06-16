import sizes from '../sizes';

const circle = {
  justifyContent: 'center',
  alignItems: 'center',
  '&.is-circle': {
    borderRadius: '50%',
  },
};

const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconWrapper = {
  xs: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.xs,
    minWidth: sizes.avatar.xs,
    height: sizes.avatar.xs,
    width: sizes.avatar.xs,
    fontSize: sizes.avatarFontSize.xs,
    ...centered,
    ...circle,
  },
  sm: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.sm,
    minWidth: sizes.avatar.sm,
    height: sizes.avatar.sm,
    width: sizes.avatar.sm,
    fontSize: sizes.avatarFontSize.sm,
    ...centered,
    ...circle,
  },
  md: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.md,
    minWidth: sizes.avatar.md,
    height: sizes.avatar.md,
    width: sizes.avatar.md,
    fontSize: sizes.avatarFontSize.md,
    ...centered,
    ...circle,
  },
  lg: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.lg,
    minWidth: sizes.avatar.lg,
    height: sizes.avatar.lg,
    width: sizes.avatar.lg,
    fontSize: sizes.avatarFontSize.lg,
    ...centered,
    ...circle,
  },
  xl: {
    borderRadius: '.25rem',
    minHeight: sizes.avatar.xl,
    minWidth: sizes.avatar.xl,
    height: sizes.avatar.xl,
    width: sizes.avatar.xl,
    fontSize: sizes.avatarFontSize.xl,
    ...centered,
    ...circle,
  },
};

export default {
  ...iconWrapper,
};
