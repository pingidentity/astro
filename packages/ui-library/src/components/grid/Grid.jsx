"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    Utils = require("../../util/Utils.js"),
    Row = require("./Row.jsx"),
    ColumnPagination = require("./ColumnPagination.jsx"),
    FormCheckbox = require("../forms/FormCheckbox.jsx");

/**
 * @callback Grid~onGridCellAction
 *
 * @param {Grid#Row~RowData} rowObject
 *     Data corresponding to a Grid Row.
 * @param {object} e
 *     The ReactJS synthetic event object.
 *
 **/

/**
 * @callback Grid~onRowExpanded
 *
 * @param {number} rowIndex
 *     Current expanded row index
 **/

/**
 * @callback Grid~onPaginationChanged
 *
 * @param {number} firstColumn
 *     First column index for newly selected page
 * @param {number} lastColumn
 *     Last column index for newly selected page
 * @param {number} page
 *     Newly selected page number
 **/

/**
 * @class Grid
 * @desc Grid displays an array of object as a table. It also provides expanable rows, columns paging
 *
 * @param {string} [data-id="grid-table"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
 *
 * @param {Grid#Row[]} [rows]
 *     Rows to display on the table
 * @param {boolean} [rowExpandable=false]
 *     Determine if this grid has expandable rows
 * @param {object} [expandedRowContentType]
 *     Custom markup to display on expanded row section
 * @param {Grid~onRowExpanded} [onRowExpanded]
 *     Callback to be triggered when a row is expanded
 *
 * @param {number} columnsPerPage
 *     Number of columns per page.
 * @param {number} firstColumn
 *     First pageable  column.
 * @param {number} lastColumn
 *     Last pageable column.
 *
 * @param {number} currentPage
 *     Current page.
 * @param {Grid~onPaginationChanged} [onPaginationChanged]
 *     Callback to be triggered when pagination is changed
 *
 * @example
 *
 *     <Grid rows={this.state.rows} columnsPerPage={3} onRowExpanded={this._onRowExpanded} >
 *         <Grid.Column isLeftHeader={true} fixed={true} field="rowheader" />
 *         <Grid.Column headerText="Firstname" fixed={true} field="firstname" />
 *         <Grid.Column headerText="Lastname" fixed={true} field="lastname" />
 *         <Grid.Column headerText="Email" field="email" width={ColumnSizes.XL} />
 *         <Grid.Column headerText="Gender" field="gender" width={ColumnSizes.M} />
 *         <Grid.Column headerText="Birthday" field="birthday" width={ColumnSizes.S} />
 *         <Grid.Column headerText="Birthyear" field="birthyear" width={ColumnSizes.M}  >
 *             <TextInputCell onChange={this._onBirthyearChanged} />
 *         </Grid.Column>
 *         <Grid.Column headerText={this._getCheckAll()} field="hasLaptop" >
 *             <CheckboxCell onChange={this._onHasLaptopChecked} />
 *         </Grid.Column>
 *     </Grid>
 *
 **/

