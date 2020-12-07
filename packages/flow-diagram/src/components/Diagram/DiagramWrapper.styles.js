import { css } from '@emotion/core';

export const diagramWrapper = css`
    width: 100%;
        position: relative;

    .diagram-component {
        flex: 1 1 auto;
        border: 1px solid #CACED3;
        background: #F7F8FD;
        height: 100%;
    }

    canvas {
        outline-width: 0;
    }
`;
