import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

export const caretStyle = props => css`
    pointer-events: none;
    position: absolute;
    right: ${themeGet('space.sm', 10)(props)}px;
    top: 50%;
    transform: translateY(-50%);
`;
