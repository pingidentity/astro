import { css } from '@emotion/core';
import { space, layout, border, color } from 'styled-system';

export const cropperStyle = props => css`
    ${color(props)}
    ${space(props)}
    ${layout(props)}
    ${border(props)}
    overflow: hidden;
    border-radius: 50%;
`;

export const imageStyle = css`
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
`;

