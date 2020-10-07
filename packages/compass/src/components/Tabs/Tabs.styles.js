import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

import { neutral } from '../../styles/colors';

export const getTabsStyle = props => css`
    display: flex;
    padding: 0;
    list-style-type: none;
    border-bottom: 1px solid ${themeGet('neutral[60]', neutral[60])(props)};
`;
