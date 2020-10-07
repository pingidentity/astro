import { css } from '@emotion/core';

export const wrapper = css`
    display: flex;
    flex-direction: column;
    height: 70%;
`;

export const bodyWrapper = css`
    display: flex;
    height: 100%;
    width: 100%;
`;

export const topPanel = css`
    border-bottom: 1px solid gray;
`;

export const globalStyles = css`
    html, body, #root, #root > * {
        height: 100%;
    }
    canvas {
        outline-width: 0;
    }
`;
