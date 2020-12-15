import { css } from '@emotion/core';
import { space } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import { focusOutlineCSS } from '../../styles/focusOutline';
import { getButtonColors } from '../Button/Button.styles';
import { disabledCSS } from '../../styles/mixins';
import { buttonStatuses } from '../Button/Button.constants';

export const iconButtonStyle = (buttonHeight, props) => {
    const {
        theme: { colors },
        hasSimpleHover,
        isDisabled,
        isInverted,
        isSquare,
        color,
        status,
    } = props;
    const buttonColors = getButtonColors(colors);
    const iconColor = color ? themeGet(`colors.${color}`, color)(props) : buttonColors.default.color;
    const iconHoverColor = hasSimpleHover ? iconColor : buttonColors.default.hover.color;
    const iconHoverBackground = hasSimpleHover ? 'white' : colors.accent[95];

    return css`
        ${space(props)}
        cursor: pointer;
        display: inline-block;
        height: ${buttonHeight}px;
        background: ${isInverted ? buttonColors.primary.background : 'transparent'};
        border: none;
        border-radius: ${isSquare ? 3 : Math.floor(buttonHeight / 2) + 1}px;
        padding: 0;
        position: relative;
        vertical-align: middle;
        width: ${buttonHeight}px;

        svg {
            font-size: ${Math.floor(buttonHeight * 0.9)}px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }

        path {
            fill: ${isInverted ? buttonColors.primary.color : iconColor};
        }

        &:hover {
            path {
                fill: ${isInverted ? buttonColors.primary.color : iconHoverColor};
            }
            background: ${isInverted ? buttonColors.primary.hover.background : iconHoverBackground};
        }

        &:active {
            background: ${isInverted ? buttonColors.primary.active.background : buttonColors.default.active.background};

            path {
                fill: ${colors.white};
            }
        }

        ${focusOutlineCSS}

        ${isDisabled ? disabledCSS : ''}

        ${status === buttonStatuses.LOADING ? 'pointer-events: none;' : ''}
    `;
};
