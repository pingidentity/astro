import React from 'react';
import PropTypes from 'prop-types';
import { propType as styleProp } from '@styled-system/prop-types';
import { css } from '@emotion/core';
import { color } from 'styled-system';
import { gridItemStyle, gridStyle } from '../../../utils/GridUtils';

/** An item within an ExplicitGrid component */
export const ExplicitGridItem = ({
    children,
    column,
    columnSpan,
    row,
    rowSpan,
    ...props
}) => (
    <div
        css={css`
            display: block;
            width: 100%;
            ${gridItemStyle({ column, columnSpan, row, rowSpan, ...props })}
            ${color(props)}
        `}
        {...props}
    >
        {children}
    </div>
);

ExplicitGridItem.propTypes = {
    /** Column number, can be written as an array for responsiveness. The first column is 1 */
    column: styleProp,
    /** Spread an item over more than one column */
    columnSpan: PropTypes.number,
    /** Row number, can be written as an array for responsiveness. The first row is 1 */
    row: styleProp,
    /** Spread an item over more than one row */
    rowSpan: PropTypes.number,
};

ExplicitGridItem.defaultProps = {
    columnSpan: 1,
    rowSpan: 1,
};

/** A layout component that uses CSS Grid to position items explicitly in rows and columns */
const ExplicitGrid = ({
    children,
    columns,
    gap,
    rows,
    ...props
}) => (
    <div
        css={gridStyle({ ...props, columns, rows, gap })}
        {...props}
    >
        {children}
    </div>
);

ExplicitGrid.propTypes = {
    /** Number of columns.
     *  This can be an array, which will use breakpoints if they've been defined in the theme */
    columns: styleProp.isRequired,
    /** Define both horizontal and vertical gaps */
    gap: styleProp,
    /** Gap between columns */
    hGap: styleProp,
    /** Number of rows.
     *  This can be an array, which will use breakpoints if they've been defined in the theme */
    rows: styleProp.isRequired,
    /** Gap between rows */
    vGap: styleProp,
};

ExplicitGrid.defaultProps = {
    gap: 20,
};

export default ExplicitGrid;
