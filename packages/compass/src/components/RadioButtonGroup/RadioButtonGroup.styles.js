import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

export const radioButtonGroupStyle = theme => css`
    .radiobutton__container {
        margin-bottom: ${themeGet('space.md', 15)({ theme })}px;
    }
`;
