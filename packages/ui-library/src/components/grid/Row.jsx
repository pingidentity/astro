"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    ButtonCell = require("./cells/ButtonCell");

/**
 * @callback Grid#Row~onRowExpanded
 *
 * @param {number} rowIndex
 *     Current expanded row index
 **/

/**
 * @typedef Grid#Row~RowData
 * @desc Data to be displayed to a row which is in key-value format with key being the column name and value being
 *     value for that column. Value itself can be another object in the format {value: "value"}
 *
 * @example
 *     {
 *         "column1": "value1",
 *         "column2": "value2",
 *         "column3": {value: "value3"}
 *     }
 */

/**
 * @private
 * @class Grid#Row
 * @desc Row displays an object as a row
 *
 * @param {string} data-id
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {Grid#Row~RowData} [rowObject]
 *     Data to be displayed to a row.
 * @param {number} [rowIndex]
 *     Row index
 * @param {Grid#Column[]} [columns]
 *     Visible columns to determine which cells will be displayed (column paging feature)
 * @param {boolean} [rowExpandable=false]
 *     Determine if this row has expandable column
 * @param {Grid#Row~onRowExpanded} [onRowExpanded]
 *     Callback to be triggered when a row is expanded
 **/

class Row extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        rowObject: PropTypes.object,
        rowIndex: PropTypes.number,
        columns: PropTypes.array,
        rowExpandable: PropTypes.bool,
        onRowExpanded: PropTypes.func
    };

    static defaultProps = {
        "data-id": "row",
        rowExpandable: false,
    };

    /*
     * Prepares content for a cell. Content can be a text, a component or a html element.
     * Any React component that needs to be rendered within a cell needs to have the callback onGridCellAction.
     */
    _getCellContent = (cellContent, column, rowObject) => {
        var cell = column.props.children;

        if (React.isValidElement(cell)) {
            var _onGridCellAction = cell.props.onGridCellAction || cell.props.onCallBack;
            if (_onGridCellAction) {
                _onGridCellAction = _onGridCellAction.bind(null, rowObject);
                var updatedCellProps = {
                    onGridCellAction: _onGridCellAction,
                    value: cellContent
                };
                cellContent = React.cloneElement(cell, updatedCellProps);
            }
        }

        return cellContent;
    };

    /*
     * Renders all cells for a row with given data.
     */
    _getCells = () => {
        var self = this;

        return this.props.columns.map(function (column, columnIndex) {
            var cell = (<td></td>);
            Object.keys(self.props.rowObject).forEach(function (key) {
                if (column.props.field === key) {
                    var cellContent = self.props.rowObject[key];
                    var cellStyle = "";
                    if (typeof cellContent === "object") {
                        cellStyle = cellContent.className;
                        cellContent = cellContent.value;
                    }
                    cellStyle = cellStyle + " " + column.props.align;
                    cellContent = self._getCellContent(cellContent, column, self.props.rowObject);

                    var key = self.props["data-id"] + "-cell-" + columnIndex;

                    // Renders <TH> for left header cells
                    if (column.props.isLeftHeader) {
                        cell = (
                            <th key={key} data-id={key} className={cellStyle} >
                                {cellContent}
                            </th>
                        );
                    } else { // Renders <TD> for normal cells
                        cell = (
                            <td key={key} data-id={key} className={cellStyle} >
                                {cellContent}
                            </td>
                        );
                    }
                }
            });

            return cell;
        });
    };

    _handleRowToggle = () => {
        this.props.onRowExpanded(this.props.rowIndex);
    };

    render() {
        var cssClassName = classnames({
            "inline plus": !this.props.rowObject.expanded,
            "inline minus": this.props.rowObject.expanded
        });

        var row = [];
        if (this.props.rowExpandable) {
            var key = this.props["data-id"] + "_expandableIconCell";
            row.push(
                <td onClick={this._handleRowToggle} data-id={key} key={key}>
                    <ButtonCell className={cssClassName} />
                </td>
            );
        }
        row.push(this._getCells());
        row.push(<td data-id="paginationCell" key={this.props["data-id"] + "_paginationCell"}></td>);

        return (
            <tr data-id={this.props["data-id"]} key={this.props["data-id"]}
                className={classnames({ expanded: this.props.rowObject.expanded })} >
                {row}
            </tr>
        );
    }
}

module.exports = Row;