class GridStateless extends React.Component {
    static displayName = "GridStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        rows: PropTypes.array,
        rowExpandable: PropTypes.bool,
        expandedRowContentType: PropTypes.object,
        onRowExpanded: PropTypes.func,
        columnsPerPage: PropTypes.number.isRequired,
        firstColumn: PropTypes.number.isRequired,
        lastColumn: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        onPaginationChanged: PropTypes.func.isRequired,
        children: PropTypes.node
    };

    static defaultProps = {
        "data-id": "grid-table",
        rowExpandable: false
    };

    /*
     * Loops the array of rows and returns an array of TR tags using Row component.
     * Also adds one more row for each Row to display expandable row
     */
    _getRows = () => {
        var rows = [];
        var visibleColumnList = this._getVisibleColumns();

        // one more column for column paging section
        var expandableRowColSpan = visibleColumnList.length + 1;

        // one more column for expandable icon
        if (this.props.rowExpandable) {
            expandableRowColSpan = expandableRowColSpan + 1;
        }

        this.props.rows.forEach(function (rowObject, index) {
            rows.push(
                <Row onRowExpanded={this.props.onRowExpanded}
                        rowIndex={index}
                        columns={visibleColumnList}
                        rowObject={rowObject}
                        data-id={"grid-row-" + index}
                        key={"row" + index}
                        rowExpandable={this.props.rowExpandable}
                />
            );

            if (this.props.rowExpandable && rowObject.expanded) {
                rows.push(
                    <tr key={"expandedRow-" + index} data-id={"expandedRow-" + index} className="expanded-content" >
                        <td colSpan={expandableRowColSpan} data-id={"expandedCell-" + index} >
                            {React.cloneElement(this.props.expandedRowContentType, rowObject)}
                        </td>
                    </tr>
                );
            }
        }.bind(this));

        return rows;
    };

    _getCellHeader = (column) => {
        var headerText = "";

        if (column.props.isLeftHeader !== true) {
            headerText = column.props.headerText;
        }

        if (column.props.hasSelectAll) {
            headerText = (
                <FormCheckbox onValueChange={column.props.onSelectAllChange}
                        checked={column.props.selectAllValue}
                        label={headerText}
                        className="stacked" />
            );
        }

        var className = column.props.width + " " + column.props.align;

        return (
            <th data-id={column.props["data-id"]} key={column.props.field} className={className} >
                {headerText}
            </th>
        );
    };

    /*
     * Gets visible columns. Ex: fixed columns, left header column and columns on current page (column paging)
     */
    _getVisibleColumns = () => {
        var firstColumn = this.props.firstColumn;
        var lastColumn = this.props.lastColumn;

        return React.Children.map(this.props.children, function (column, index) {
            if (column.type.displayName === "Column") {
                if (column.props.fixed || column.props.isLeftHeader) {
                    firstColumn = firstColumn + 1;
                    lastColumn = lastColumn + 1;
                    return column;
                } else if (firstColumn <= index && index < lastColumn) {
                    return column;
                }
                // else nothing to return. this column is invisible because it does not belong to current page.
            }
        }.bind(this));
    };

    /*
     * Gets all visible column headers
     */
    _getColumnHeaders = () => {
        var visibleColumnList = this._getVisibleColumns();
        var self = this;
        var dataColumnHeaders = visibleColumnList.map(function (column) {
            return self._getCellHeader(column);
        });

        var allColumnHeaders = [];
        if (this.props.rowExpandable) {
            allColumnHeaders.push(
                <th data-id="expandableIconColumn" key="expandableIconColumn" ></th>
            );
        }

        allColumnHeaders.push(dataColumnHeaders);

        allColumnHeaders.push(
            <th className="column-pg" data-id="paginationColumn" key="paginationColumn">
                <ColumnPagination controlled={true}
                    perPage = {this.props.columnsPerPage}
                    page = {this.props.currentPage}
                    total = {this._getPageableColumns()}
                    onChange = {this.props.onPaginationChanged}
                    data-id="pagination" />
            </th>
        );

        return allColumnHeaders;
    };

    /*
     * Calculates total columns for paging
     */
    _getPageableColumns = () => {
        var pageableColumns = 0;
        React.Children.forEach(this.props.children, function (column) {
            if (column.type.displayName === "Column" && !column.props.fixed && !column.props.isLeftHeader) {
                pageableColumns = pageableColumns + 1;
            }
        });

        return pageableColumns;
    };

    render() {
        return (
            <div data-id={this.props["data-id"]}>
                <table className={classnames("grid", this.props.className)} >
                    <thead>
                        <tr data-id="grid-row-header" >
                            {this._getColumnHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this._getRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

class GridStateful extends React.Component {
    static displayName = "GridStateful";

    static defaultProps = {
        columnsPerPage: 1
    };

    state = {
        firstColumn: 0,
        lastColumn: this.props.columnsPerPage,
        currentPage: 1
    };

    /*
     * Handles pagination changed
     */
    _handlePaginationChanged = (firstColumn, lastColumn, newPage) => {
        this.setState({
            firstColumn: firstColumn,
            lastColumn: lastColumn,
            currentPage: newPage
        });
    };

    render() {
        var props = _.defaults(
            {
                ref: "GridStateless", firstColumn: this.state.firstColumn, lastColumn: this.state.lastColumn,
                currentPage: this.state.currentPage, onPaginationChanged: this._handlePaginationChanged
            }, this.props);
        return React.createElement(GridStateless, props, this.props.children);
    }
}

class Grid extends React.Component {
    static displayName = "Grid";

    static propTypes = {
        controlled: PropTypes.bool, //TODO: remove in new version
        stateless: PropTypes.bool
    };

    static defaultProps = {
        controlled: false //TODO: change to stateless in new version
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    }

    render() {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                ? React.createElement(
                    GridStateless, _.defaults({ ref: "GridStateless" }, this.props), this.props.children)
                : React.createElement(
                    GridStateful, _.defaults({ ref: "GridStateful" }, this.props), this.props.children)
        );
    }
}

module.exports = Grid;

/**
 * @enum {string}
 * @desc Enum for the different options for Column size.
 **/
Grid.ColumnSizes = {
    /** Set type prop to {ColumnSizes.XS} for a column with XS size. */
    XS: "column-xs",
    /** Set type prop to {ColumnSizes.S} for a column with S size. */
    S: "column-sm",
    /** Set type prop to {ColumnSizes.M} for a column with M size. */
    M: "column-md",
    /** Set type prop to {ColumnSizes.L} for a column with L size. */
    L: "column-lg",
    /** Set type prop to {ColumnSizes.XL} for a column with XL size. */
    XL: "column-xl"
};

/**
 * @enum {string}
 * @desc Enum for the different options for alignments.
 **/
Grid.Alignments = {
    /** Set type prop to {Alignments.LEFT} for aligning to the left. Empty is left by default. */
    LEFT: "",
    /** Set type prop to {Alignments.LEFT} for aligning to the right. */
    RIGHT: "right",
    /** Set type prop to {Alignments.LEFT} for aligning to the center. */
    CENTER: "center"
};

Grid.Column = require("./Column.jsx");

Grid.Reducer = require("./GridReducer.js");
Grid.Actions = require("./GridActions.js");
