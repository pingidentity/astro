"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var dnd = require("react-dnd");
var classnames = require("classnames");
var dragSource = dnd.DragSource;
var dropTarget = dnd.DropTarget;
var PropTypes = React.PropTypes;
var TYPE = "DragDrop";
var _= require("underscore");

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
var isInLeftHalf = function (monitor, node) {
    var boundingRect = node.getBoundingClientRect();
    var clientOffset = monitor.getClientOffset();
    var ownMiddleX = (boundingRect.right - boundingRect.left) / 2;

    return (clientOffset.x - boundingRect.left) <= ownMiddleX;
};

function handleDragEvent (callback, props, monitor, component) {
    var itemBeingDragged = monitor.getItem();
    var locationType = props.type === "column" ? isInLeftHalf : isInTopHalf;
    var offset = locationType(monitor, ReactDOM.findDOMNode(component)) ? 0 : 1;
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
 * @callback DragDrop~onDrag
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDrop~onDrop
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDrop~onCancel
 */

/**
 * @class DragDrop
 *
 * @desc A component to hide the workings of react-dnd.  Can be dragged on dropped onto any other component
 * of type DragDrop
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
 * @param {DragDrop~onDrag} onDrag
 *          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onDrop} onDrop
 *          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 * @param {string} [type]
 *          String to specify whether the component is a row or a column. Default "row".
 * @param {string} [tagName]
 *          The DOM node to wrap the draggable component. Default "div"
 * @param {object} [style]
 *          Inline style object for child
 * @example
 *
 *  <Draggable id={index} index={index} onDrag={this._onDrag} onDrop={this._onDrop}
 *              onCancel={this._onCancel} disabled={item === 2}>
 *      <div className={this._getDragClass(item, index)}>Row {item} {item === 2 && "can't drag me"}</div>
 *  </Draggable>
 *
 */
var DragDrop = React.createClass({
    propTypes: {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,

        id: PropTypes.any.isRequired,
        index: PropTypes.number.isRequired,
        onDrag: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,

        type: PropTypes.string,
        tagName: PropTypes.string,
        style: PropTypes.object,

        disabled: PropTypes.bool,
        removeDraggableAttribute: PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            tagName: "div"
        };
    },

    render: function () {
        var connectDragSource = this.props.connectDragSource;
        var connectDropTarget = this.props.connectDropTarget;

        var opacity = this.props.isDragging ? 0.2 : 1;

        var rowProps = {
            className: classnames("drag-drop-item", this.props.className),
            "data-id": "drag-drop-item",
            style: _.clone(_.extend(this.props.style, { opacity: opacity }))
        };

        var row = (
        React.createElement(this.props.tagName, rowProps, this.props.children));
        //IE must have a drop target even if dragging is disabled.  Enabling after the first render has no effect.
        return this.props.removeDraggableAttribute ? connectDropTarget(row) : connectDragSource(connectDropTarget(row));
    }
});

DragDrop = dropTarget(TYPE, dropSpec, dropCollect)(
    dragSource(TYPE, dragSpec, dragCollect)(DragDrop)
);

//expose these functions for unit tests
DragDrop.dropSpec = dropSpec;
DragDrop.dragSpec = dragSpec;
DragDrop.isInTopHalf = isInTopHalf;
DragDrop.isInLeftHalf = isInLeftHalf;

module.exports = DragDrop;
