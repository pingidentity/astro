"use strict";

var React = require("re-react"),
    classnames = require("classnames"),
    ButtonCell = require("./cells/ButtonCell.jsx");

/**
 * @class Row
 *
 * @desc Row displays an object as a row
 *
 * @param {string} data-id - it is used for a unique data-id
 * @param {object} [rowObject] - data to be displayed to a row
 * @param {number} [rowIndex] - row index
 * @param {array} [columns] - visible columns to determine which cells will be displayed (column paging feature)
 * @param {bool} [rowExpandable] - it is to determine if this row has expandable column
 * @param {Row~onChangeCallback} [onRowExpanded] - callback to be triggered when a row is expanded
 **/
var Row = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string.isRequired,
        rowObject: React.PropTypes.object,
        rowIndex: React.PropTypes.number,
        columns: React.PropTypes.array,
        onRowExpanded: React.PropTypes.func,
        rowExpandable: React.PropTypes.bool
    },

    /*
     * Prepares content for a cell. Content can be a text, a component or a html element.
     */
    _getCellContent: function (cellContent, column, rowObject) {
        var cell = column.props.children;

        if (React.isValidElement(cell) && cell.props.onCallBack !== undefined) {
            var _onCallBack = cell.props.onCallBack.bind(null, rowObject);
            var updatedCellProps = {
                onCallBack: _onCallBack,
                value: cellContent
            };
            cellContent = React.cloneElement(cell, updatedCellProps);
        }

        return cellContent;
    },

    /*
     * Renders all cells for a row with given data.
     */
    _getCells: function () {
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
    },

    _handleRowToggle: function () {
        this.props.onRowExpanded(this.props.rowIndex);
    },

    render: function () {
        var cssClassName = classnames({
            "inline plus": !this.props.rowObject.expanded,
            "inline remove": this.props.rowObject.expanded
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
            <tr data-id={this.props["data-id"]} key={this.props["data-id"]} >
                {row}
            </tr>
        );
    }
});

module.exports = Row;