var React = require("react");
var DragDrop = require("../rows/DragDrop.jsx");
var classnames = require("classnames");
var _ = require("underscore");

var Head = function (props) {
    return (
        <thead >
            <tr>
                {props.columnOrder.map(function (headIndex, index) {
                    return (
                            <DragDrop
                                    key={index}
                                    id={index}
                                    index={index}
                                    onDrag={props.onDrag}
                                    type="column"
                                    tagName="th"
                                    className={props.getDropClass(props.headData[headIndex], index) }
                                    onDrop={props.onDrop}
                                    onCancel={props.onCancel}>
                                        { (props.headContentType)
                                            ? React.cloneElement(
                                                    props.headContentType,
                                                    _.defaults(
                                                        { id: headIndex,
                                                          key: headIndex,
                                                          index: headIndex,
                                                          data: props.headData[headIndex] }
                                                    )
                                                )
                                            : props.headData[headIndex]
                                        }
                            </DragDrop>
                    );
                })}
            </tr>
        </thead>
    );
};

var Body = function (props) {
    return (<tbody>
        { props.bodyData.map(function (row, index) {
            return (
                <tr key={index}>
                    { props.columnOrder.map(function (columnIndex, dataIndex) {
                        var dragClass = props.beingDragged === dataIndex ? "dragging": null;
                        return (
                            <td
                                className={classnames(props.getDropClass(row[columnIndex], dataIndex), dragClass)}
                                key={columnIndex}>
                                {row[columnIndex]}
                            </td>
                        );
                    })}
                </tr>
            );
        }) }
    </tbody>);
};

var DragDropTable = function (props) {

    var order = props.columnOrder || Array.apply(this, { length: props.headData.length }).map(Number.call, Number);

    var getDropClass = function (item, index) {
        var dragBottom = props.headData.length - 1 === index &&
            props.dropTarget === props.headData.length;
        return "row" + (props.dropTarget === index ? " dragLeft" : "") + (dragBottom ? " dragRight" : "");
    };

    //Object.assign used below because code coverage doesn't work with spread operator {...props}
    return (
        <table className={classnames(props.className)}>
            {React.createElement(Head, Object.assign({}, props, { columnOrder: order, getDropClass: getDropClass }))}
            {React.createElement(Body, Object.assign({}, props, { columnOrder: order, getDropClass: getDropClass }))}
        </table>
    );
};

/**
 * @callback DragDropTable~onDrag
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropTable~onDrop
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropTable~onCancel
 */

/**
 * @class DragDropTable
 *
 * @desc A stateless wrapper for the DragDrop component that provides table markup based on data
 *
 * @param {DragDrop~onDrag} onDrag
 *          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onDrop} onDrop
 *          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 *
 * @param {array} headData
 *          An array of values for the table head
 * @param {array} bodyData
 *          An array of arrays for the body that are ordered in the same was as the headData
 * @param {array} [columnOrder]
 *          An array of values to represent the order of the columns
 * @param {object} [headContentType]
 *          A React object that can be used as a wrapper for the th elements. Receives id, key, index and data as props.
 * @param {string} [className]
 *          Classname for the parent table
 * @param {number} [beingDragged]
 *          Index in the headData array that corresponds with the dragging item
 * @param {number} [dropTarget]
 *          Index in the headData array that corresponds with the item drop zone
 *
 * @example
 *
 * <DragDropTable
 *      headData={this.state.headings}
 *      columnOrder={this.state.order}
 *      headContentType={this._getHeadContentType()}
 *      bodyData={this.state.rows}
 *      beingDragged={this.state.beingDragged}
 *      dropTarget={this.state.dropTarget}
 *      onDrag={this._onDrag}
 *      onDrop={this._onDrop}
 *      onCancel={this._onCancel} />
 *
 */

DragDropTable.propTypes = {
    onDrag: React.PropTypes.func.isRequired,
    onDrop: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    headData: React.PropTypes.array.isRequired,
    bodyData: React.PropTypes.array.isRequired,
    columnOrder: React.PropTypes.array,
    headContentType: React.PropTypes.object,
    className: React.PropTypes.string,
    beingDragged: React.PropTypes.number,
    dropTarget: React.PropTypes.number
};

DragDropTable.defaultProps = {
    className: "report"
};
module.exports = DragDropTable;
