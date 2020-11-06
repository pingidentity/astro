import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import Text, { textTypes } from "../general/Text";
import { measureWidth } from "../../util/DOMUtils";

const cellClasses = {
    "TOP": "grid__cell--top",
    "MIDDLE": "grid__cell--middle",
    "BOTTOM": "grid__cell--bottom",
    "AUTO": "",
};

/**
 * @enum {string}
 * @alias Table.columnAlignments
 */
const columnAlignments = {
    /** center */
    CENTER: "center",
    /** left */
    LEFT: "left",
    /** right */
    RIGHT: "right"
};

const overflowOptions = {
    ELLIPSIS: "ellipsis",
    WRAP: "wrap"
};

/**
 * @enum {string}
 * @alias Table.tableLayouts
 */
const tableLayouts = {
    /** auto */
    AUTO: "auto",
    /** fixed */
    FIXED: "fixed"
};

/**
 * @enum {string}
 * @alias Table.tableWidths
 */
const tableWidths = {
    /** auto */
    AUTO: "auto",
    /** full */
    FULL: "full",
    /** full-fixed */
    FULL_FIXED: "full-fixed",
};

/**
 * @enum {string}
 * @alias Table.verticalAlignments
 */
const verticalAlignments = {
    /** AUTO */
    AUTO: "AUTO",
    /** BOTTOM */
    BOTTOM: "BOTTOM",
    /** MIDDLE */
    MIDDLE: "MIDDLE",
    /** TOP */
    TOP: "TOP"
};

/**
 * @callback Table~cellRenderer
 * @param {string|number} cell
 *     Data for the cell.
 * @param {array} row
 *     All the data for the row.
 *
 *
/**
 * @class Table
 *
 * @desc A stateless component for displaying tabular data
 *
 * @param {Object[]} [bodyData]
 *      An array of arrays for the body that are ordered in the same way as the headData.
 * @param {function} [cellRenderers]
 *      An array of functions that transform the data for each column in the table.
 *      You can target a specific column like this: [null, null, function, null]
 * @param {string} [className]
 *      CSS class name for Table.
 * @param {string} [data-id]
 *      Data-id for the component.
 * @param {array} [data]
 *      An array of objects with data in key value pairs.
 * @param {array} [headData]
 *      An array of values for the table head.
 * @param {bool} [fixedHeader=false]
 *      Fixes the table header. Place table component inside scrollbox component with set height to enable fixedHeader.
 * @example
 *         <ScrollBox height={150}>
 *            <Table
 *               fixedHeader
 *               width="full-fixed"
 *               headData={scrollMockData.head}
 *               bodyData={scrollMockData.body}
 *            />
 *          </ScrollBox>
 * @param {bool} [fullWidth]
 *          Whether or not the table is full-width.
 * @param {Table.tableLayouts} [layout]
 *      Fixed or auto layout.
 * @param {Table.verticalAlignments} [verticalAlignment]
 *      Set vertical alignment for all the cells like TOP, MIDDLE, BOTTOM.
 * @param {Table.tableWidths} [width]
 *      The width of the table.
 * @param {bool} useEllipsis=true
 *      If true, cells and their headers will ellipsize if they overflow their
 *      containers. This only works when using a fixedHeader or when setting
 *      widths via the columnStyling prop.
 */

/**
 *
 * @param {Object[]} [columnStyling]
 *      Styling options for the columns in the table.
 * @param {Table.columnAlignments} [columnStyling.alignment]
 *      The horizontal alignment of the column.
 * @param {string} [columnStyling.minWidth]
 *      The minimum width of the column. Must be a string including a unit, ie 90px.
 * @param {string} [columnStyling.maxWidth]
 *      The maximum width of the column. Must be a string including a unit. Due to
 *      limitations of the HTML <table/> spec, this will not work on a full width table.
 * @param {string} [columnStyling.width]
 *      The width of the column. Must be a string with a unit.
 *
 */


