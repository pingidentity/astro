import themeGet from '@styled-system/theme-get';
import { css } from '@emotion/core';
import { system } from 'styled-system';
import { combineStyleProps } from './StyleUtils';

const capitalize = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
const identity = x => `${x}`;
const span = x => `span ${x}`;
const withGaps = x => `${(x * 2) - 1}`;

const getRowOrColumn = (rowOrColumn = 'column') => ({
    [rowOrColumn]: {
        property: `grid-${rowOrColumn}-start`,
        transform: identity,
    },
    [`ms${capitalize(rowOrColumn)}`]: {
        property: `-ms-grid-${rowOrColumn}`,
        transform: withGaps,
    },
    [`${rowOrColumn}Span`]: {
        property: `grid-${rowOrColumn}-end`,
        transform: span,
    },
    [`ms${capitalize(rowOrColumn)}Span`]: {
        property: `-ms-grid-${rowOrColumn}-span`,
        transform: withGaps,
    },
});

const rowColumn = system({
    ...getRowOrColumn(),
    ...getRowOrColumn('row'),
});

/** Style function for cross-browser column/row properties,
 *  Accepts column, row, columnSpan, and rowSpan
 */
export const gridItemStyle = ({
    column,
    columnSpan,
    row,
    rowSpan,
    ...props
}) => {
    const rowColumnProps = {
        column,
        row,
        msColumn: column,
        msRow: row,
        columnSpan,
        msColumnSpan: columnSpan,
        rowSpan,
        msRowSpan: rowSpan,
        ...props,
    };

    return rowColumn(rowColumnProps);
};

const getTemplate = () => count => `repeat(${count}, 1fr)`;
const getMSTemplate = gap => count => `1fr (${gap}px 1fr)[${count - 1}]`;

const makeTemplate = (gap, rowOrColumn = 'column') => system({
    [`${rowOrColumn}s`]: {
        property: `grid-template-${rowOrColumn}s`,
        transform: getTemplate(gap),
    },
    [`${rowOrColumn}Gap`]: {
        property: `${rowOrColumn}-gap`,
    },
    [`ms${capitalize(rowOrColumn)}s`]: {
        property: `-ms-grid-${rowOrColumn}s`,
        transform: getMSTemplate(gap),
    },
});

export const gridStyle = ({
    columns,
    gap,
    hGap: hGapProp = gap,
    rows,
    vGap: vGapProp = gap,
    ...props
}) => {
    const hGap = themeGet(`space.${hGapProp}`, hGapProp)(props);
    const vGap = themeGet(`space.${vGapProp}`, vGapProp)(props);

    const columnTemplate = makeTemplate(hGap);
    const rowTemplate = makeTemplate(vGap, 'row');

    return css`
        display: -ms-grid;
        display: grid;
        ${columnTemplate({ ...props, columns, columnGap: hGap, msColumns: columns })}
        ${rowTemplate({ ...props, rows, rowGap: vGap, msRows: rows })}
        width: 100%;
    `;
};

const maybePx = number => (typeof number === 'number' ? `${number}px` : number);

const autoColumnsSystem = system({
    minMaxColumnWidth: {
        property: 'grid-template-columns',
        transform: minMaxColumnWidth => `repeat(auto-fit, minmax(${minMaxColumnWidth}))`,
    },
});

const combineMinMax = combineStyleProps((min, max) => `${maybePx(min)}, ${maybePx(max)}`);

export const autoColumns = ({ minColumnWidth, maxColumnWidth }) => autoColumnsSystem({
    minMaxColumnWidth: combineMinMax(minColumnWidth, maxColumnWidth),
});

export const ieGridGaps = system({
    columnGap: {
        properties: ['marginLeft', 'marginRight'],
        scale: 'space',
        defaultScale: {},
        transform: (x, scale) => `calc(${scale[x] || x}px / 2)`,
    },
    rowGap: {
        properties: ['marginTop', 'marginBottom'],
        scale: 'space',
        defaultScale: {},
        transform: (x, scale) => `calc(${scale[x] || x}px / 2)`,
    },
});

export const ieAutoColumns = system({
    minColumnWidth: {
        property: 'min-width',
    },
    maxColumnWidth: {
        property: 'max-width',
    },
});

