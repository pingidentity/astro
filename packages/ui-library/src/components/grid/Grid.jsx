"use strict";

var React = require("re-react"),
    classnames = require("classnames"),
    Row = require("./Row.jsx"),
    ColumnPagination = require("./ColumnPagination.jsx"),
    FormCheckbox = require("../forms/FormCheckbox.jsx");

var Grid = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (this.props.controlled ? <StatelessGrid {...this.props} /> : <StatefulGrid {...this.props} />);
    }
});

module.exports = Grid;

/**
 * @callback onRowExpanded~callback
 * @param {number} rowIndex - current expanded row index
 **/

/**
 * @class Grid
 *
 * @desc Grid displays an array of object as a table. It also provides expanable rows, columns paging
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {number} [rows] - rows to display on the table
 * @param {string} [width] - css class to determine width of Grid
 * @param {bool} [rowExpandable] - it is to determine if this grid has expandable rows
 * @param {Grid~onChangeCallback} [onRowExpanded] - callback to be triggered when a row is expanded
 * @param {object} [expandedRowContentType] - custom markup to display on expanded row section
 * @param {number} columnsPerPage - number of columns per page.
 * @param {number} firstColumn - the first pageable  column.
 * @param {number} lastColumn - the last pageable column.
 * @param {number} currentPage - current page.
 * @param {Grid~onChangeCallback} [onPaginationChanged] - callback to be triggered when pagination is changed
 *
 * @example
 *
 *     <Grid rows={this.state.rows} columnsPerPage={3} onRowExpanded={this._onRowExpanded} >
 *         <Column isLeftHeader={true} fixed={true} field="rowheader" />
 *         <Column headerText="Firstname" fixed={true} field="firstname" />
 *         <Column headerText="Lastname" fixed={true} field="lastname" />
 *         <Column headerText="Email" field="email" width={ColumnSizes.XL} />
 *         <Column headerText="Gender" field="gender" width={ColumnSizes.M} />
 *         <Column headerText="Birthday" field="birthday" width={ColumnSizes.S} />
 *         <Column headerText="Birthyear" field="birthyear" width={ColumnSizes.M}  >
 *             <TextInputCell onChange={this._onBirthyearChanged} />
 *         </Column>
 *         <Column headerText={this._getCheckAll()} field="hasLaptop" >
 *             <CheckboxCell onChange={this._onHasLaptopChecked} />
 *         </Column>
 *     </Grid>
 *
 **/
var StatelessGrid = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,
        rows: React.PropTypes.array.affectsRendering,
        width: React.PropTypes.string.affectsRendering,
        rowExpandable: React.PropTypes.bool.affectsRendering,
        onRowExpanded: React.PropTypes.func,
        expandedRowContentType: React.PropTypes.object,
        columnsPerPage: React.PropTypes.number.isRequired.affectsRendering,
        firstColumn: React.PropTypes.number.isRequired.affectsRendering,
        lastColumn: React.PropTypes.number.isRequired.affectsRendering,
        currentPage: React.PropTypes.number.isRequired.affectsRendering,
        onPaginationChanged: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "grid-table",
            rowExpandable: false
        };
    },

    /*
     * Loops the array of rows and returns an array of TR tags using Row component.
     * Also adds one more row for each Row to display expandable row
     */
    _getRows: function () {
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
                    <tr key={"expandedRow-" + index} data-id={"expandedRow-" + index} >
                        <td colSpan={expandableRowColSpan} data-id={"expandedCell-" + index} >
                            {React.cloneElement(this.props.expandedRowContentType, rowObject)}
                        </td>
                    </tr>
                );
            }
        }.bind(this));

        return rows;
    },

    _getCellHeader: function (column) {
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
    },

    /*
     * Gets visible columns. Ex: fixed columns, left header column and columns on current page (column paging)
     */
    _getVisibleColumns: function () {
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
    },

    /*
     * Gets all visible column headers
     */
    _getColumnHeaders: function () {
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
    },

    /*
     * Calculates total columns for paging
     */
    _getPageableColumns: function () {
        var pageableColumns = 0;
        React.Children.forEach(this.props.children, function (column) {
            if (column.type.displayName === "Column" && !column.props.fixed && !column.props.isLeftHeader) {
                pageableColumns = pageableColumns + 1;
            }
        });

        return pageableColumns;
    },

    /*
     * Checks if Grid has Left Header
     */
    _hasLeftHeader: function () {
        var hasLeftHeader = false;
        React.Children.forEach(this.props.children, function (column) {
            if (column.type.displayName === "Column" && column.props.isLeftHeader) {
                hasLeftHeader = true;
            }
        });

        return hasLeftHeader;
    },

    render: function () {
        var className = classnames(this.props.className, {
            grid: true,
            "grid-inline": this._hasLeftHeader()
        });

        return (
            <div data-id={this.props["data-id"]}>
                <table className={className} >
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
});

var StatefulGrid = React.createClass({

    getDefaultProps: function () {
        return {
            columnsPerPage: 1
        };
    },

    getInitialState: function () {
        return {
            firstColumn: 0,
            lastColumn: this.props.columnsPerPage,
            currentPage: 1
        };
    },

    /*
     * Handles pagination changed
     */
    _onPaginationChanged: function (firstColumn, lastColumn, newPage) {
        this.setState({
            firstColumn: firstColumn,
            lastColumn: lastColumn,
            currentPage: newPage
        });
    },

    render: function () {
        return (
            <StatelessGrid {...this.props}
                firstColumn={this.state.firstColumn}
                lastColumn={this.state.lastColumn}
                currentPage={this.state.currentPage}
                onPaginationChanged={this._onPaginationChanged} />
        );
    }
});


/**
 * @enum {string}
 * @desc Enum for the different options for Column size.
 * Set type prop to {ColumnSizes.XS} for a column with XS size.
 * Set type prop to {ColumnSizes.S} for a column with S size.
 * Set type prop to {ColumnSizes.M} for a column with M size.
 * Set type prop to {ColumnSizes.L} for a column with L size.
 * Set type prop to {ColumnSizes.XL} for a column with XL size.
 **/
Grid.ColumnSizes = {
    XS: "column-xs",
    S: "column-sm",
    M: "column-md",
    L: "column-lg",
    XL: "column-xl"
};

/**
 * @enum {string}
 * @desc Enum for the different options for Column size.
 * Set type prop to {ColumnSizes.XS} for a column with XS size.
 * Set type prop to {ColumnSizes.S} for a column with S size.
 * Set type prop to {ColumnSizes.M} for a column with M size.
 * Set type prop to {ColumnSizes.L} for a column with L size.
 * Set type prop to {ColumnSizes.XL} for a column with XL size.
 **/
Grid.Alignments = {
    LEFT: "",
    RIGHT: "right",
    CENTER: "center"
};


Grid.Column = require("./Column.jsx");

Grid.Reducer = require("./GridReducer.js");
Grid.Actions = require("./GridActions.js");