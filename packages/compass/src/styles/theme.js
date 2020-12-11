import spacing from './spacing';
import colors, { accent, brand, neutral, line, shadow } from './colors';
import { fontSizes } from './text';
import breakpoints from './breakpoints';

export default {
    space: spacing,
    colors: {
        ...colors,
        background: accent[99],
        menu: brand.slate,
        title: neutral[10],
        subtitle: neutral[30],
    },
    borders: {
        separator: `1px solid ${line.hairline}`,
    },
    breakpoints,
    fonts: {
        standard: '"Helvetica Neue", Helvetica, sans-serif',
    },
    fontSizes,
    sizes: {
        buttonHeight: 36,
        column: 400,
    },
    shadows: {
        standard: `0 1px 14px ${shadow}`,
        row: `0 0 9px ${accent[95]}`,
    },
};
