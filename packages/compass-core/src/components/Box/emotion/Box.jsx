import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { color, border, layout, space, flexbox, position, shadow, typography } from 'styled-system';
import { omit } from '@styled-system/props';
import { propType as stylePropType } from '@styled-system/prop-types';
import { omit as _omit } from 'underscore';
import { placement, stylePropKeys } from '../../../utils/StyleUtils';

/** Basic flexbox-based layout component for creating rows and columns,
 *  while controlling sizes and spacing.
 *  Accepts most of the styling props from [styled-system](https://styled-system.com/table).
 */
const Box = ({ isRow, theme, ...props }) => {
    const styleProps = { theme, flexDirection: isRow ? 'row' : 'column', ...props };

    return (
        <div
            css={css`
                ${border(styleProps)}
                ${color(styleProps)}
                ${layout(styleProps)}
                ${space(styleProps)}
                ${placement(styleProps)}
                ${position(styleProps)}
                ${flexbox(styleProps)}
                ${position(styleProps)}
                ${shadow(styleProps)}
                ${typography(styleProps)}
            `}
            {...omit(_omit(props, stylePropKeys))}
        />
    );
};

Box.propTypes = {
    /** When true, display as a row rather than a column */
    isRow: PropTypes.bool,
    theme: PropTypes.object,
    /** Gap between items, whether in a row or column */
    gap: stylePropType,
};

Box.defaultProps = {
    isRow: false,
    display: 'flex', // eslint-disable-line
};

export default Box;
