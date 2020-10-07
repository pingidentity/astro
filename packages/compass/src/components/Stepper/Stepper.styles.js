import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

import { stepStatuses } from './Stepper.constants';
import { accent, active, line, neutral } from '../../styles/colors';
import spacing from '../../styles/spacing';

const {
    COMPLETED,
    INACTIVE,
} = stepStatuses;

export const stepperWrapper = css`
    flex: 1 1 auto;
    padding: ${spacing.lg}px 0;
`;

export const getStepStyle = (props) => {
    const { status } = props;
    const completedCSS = `
        background-color: ${themeGet('colors.active', active)(props)};
    `;

    const inactiveCSS = `
        border: 1px solid ${themeGet('colors.line.regular', line.regular)(props)};
        background-color: ${themeGet('colors.neutral[95]', neutral[95])(props)};
    `;

    // IE11 can't deal with align-items: center and min-height, so we're just setting the height
    return css`
        align-items: center;
        justify-content: center;
        height: 30px;
        min-width: 30px;
        border: 1px solid ${themeGet('colors.active', active)(props)};
        border-radius: 50%;
        background-color: ${themeGet('colors.accent[90]', accent[90])(props)};

        ${status === COMPLETED ? completedCSS : ''}
        ${status === INACTIVE ? inactiveCSS : ''}
    `;
};

export const getLineStyle = (props) => {
    const {
        status,
    } = props;
    const inactiveCSS = `
        border-bottom: 2px dotted ${themeGet('colors.line.regular', line.regular)(props)};
    `;

    return css`
        flex: 1 1 auto;
        margin: 0;
        border: none;
        border-bottom: 2px solid ${themeGet('colors.active', active)(props)};
        align-self: center;

        ${status === INACTIVE ? inactiveCSS : ''}
    `;
};
