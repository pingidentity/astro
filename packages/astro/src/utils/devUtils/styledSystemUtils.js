import { useMemo } from 'react';
import { useTheme } from 'emotion-theming';
import themeGet from '@styled-system/theme-get';
import merge from 'lodash/merge'; // need deep merging
import StylePropTypes from '@styled-system/prop-types';

export const makeUseDefaultTheme = defaultTheme => () => {
  const overlayTheme = useTheme();

  return useMemo(() => merge(defaultTheme, overlayTheme), [overlayTheme]);
};

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
