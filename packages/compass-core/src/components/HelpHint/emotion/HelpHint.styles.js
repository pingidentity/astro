import { css } from '@emotion/core';
import { color as ssColor, space, border, typography } from 'styled-system';

export const helpHintStyle = props => css`
    margin: 14px;
    ${ssColor(props)}
    ${space(props)}
    ${border(props)}
    ${typography(props)}
`;

export const arrowPlacementStyle = css`
    div[data-placement^='top'] > & {
        bottom: 0;
        svg {
            transform: rotate(180deg);
        }
    }
    div[data-placement^='bottom'] > & {
        top: 0;
    }
    div[data-placement^='right'] > & {
        left: 0;
        svg {
            transform: rotate(-90deg);
        }
    }
    div[data-placement^='left'] > & {
        right: 0;
        svg {
            transform: rotate(90deg);
        }
    }
`;

