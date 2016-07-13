"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var dnd = require("react-dnd");
var dragSource = dnd.DragSource;
var dropTarget = dnd.DropTarget;
var PropTypes = React.PropTypes;
var TYPE = "DragDropRow";

var dragSpec = {
    beginDrag: function (props) {
        return {
            id: props.id,
            index: props.index,
            column: props.column
        };
    },

    endDrag: function (props, monitor, component) {//eslint-disable-line
        if (props.id === monitor.getItem().id) {
            props.onCancel();
        }
    },

    canDrag: function (props) {
        return !props.disabled;
    }
};

var dragCollect = function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

var isInTopHalf = function (monitor, node) {
    var boundingRect = node.getBoundingClientRect();
    var clientOffset = monitor.getClientOffset();
    var ownMiddleY = (boundingRect.bottom - boundingRect.top) / 2;

    return (clientOffset.y - boundingRect.top) <= ownMiddleY;
};

function handleDragEvent (callback, props, monitor, component) {
    var itemBeingDragged = monitor.getItem();
    var offset = isInTopHalf(monitor, ReactDOM.findDOMNode(component)) ? 0 : 1;

    //this is awkward but backward compatible
    props[callback](props.index + offset, itemBeingDragged.index, props.column, itemBeingDragged.column);
}

var dropSpec = {
    /*
     * @param {object} props - the properties of the target row
     * @param {object} monitor - the monitor object:
     *  - monitor.getItem() will return the row being dragged
     *  - monitor.getClientOffset() will return the mouse position.
     * @param {object} component - the target row react instance
     * @returns null - nothing
     */
    hover: handleDragEvent.bind(null, "onDrag"),
    drop: handleDragEvent.bind(null, "onDrop")
};

var dropCollect = function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

/**
 * @callback DragDropRow~onDrag
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropRow~onDrop
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropRow~onCancel
 */

/**
 * @class DragDropRow
 *
 * @desc A component to hide the workings of react-dnd.  Can be dragged on dropped onto any other component
 * of type DragDropRow
 *
 * @param {string|number} id
 *          An id for the row
 * @param {number} index
 *          The index number for the row
 * @param {bool} [disabled=false]
 *          If child content should not be draggable. False by default (draggable).
 * @param {boolean} removeDraggableAttribute
 *          Remove the draggable="true" attribute to disable dragging.  This is useful to resolve issues with IE
 *          and input fields.
 * @param {DragDropRow~onDrag} onDrag
 *          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDropRow~onDrop} onDrop
 *          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDropRow~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 *
 * @example
 *
 *  <Draggable id={index} index={index} onDrag={this._onDrag} onDrop={this._onDrop}
 *              onCancel={this._onCancel} disabled={item === 2}>
 *      <div className={this._getDragClass(item, index)}>Row {item} {item === 2 && "can't drag me"}</div>
 *  </Draggable>
 *
 */
var DragDropRow = React.createClass({
    propTypes: {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,

        id: PropTypes.any.isRequired,
        index: PropTypes.number.isRequired,
        onDrag: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,

        disabled: PropTypes.bool,
        removeDraggableAttribute: PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            disabled: false
        };
    },

    render: function () {
        var connectDragSource = this.props.connectDragSource;
        var connectDropTarget = this.props.connectDropTarget;

        var opacity = this.props.isDragging ? 0.2 : 1;

        var row = (
          <div className="drag-drop-row" style={{ opacity: opacity }}>
              {this.props.children}
          </div>);

        //IE must have a drop target even if dragging is disabled.  Enabling after the first render has no effect.
        return this.props.removeDraggableAttribute ? connectDropTarget(row) : connectDragSource(connectDropTarget(row));
    }
});

DragDropRow = dropTarget(TYPE, dropSpec, dropCollect)(
    dragSource(TYPE, dragSpec, dragCollect)(DragDropRow)
);

//expose these functions for unit tests
DragDropRow.dropSpec = dropSpec;
DragDropRow.dragSpec = dragSpec;
DragDropRow.isInTopHalf = isInTopHalf;

module.exports = DragDropRow;
