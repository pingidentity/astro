import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import { typography } from 'styled-system';

import { focusOutlineCSS } from '../../styles/focusOutline';
import { disabledCSS } from '../../styles/mixins';
import { buttonStatuses } from './Button.constants';

const {
    NORMAL,
    LOADING,
} = buttonStatuses;

export const getButtonColors = colors => ({
    default: {
        background: colors.white,
        border: colors.active,
        color: colors.active,
        hover: {
            background: colors.accent[99],
            border: colors.accent[40],
            color: colors.accent[40],
        },
        active: {
            background: colors.active,
            border: colors.active,
            color: colors.white,
        },
    },
    primary: {
        background: colors.active,
        border: colors.active,
        color: colors.white,
        hover: {
            background: colors.accent[40],
            border: colors.accent[40],
            color: colors.white,
        },
        active: {
            background: colors.accent[20],
            border: colors.accent[20],
            color: colors.white,
        },
    },
    text: {
        background: 'transparent',
        border: 'transparent',
        color: colors.active,
        hover: {
            background: colors.accent[95],
            border: colors.accent[95],
            color: colors.accent[40],
        },
        active: {
            background: colors.active,
            border: colors.active,
            color: colors.white,
        },
    },
    success: {
        background: colors.success.bright,
        border: colors.success.bright,
        color: 'transparent',
    },
    critical: {
        background: colors.critical.bright,
        border: colors.critical.bright,
        color: 'transparent',
    },
});

const getButtonCSS = data => `
    background: ${data.background};
    border: 1px solid ${data.border};
    color: ${data.color};
    position: relative;

    ${data.hover ? `
        &:hover {
            background: ${data.hover.background};
            border-color: ${data.hover.border};
            color: ${data.hover.color};
        }
    ` : ''}

    ${data.active ? `
        &:active {
            background: ${data.active.background};
            border-color: ${data.active.border};
            color: ${data.active.color};
        }
    ` : ''}
`;

export const buttonStyle = (props) => {
    const {
        theme: { space, colors },
        isDisabled,
        isInline,
        status,
        variant,
    } = props;
    const buttonColors = getButtonColors(colors);

    const colorKey = (status === NORMAL || status === LOADING) ? variant : status;
    const height = 36;
    const inlineHeight = 30;

    const inlineCSS = `
        border-radius: ${inlineHeight / 2}px;
        height: ${inlineHeight}px;
    `;

    const nonInlineCSS = `
        border-radius: 3px;
        height: ${height}px;
    `;

    const nonNormalCSS = `
        pointer-events: none;
    `;

    const loadingCSS = `
        color: transparent;
    `;

    return css`
        align-items: center;
        box-shadow: none;
        cursor: pointer;
        display: inline-flex;
        padding: 0 ${space.md}px;
        text-decoration: none;
        ${focusOutlineCSS}
        ${typography(props)}

        * + * {
            margin-left: ${themeGet('space.sm', space.sm)(props)}px;
        }

        ${getButtonCSS(buttonColors[colorKey])}
        ${isInline ? inlineCSS : nonInlineCSS}
        ${status !== NORMAL ? nonNormalCSS : ''}
        ${status === LOADING ? loadingCSS : ''}

        ${isDisabled ? disabledCSS : ''}
    `;
};

const getButtonIconCSS = data => `
    background: ${data.color};
    border-radius: 50%;
    width: 1.4em;
    height: 1.4em;
    path {
        fill: ${data.background};
    }

    ${data.hover ? `
        button:hover & {
            background: ${data.hover.color};
            path {
                fill: ${data.hover.background};
            }
        }
    ` : ''}

    ${data.active ? `
        button:active & {
            background: ${data.active.color};
            path {
                fill: ${data.active.background};
            }
        }
    ` : ''}
`;

const flipColors = ({ color, background }) => ({
    background: color,
    color: background,
});

const flipAllColors = ({
    hover,
    active,
    ...data
}) => ({
    ...flipColors(data),
    hover: flipColors(hover),
    active: flipColors(active),
});

const getStatusIconColors = colors => ({
    success: {
        background: colors.success.bright,
        border: colors.success.bright,
        color: colors.white,
    },
    critical: {
        background: colors.white,
        border: colors.white,
        color: colors.critical.bright,
    },
});

export const statusIconStyle = (buttonProps) => {
    const { theme: { colors }, status } = buttonProps;
    const iconColors = getStatusIconColors(colors);

    return css`
        pointer-events: none;
        background: ${status === LOADING ? 'transparent' : colors.white};
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);

        ${iconColors[status] ? getButtonIconCSS(iconColors[status]) : ''}
    `;
};

export const buttonIconStyle = (buttonProps) => {
    const {
        theme: { colors },
        isInline,
        status,
        variant,
    } = buttonProps;
    const buttonColors = getButtonColors(colors);

    const colorKey = (status === NORMAL || status === LOADING) ? variant : status;

    return css`
        pointer-events: none;
        ${getButtonIconCSS(isInline ? flipAllColors(buttonColors[colorKey]) : buttonColors[colorKey])}
        ${status === LOADING ? `
            visibility: hidden;
        ` : ''}
    `;
};
