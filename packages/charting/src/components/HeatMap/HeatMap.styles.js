import { css } from '@emotion/core';

export const containerStyles = css`
    position: absolute !important;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export const getOuterContainerStyles = (height, width) => css`
    height: ${height}px;
    position: relative;
    ${width !== undefined ? `${width}px` : ''}
`;
