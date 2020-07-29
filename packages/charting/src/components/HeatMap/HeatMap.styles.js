import { css } from '@emotion/core';

export const containerStyles = css`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

export const getOuterContainerStyles = height => css`
    height: ${height}px;
`;
