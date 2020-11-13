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

export const panelHeader = css`
    border-bottom: 1px solid #E1DDFD;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 30px 15px 20px 15px;
`;

export const panelHeaderItem = css`
    align-items: center;
    border-bottom: 2px solid transparent;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
`;

export const panelHeaderItemActive = css`
    border-bottom: 2px solid #4462ED;
`;

export const globalStyles = css`
    html, body, #root, #root > * {
        height: 100%;
    }
    canvas {
        outline-width: 0;
    }
`;
