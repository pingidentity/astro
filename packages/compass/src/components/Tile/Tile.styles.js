import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

import { active, neutral } from '../../styles/colors';
import spacing from '../../styles/spacing';

export const getTileStyle = (props) => {
    return css`
        display: inline-flex;
        position: relative;
        padding: ${themeGet('space.lg', spacing.lg)(props)}px;
        box-shadow: 0 1px 4px 1px ${neutral[90]};
        transition: all .1s ease-in-out;
        &:hover,
        &:focus {
            box-shadow: 0 1px 4px 1px ${neutral[80]};
            transform: scale(1.1);
        }
    `;
};

export const getTileIconStyle = (props) => {
    return css`
        background-color: ${themeGet('colors.active', active)(props)};
        border-top-right-radius: 80%;
        padding: ${themeGet('space.xs', spacing.xs)(props)}px;
        padding-bottom: 3px;
        padding-left: 3px;
        position: absolute;
        bottom: 0;
        left: 0;
    `;
};
