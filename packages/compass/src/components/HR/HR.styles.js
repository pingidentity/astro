import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

export const hrStyles = props => css`
    border-color: ${themeGet(`colors.${props.color}`, '#aaa')(props)};
    border-style: solid;
    border-width: 1px 0 0 0;
    height: 1px;
    margin: 0;
    width: 100%;
`;
