import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import { typography } from 'styled-system';

import { active, neutral } from '../../styles/colors';
import spacing from '../../styles/spacing';

export const getTabStyle = (props) => {
    const { isSelected } = props;

    const activeCSS = css`
        border-bottom: 2px solid ${themeGet('colors.active', active)(props)};
        color: ${themeGet('colors.active', active)(props)};
    `;

    return css`
        cursor: pointer;
        margin-right: ${spacing.sm}px;
        padding: ${spacing.xs}px ${spacing.sm}px;
        color: ${themeGet('colors.neutral[60]', neutral[60])(props)};
        ${isSelected && activeCSS}
        ${typography(props)}

        &:last-of-type {
            margin-right: 0;
        }
    `;
};
