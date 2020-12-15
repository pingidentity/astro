import React from 'react';
import { propType as styleProp } from '@styled-system/prop-types';
import { grid } from 'styled-system';
import { css } from '@emotion/core';
import { ieGridGaps, ieAutoColumns, autoColumns } from '../../../utils/GridUtils';

/** A layout component that uses CSS Grid to position items in a set number of columns */
const AutoGrid = ({
    children,
    gap,
    columnGap = gap,
    rowGap = gap,
    maxColumnWidth,
    minColumnWidth,
    theme, // eslint-disable-line react/prop-types
    ...props
}) => (
    <div
        css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            > * {
                ${ieGridGaps({ columnGap, rowGap, theme })}
                ${ieAutoColumns({ minColumnWidth, maxColumnWidth, theme })}
                flex: 1 1 auto;
            }

            @supports (display: grid) {
                display: grid;
                ${autoColumns({ minColumnWidth, maxColumnWidth, theme })}
                ${grid({ gridColumnGap: columnGap, gridRowGap: rowGap, theme })}
                margin: 0;

                > * {
                    min-width: 0;
                    margin: 0;
                }
            }
        `}
        {...props}
    >
        {children}
    </div>
);

AutoGrid.propTypes = {
    /** Define both horizontal and vertical gaps */
    gap: styleProp,
    /** Gap between columns */
    columnGap: styleProp,
    /** Gap between rows */
    rowGap: styleProp,
    /** Maximum width an item can have */
    maxColumnWidth: styleProp,
    /** Minimum width an item must have to fit in a row before wrapping */
    minColumnWidth: styleProp,
};

AutoGrid.defaultProps = {
    gap: 20,
    maxColumnWidth: '1fr',
    minColumnWidth: 200,
};

export default AutoGrid;
