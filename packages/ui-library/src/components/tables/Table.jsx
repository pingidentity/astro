import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";

/**
 * @class Table
 *
 * @desc A stateless component for displaying tabular data
 *
 * @param {array} [data-id]
 *      Data-id for the component.
 * @param {array} [data]
 *      An array of objects with data in key value pairs.
 * @param {array} [headData]
 *      An array of values for the table head.
 * @param {array} [bodyData]
 *      An array of arrays for the body that are ordered in the same was as the headData.
 * @param {string} [verticalAlignment]
 *      Set vertical alignment for all the cells like TOP, MIDDLE, BOTTOM.
 * @param {string} [className]
 *      CSS class name for Table.
 * @param {bool} [fullWidth]
 *          Whether or not the table is full-width.
 * @param {'auto'|'full'|'full-fixed'} [width]
 *      The width of the table.
 * @param {bool} [fixed]
 *      If true, gives the table table-layout fixed.
 */

/**
 *
 * @param {Object[]} [columnStyling]
 *      Styling options for the columns in the table.
 * @param {'center'|'left'|'right'} [columnStyling.alignment]
 *      The horizontal alignment of the column.
 * @param {string} [columnStyling.minWidth]
 *      The minimum width of the column. Must be a string including a unit, ie 90px.PropTypes
 * @param {string} [columnStyling.maxWidth]
 *      The maximum width of the column. Must be a string including a unit. Due to
 *      limitations of the HTML <table/> spec, this will not work on a full width table.PropTypes
 * @param {string} [columnStyling.width]
 *      The width of the column. Must be a string with a unit.
 *
 */


const getHeadData = data => _.reduce(data, (headings, item) => _.union(headings, _.keys(item)), []);
const getBodyData = (data, headData) => _.map(data, item => _.map(headData, heading => item[heading]));

const cellClasses = {
    "TOP": "grid__cell--top",
    "MIDDLE": "grid__cell--middle",
    "BOTTOM": "grid__cell--bottom",
    "AUTO": "",
};

const columnAlignments = {
    CENTER: "center",
    LEFT: "left",
    RIGHT: "right"
};

const overflowOptions = {
    ELLIPSIS: "ellipsis",
    WRAP: "wrap"
};

const tableLayouts = {
    AUTO: "auto",
    FIXED: "fixed"
};

const tableWidths = {
    AUTO: "auto",
    FULL: "full",
    FULL_FIXED: "full-fixed"
};

const verticalAlignments = {
    AUTO: "AUTO",
    BOTTOM: "BOTTOM",
    MIDDLE: "MIDDLE",
    TOP: "TOP"
};

const renderColumnHeadings = (columnStyling = [], headData) => _.map(headData, (heading, idx) => {
    const {
        alignment = columnAlignments.LEFT,
        contentOverflow = overflowOptions.WRAP,
        minWidth,
        maxWidth,
        width,
    } = columnStyling[idx] || {};
    return (
        <th
            className={classnames(
                `grid__column--alignment-${alignment}`,
                `grid__column--overflow-${contentOverflow}`
            )}
            key={heading || idx}
            style={{
                ...maxWidth !== undefined ? { maxWidth } : {},
                ...minWidth !== undefined ? { minWidth } : {},
                ...width !== undefined ? { width } : {},
            }}
        >
            {heading}
        </th>
    );
});

const Table = props => {
    const {
        cellRenderers,
        className,
        columnStyling,
        data = [],
        "data-id": dataId,
        fullWidth,
        layout,
        lines,
        rowLabels,
        headData = getHeadData(data),
        bodyData = getBodyData(data, headData),
        verticalAlignment,
        width
    } = props;
    const classes = classnames("grid", className, {
        "grid--no-lines": !lines,
        "width-full": fullWidth || width === tableWidths.FULL_FIXED,
        "grid--solid-lines": props.headData === undefined && props.bodyData,
        "grid--full-width": width === tableWidths.FULL,
        "grid--fixed": layout === tableLayouts.FIXED
    });

    // if we're showing labels along the left side of the table, make sure the first column heading is empty
    if (rowLabels && headData) {
        if (headData.length < bodyData[0].length) {
            headData.splice(0,"");
        } else {
            headData[0] = "";
        }
    }

    return (
        <table className={classes} data-id={dataId}>
            {headData &&
                <thead>
                    {/* Have to have fallback for heading as a key, since header cells might be empty */}
                    <tr>{renderColumnHeadings(columnStyling, headData)}</tr>
                </thead>
            }
            <tbody>
                {_.map(bodyData, (item, index) => (
                    <tr key={index}>
                        {_.map(item, (entry, entryIndex) => {
                            const isLabel = rowLabels && entryIndex === 0;
                            const Cell = isLabel ? "th" : "td";
                            const cellValue = cellRenderers[entryIndex]
                                ? cellRenderers[entryIndex](entry, item)
                                : entry;

                            const {
                                alignment = columnAlignments.LEFT,
                                contentOverflow = overflowOptions.WRAP,
                                width: colWidth,
                                minWidth,
                                maxWidth = colWidth,
                            } = columnStyling[entryIndex] || {};

                            return (
                                <Cell
                                    key={`${index}-${entryIndex}`}
                                    className={classnames(
                                        cellClasses[verticalAlignment],
                                        `grid__cell--alignment-${alignment}`,
                                        `grid__cell--overflow-${contentOverflow}`
                                    )}
                                    style={{
                                        ...maxWidth !== undefined ? { maxWidth } : {},
                                        ...minWidth !== undefined ? { minWidth } : {},
                                        ...colWidth !== undefined ? { width: colWidth } : {},
                                    }}
                                >
                                    {cellValue}{isLabel && ":"}
                                </Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    bodyData: PropTypes.arrayOf(
        PropTypes.array,
    ),
    cellRenderers: PropTypes.arrayOf(PropTypes.func),
    className: PropTypes.string,
    columnStyling: PropTypes.arrayOf(
        PropTypes.shape({
            alignment: PropTypes.oneOf(Object.values(columnAlignments)),
            contentOverflow: PropTypes.oneOf(Object.values(overflowOptions)),
            minWidth: PropTypes.string,
            maxWidth: PropTypes.string,
            width: PropTypes.string,
        })
    ),
    data: PropTypes.array,
    "data-id": PropTypes.string,
    fullWidth: PropTypes.bool,
    headData: PropTypes.array,
    lines: PropTypes.bool,
    rowLabels: PropTypes.bool,
    width: PropTypes.oneOf(Object.values(tableWidths)),
    verticalAlignment: PropTypes.oneOf(Object.values(verticalAlignments))
};

Table.defaultProps = {
    cellRenderers: [],
    columnStyling: [],
    "data-id": "table",
    fullWidth: false,
    lines: true,
    rowLabels: false,
    verticalAlignment: "AUTO",
};

Table.columnAlignments = columnAlignments;
Table.overflowOptions = overflowOptions;
Table.tableLayouts = tableLayouts;
Table.tableWidths = tableWidths;
Table.verticalAlignments = verticalAlignments;

export default Table;
