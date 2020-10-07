import { css } from '@emotion/core';
import { space } from 'styled-system';
import themeGet from '@styled-system/theme-get';

export const iconStyle = ({ bg, fill, height, width, ...props }) => {
    const heightUnits = `${height}${typeof height === 'number' ? 'px' : ''}`;
    const widthUnits = `${width}${typeof width === 'number' ? 'px' : ''}`;

    return css`
        ${space(props)}
        background: ${bg ? themeGet(`colors.${bg}`, bg)(props) : 'transparent'};
        box-sizing: border-box;
        height: ${heightUnits};
        vertical-align: middle;
        width: ${widthUnits};
        ${bg ? 'padding: 0.2em;' : ''}

        path {
            fill: ${themeGet(`colors.${fill}`, fill)(props)};
        }
    `;
};
