import { useMemo } from 'react';
import { useTheme } from 'emotion-theming';
import themeGet from '@styled-system/theme-get';
import merge from 'lodash/merge'; // need deep merging
import StylePropTypes from '@styled-system/prop-types';

export const placement = ({
    flexDirection,
    gap,
    hGap = flexDirection === 'row' ? gap : undefined,
    vGap = flexDirection === 'column' ? gap : undefined,
    theme,
}) => `
    ${hGap ? `
        > * + * {
            margin-left: ${themeGet(`space.${hGap}`, hGap)({ theme })}px;
        }
    ` : ''}
    ${vGap ? `
        > * + * {
            margin-top: ${themeGet(`space.${vGap}`, vGap)({ theme })}px;
        }
    ` : ''}
`;

export const makeUseDefaultTheme = defaultTheme => () => {
    const overlayTheme = useTheme();

    return useMemo(() => merge(defaultTheme, overlayTheme), [overlayTheme]);
};

export const useDefaultTheme = (defaultTheme) => {
    const overlayTheme = useTheme();

    return useMemo(() => merge(defaultTheme, useTheme()), [defaultTheme, overlayTheme]);
};

export const stylePropKeys = [
    ...Object.keys({
        ...StylePropTypes.position,
        ...StylePropTypes.layout,
        ...StylePropTypes.color,
        ...StylePropTypes.space,
        ...StylePropTypes.flexbox,
    }),
    'hGap',
    'vGap',
    'gap',
];

const asArray = x => (Array.isArray(x) ? x : [x]);
const itemAt = (list, index) => (index < list.length ? list[index] : list[list.length - 1]);

/** Combine two props for styled-system into one, accounting for breakpoints.
 *  (It only supports array syntax, not object syntax)
 */
export const combineStyleProps = combination => (first, second) => {
    const firstArray = asArray(first);
    const secondArray = asArray(second);
    const result = [];

    for (let i = 0; i < firstArray.length || i < secondArray.length; i += 1) {
        result.push(combination(itemAt(firstArray, i), itemAt(secondArray, i)));
    }
    return result;
};
