import colors from '@pingux/astro/lib/cjs/styles/colors';

export const COLORS = {
    BLACK: colors.black,
    BLUE: colors.active,
    ERROR: colors.critical.bright,
    ERROR_LIGHT: colors.critical.light,
    GRAY: colors.neutral[90],
    GREEN: colors.success.bright,
    PURPLE: colors.decorative[0],
    RED: colors.decorative[8],
    WHITE: colors.white,
    ORANGE: colors.decorative[1],
    TRANSLUCENTPURPLE: `${colors.decorative[0]}80`,
};
