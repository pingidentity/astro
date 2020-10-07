import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { omit } from '@styled-system/props';
import { propType as stylePropType } from '@styled-system/prop-types';
import { iconStyle } from './Icon.styles';

import useCompassTheme from '../../styles/useCompassTheme';

/** The icon component can be used to render SVG icons. Use SVGR to import SVG files
 *  as React components and pass them into this component, and you can use the theme
 *  to color the icon. You can also reuse the same icon with `makeIcon`.
 */
const Icon = forwardRef(({
    bg,
    color,
    component: Component,
    size,
    title,
    fill = color,
    height = size,
    width = size,
    ...props
}, ref) => {
    const nonStyleProps = omit(props);
    const theme = useCompassTheme();

    return (
        <Component
            aria-label={title}
            css={iconStyle({ ...props, bg, height, width, fill, theme })}
            fill={fill}
            height={height}
            title={title}
            width={width}
            ref={ref}
            viewBox="0 0 24 24"
            {...nonStyleProps}
        />);
});

Icon.propTypes = {
    bg: stylePropType,
    color: stylePropType,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    fill: stylePropType,
    height: stylePropType,
    size: stylePropType,
    title: PropTypes.string,
    width: stylePropType,
};

Icon.defaultProps = {
    color: 'currentColor',
    size: '1em',
};

export const makeIcon = (IconComponent, title) => forwardRef((props, ref) => (
    <Icon
        title={title}
        ref={ref}
        component={IconComponent}
        {...props}
    />
));

export default Icon;