const getHeadData = data => _.reduce(data, (headings, item) => _.union(headings, _.keys(item)), null);
const getBodyData = (data, headData) => _.map(data, item => _.map(headData, heading => item[heading]));

const renderColumnHeading = (
    alignment,
    widthStyles,
    useEllipsis,
    heading,
    idx,
) => {
    const content = (
        <Text
            overflow={useEllipsis ? overflowOptions.ELLIPSIS : overflowOptions.WRAP}
            type={textTypes.LABEL}
            align={alignment}
        >
            {heading}
        </Text>
    );

    return (
        <th
            className={classnames(
                `grid__column--alignment-${alignment}`
            )}
            key={heading || idx}
            style={widthStyles}
        >
            {useEllipsis ? <div
                style={widthStyles}
                title={heading}
            >{content}</div>
                : content}
        </th>
    );
};


const getColumnWidth = (idx, fixedHeader) => {
    const elem = fixedHeader.children[idx];
    return measureWidth(elem);
};

const renderColumnHeadings = (columnStyling = [], headData, fixedHeader) => _.map(headData, (heading, idx) => {
    const {
        alignment = columnAlignments.LEFT,
        contentOverflow = overflowOptions.WRAP,
        minWidth,
        maxWidth,
        width,
    } = columnStyling[idx] || {};


    const useEllipsis = contentOverflow === overflowOptions.ELLIPSIS;
    const colWidth = fixedHeader ? getColumnWidth(idx, fixedHeader) : width;

    const widthStyles = {
        ...maxWidth !== undefined ? { maxWidth } : {},
        ...minWidth !== undefined ? { minWidth } : {},
        ...colWidth !== undefined ? { width: colWidth } : {},
    };
    return renderColumnHeading(alignment, widthStyles, useEllipsis, heading, idx);

});

class TableCell extends Component {
    static propTypes = {
        alignment: PropTypes.oneOf(Object.values(columnAlignments)),
        ellipsis: PropTypes.bool,
        isLabel: PropTypes.bool,
        maxWidth: PropTypes.string,
        minWidth: PropTypes.string,
        overflow: PropTypes.oneOf(Object.values(overflowOptions)),
        width: PropTypes.string,
        verticalAlignment: PropTypes.oneOf(Object.values(verticalAlignments))
    }

    static defaultProps = {
        ellipsis: false,
        isLabel: false
    }

    cellContent = {};

    hasEllipsis = false;

    _checkForEllipsis = ({
        offsetWidth = 0,
        scrollWidth = 0,
    }) => { this.hasEllipsis = (this.hasEllipsis || offsetWidth < scrollWidth); }

    render() {
        const {
            alignment = columnAlignments.LEFT,
            children,
            contentOverflow = overflowOptions.WRAP,
            width: colWidth,
            isLabel,
            minWidth,
            maxWidth = colWidth,
            verticalAlignment
        } = this.props;

        const {
            icon,
            content = children
        } = children || {};

        const Cell = isLabel ? "th" : "td";

        this._checkForEllipsis(this.cellContent);

        const useEllipsis = contentOverflow === overflowOptions.ELLIPSIS;

        const ContentWrapper = useEllipsis && this.hasEllipsis ? HelpHint : "div";

        const cellContents = (
            <ContentWrapper
                className={classnames(
                    "grid__cell-content-wrapper",
                    {
                        "grid__cell-content-wrapper--overflow-ellipsis": useEllipsis
                    }
                )}
                ref={ref => this.cellContent = ref}
                {...(useEllipsis && this.hasEllipsis)
                    ? { containerClassName: "grid__cell-hint", hintText: content }
                    : {}
                }
            >
                {[
                    ...icon !== undefined
                        ? [
                            <div className="grid__cell-icon" key="icon">
                                {icon}
                            </div>
                        ]
                        : [],
                    icon && content ? <div
                        className="grid__cell-content"
                        key="content"
                    >
                        {content}
                    </div> : content,
                    ...isLabel ? [":"] : []
                ]}
            </ContentWrapper>
        );

        return (
            <Cell
                className={classnames(
                    cellClasses[verticalAlignment],
                    "grid__cell",
                    `grid__cell--alignment-${alignment}`,
                )}
                style={{
                    ...maxWidth !== undefined ? { maxWidth } : {},
                    ...minWidth !== undefined ? { minWidth } : {},
                    ...colWidth !== undefined ? { width: colWidth } : {},
                }}
            >
                {cellContents}
            </Cell>
        );
    }
}

