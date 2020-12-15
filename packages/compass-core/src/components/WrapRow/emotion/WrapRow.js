import React from 'react';
import { css } from '@emotion/core';
import { propType as styleProp } from '@styled-system/prop-types';
import { omit } from '@styled-system/props';
import { flexbox } from 'styled-system';

/** A layout component that uses flex-wrap to lay items out in a row while preserving
 *  horizontal and vertical gaps at different display widths
 */
const WrapRow = ({
    children,
    gap,
    hGap = gap,
    vGap = gap,
    ...props
}) => (
    <div
        css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: -${vGap / 2}px -${hGap / 2}px;

            & > * {
                margin: ${vGap / 2}px ${hGap / 2}px;
            }
            ${flexbox(props)}
        `}
        {...omit(props)}
    >
        {children}
    </div>
);

WrapRow.propTypes = {
    /** Sets both horizontal and vertical gaps */
    gap: styleProp,
    /** Horizontal gap between items */
    hGap: styleProp,
    /** Vertical gap between items */
    vGap: styleProp,
};

WrapRow.defaultProps = {
    gap: 0,
};

export default WrapRow;
