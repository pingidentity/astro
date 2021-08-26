import colors from '@pingux/astro/lib/cjs/styles/colors';

export const COLORS = {
    BLACK: colors.black,
    BLUE: colors.active,
    ERROR: colors.critical.bright,
    ERROR_LIGHT: colors.critical.light,
    GRAY: colors.neutral[90],
    GRAY_LIGHT: colors.neutral[80],
    GRAY_MEDIUM: colors.neutral[60],
    GREEN: colors.success.bright,
    PURPLE: colors.decorative[0],
    RED: colors.decorative[8],
    WHITE: colors.white,
    ORANGE: colors.decorative[1],
    TRANSLUCENTPURPLE: `${colors.decorative[0]}80`,
    TRANSLUCENTRED: `${colors.decorative[8]}80`,
};