class Table extends React.Component {
    state = {
        loaded: !this.props.fixedHeader,
    };

    shadowHeader= null;

    forceComponentUpdate = () => { this.forceUpdate(); }

    componentDidMount() {
        if (this.props.fixedHeader) {
            window.setTimeout(() => {
                this.setState({ loaded: true });
            }, 0);
            window.addEventListener("resize", this.forceComponentUpdate);
        }
    }

    componentWillUnmount() {
        if (this.props.fixedHeader) {
            window.removeEventListener("resize", this.forceComponentUpdate);
        }
    }

    render() {
        const {
            cellRenderers,
            className,
            columnStyling,
            data = [],
            "data-id": dataId,
            fixedHeader,
            fullWidth,
            layout,
            lines,
            rowLabels,
            headData = getHeadData(data),
            bodyData = getBodyData(data, headData),
            verticalAlignment,
            width
        } = this.props;

        const classes = classnames("grid", className, {
            "grid--no-lines": !lines,
            "width-full": fullWidth || width === tableWidths.FULL_FIXED,
            "grid--full-width": width === tableWidths.FULL,
            "grid--fixed": layout === tableLayouts.FIXED,

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
                        { this.state.loaded &&
                            <tr className={classnames(fixedHeader ? "tr--fixed-header" : null)}>
                                {renderColumnHeadings(columnStyling, headData, fixedHeader
                                    ? this.shadowHeader
                                    : false
                                )}
                            </tr>
                        }

                        { /* Render invisible headings to set widths of cols if fixed */ }
                        {fixedHeader && (
                            <tr
                                style={{
                                    visibility: "none",
                                }}
                                ref={ref => this.shadowHeader = ref}
                            >
                                {renderColumnHeadings(columnStyling, headData, false)}
                            </tr>
                        )}
                    </thead>
                }
                <tbody>
                    {_.map(bodyData, (item, index) => (
                        <tr key={index}>
                            {_.map(item, (entry, entryIndex) => {
                                const cellValue = cellRenderers[entryIndex]
                                    ? cellRenderers[entryIndex](entry, item)
                                    : entry;

                                return (
                                    <TableCell
                                        isLabel={rowLabels && entryIndex === 0}
                                        key={`${index}-${entryIndex}`}
                                        verticalAlignment={verticalAlignment}
                                        {...columnStyling[entryIndex] || {}}
                                    >
                                        {cellValue}
                                    </TableCell>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    bodyData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.node,
                PropTypes.shape({
                    icon: PropTypes.node,
                    content: PropTypes.node
                })
            ])
        ),
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
    fixedHeader: PropTypes.bool,
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
    fixedHeader: false,
    fullWidth: false,
    lines: true,
    rowLabels: false,
    verticalAlignment: "AUTO",
};

/**
 * @class Divider
 * @desc Vertical line
 *
 * @param {string} [data-id]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @example
 * <Divider/>
 *
 */

const Divider= ({
    ["data-id"]: dataId,
    className,
}) => (
    <div
        data-id={dataId}
        className={classnames("table-divider", className,)}
    />
);

Divider.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
};

Divider.defaultProps = {
    "data-id": "divider",
};

Table.columnAlignments = columnAlignments;
Table.overflowOptions = overflowOptions;
Table.tableLayouts = tableLayouts;
Table.tableWidths = tableWidths;
Table.verticalAlignments = verticalAlignments;
Table.Divider = Divider;

export default Table;
