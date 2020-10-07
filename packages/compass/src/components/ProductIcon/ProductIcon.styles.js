import { css } from '@emotion/core';

export const withBackground =
    css`
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 0 6px rgba(0,0,0,0.15);
    `;

export const iconStyle = color => css`
    height: 40px;
    width: 40px;
    position: relative;
    color: ${color};

    svg {
        width: 100%;
        height: 100%;
        z-index: 1;
        fill: ${color};
        color: ${color};
    }

`;
