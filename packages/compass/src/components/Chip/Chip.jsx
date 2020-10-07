import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import CloseSVG from '@mdi/svg/svg/close.svg';
import chroma from 'chroma-js';
import { space, typography } from 'styled-system';
import { useTheme } from 'emotion-theming';
import { typeToVariant } from '@pingux/compass-core/lib/utils/PropUtils';
import { makeIconButton } from '../IconButton';
import { textProps, allCapsStyle } from '../../styles/text';

const getLabelColor = bg => (
    chroma.valid(bg) && chroma(bg).luminance() > 0.5 ? 'text.primary' : 'text.primaryLight'
);
const getBorderColor = bg => (
    chroma.valid(bg) && chroma(bg).luminance() > 0.95 ? 'line.light' : bg
);

const chipVariants = {
    default: {
        color: 'neutral.10',
    },
    critical: {
        textColor: 'critical.dark',
        color: 'critical.light',
    },
    success: {
        textColor: 'success.dark',
        color: 'success.light',
    },
    warning: {
        textColor: 'warning.dark',
        color: 'warning.light',
    },
    label: {
        textColor: 'text.secondary',
        color: 'neutral.90',
        isAllCaps: false,
    },
};

const Chip = ({
    children,
    type, // eslint-disable-line react/prop-types
    variant = typeToVariant('Chip', Object.keys(chipVariants), type, 'default'),
    color = chipVariants[variant].color,
    'data-id': dataId,
    border,
    afterContent,
    textColor = chipVariants[variant].textColor,
    ...props
}) => {
    const theme = useTheme();
    const themeProps = {
        ...textProps({
            size: 'xs',
            weight: 1,
            isAllCaps: chipVariants[variant].isAllCaps === undefined
                ? true
                : chipVariants[variant].isAllCaps,
        }),
        ...props,
        theme,
    };
    const bgColor = themeGet(`colors.${color}`, color)(themeProps);
    const borderColor = border || getBorderColor(bgColor);
    const padding = themeGet('space.xs', 5)(themeProps);
    const labelColor = textColor || getLabelColor(bgColor);

    return (
        <span
            data-id={dataId}
            css={css`
                align-items: center;
                display: inline-flex;
                padding: 1px 0;
                background: ${bgColor};
                border: 1px solid ${themeGet(`colors.${borderColor}`, borderColor)(themeProps)};
                border-radius: 5px;
                ${space(themeProps)}
            `}
        >
            <span
                css={css`
                    ${typography(themeProps)}
                    ${allCapsStyle(themeProps)}
                    padding: 0 ${afterContent ? '0' : padding}px 0 ${padding}px;
                    color: ${themeGet(`colors.${labelColor}`, labelColor)(themeProps)};
                    min-width: 50px;
                    text-align: center;
                    box-sizing: border-box;
                `}
            >
                {children}
            </span>
            {afterContent}
        </span>
    );
};

Chip.propTypes = {
    /** Content that appears after the label. Good for close buttons. */
    afterContent: PropTypes.node,
    /** Specify the border color.
     *  Otherwise, a gray border appears only when the chip is very light. */
    border: PropTypes.string,
    /** Color of the chip. Really the background color. The text color is calculated based on it. */
    color: PropTypes.string,
    /** Defines the "data-id" for top-level HTML container. */
    'data-id': PropTypes.string,
    /** Usually, the text color is calculated, but you can set it too. */
    textColor: PropTypes.string,
    /** Prepackaged styles */
    variant: PropTypes.oneOf(Object.keys(chipVariants)),
};

export const ChipCloseButton = makeIconButton(CloseSVG, 'Close', 10);

export default Chip;
