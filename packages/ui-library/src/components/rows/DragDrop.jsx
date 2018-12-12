"use strict";

import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import classnames from "classnames";
import _ from "underscore";

const TYPE = "DragDrop";

const dragSpec = {
    beginDrag: function (props, monitor, component) {//eslint-disable-line
        props.onDragStart && props.onDragStart();//eslint-disable-line
        return {
            id: props.id,
            index: props.index,
            column: props.column
        };
    },

    endDrag: function (props, monitor, component) {//eslint-disable-line
        props.onDragEnd && props.onDragEnd();//eslint-disable-line
        // pass the value that indicates if item was dropped outside of container
        if (props.id === monitor.getItem().id && props.onCancel) {
            props.onCancel(monitor.didDrop());
        }
    },

    canDrag: function (props) {
        return !props.disabled;
    },
};

const dragCollect = function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

const isInTopHalf = function (monitor, node, dragToEdge) {
    const boundingRect = node.getBoundingClientRect();
    const {
        y = 0
    } = monitor.getClientOffset() || {};
    const ownMiddleY = (boundingRect.bottom - boundingRect.top) / 2;

    return (y - boundingRect.top) <= (ownMiddleY * (dragToEdge ? 2 : 1));
};
const isInLeftHalf = function (monitor, node, dragToEdge) {
    const boundingRect = node.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();
    const ownMiddleX = (boundingRect.right - boundingRect.left) / 2;

    return (clientOffset.x - boundingRect.left) <= (ownMiddleX * (dragToEdge ? 2 : 1));
};


function handleDragEvent (callback, props, monitor, component) {
    const renderedNode = ReactDOM.findDOMNode(component);
    const itemBeingDragged = monitor.getItem();
    const locationType = props.type === "column" ? isInLeftHalf : isInTopHalf;
    const offset = locationType(monitor, renderedNode, props.dragToEdge) ? 0 : 1;
    if (props[callback]) {
        props[callback](props.index + offset, itemBeingDragged.index, props.column, itemBeingDragged.column);
    }

    if (component.state && component.state.dropAfter !== offset) {
        // setting a state property on the DragDropContainer
        // provides it as a prop in the DragDrop component
        component.setState({ dropAfter: offset });
    }
}

const dropSpec = {
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

const dropCollect = function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        dropTarget: monitor.isOver(),
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
 * @param {DragDrop~onDrag} onDragStart
 *          A callback fired when dragging starts. Different from onDrag as this is tied to the dragged object itself rather than being fired when over a droppable area.
 * @param {DragDrop~onDrag} onDragEnd
 *          A callback fired when dragging starts. Different from onDrop as this is tied to the dragged object itself rather than being fired when over a droppable area.
 * @param {DragDrop~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 * @param {string} [type]
 *          String to specify whether the component is a row or a column. Default "row".
 * @param {string} [tagName]
 *          The DOM node to wrap the draggable component. Default "div"
 * @param {object} [style]
 *          Inline style object for child
 * @param {number} [dragToEdge=false]
 *          If true, the drag index will only increment when the drag location has passed the edge of the row instead
 *          of being incremented after the halfway mark which is the default behavior.
 * @example
 *
 *  <Draggable id={index} index={index} onDrag={this._onDrag} onDrop={this._onDrop}
 *              onCancel={this._onCancel} disabled={item === 2}>
 *      <div className={this._getDragClass(item, index)}>Row {item} {item === 2 && "can't drag me"}</div>
 *  </Draggable>
 *
 */
class DragDropBase extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        dropTarget: PropTypes.bool.isRequired,

        id: PropTypes.any.isRequired,
        index: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func,

        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,

        type: PropTypes.string,
        tagName: PropTypes.string,
        style: PropTypes.object,

        disabled: PropTypes.bool,
        removeDraggableAttribute: PropTypes.bool,
        dragToEdge: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        tagName: "div",
        onDragStart: _.noop,
        onDrag: _.noop,
        onCancel: _.noop,
        onDragEnd: _.noop,
        dragToEdge: false
    };

    state = {}

    render() {
        const {
            className,
            connectDragSource,
            connectDropTarget,
            dropTarget,
            isDragging
        } = this.props;

        const opacity = this.props.isDragging ? 0.2 : 1;

        const draggingClass = className ? className + "--is-dragging" : "";
        const dropTargetClass = className ? className + "--drop-target" : "";
        const dropTargetAfterClass = className ? className + "--drop-target-after" : "";

        const rowProps = {
            className: classnames("drag-drop-item", className, {
                [draggingClass]: isDragging,
                [dropTargetClass]: dropTarget && !isDragging,
                [dropTargetAfterClass]: dropTarget && !isDragging && this.props.dropAfter,
            }),
            "data-id": "drag-drop-item",
            style: {
                ...this.props.style,
                opacity
            }
        };

        const row = (React.createElement(this.props.tagName, rowProps, this.props.children));

        // IE must have a drop target even if dragging is disabled.  Enabling after the first render has no effect.
        return this.props.removeDraggableAttribute
            ? connectDropTarget(row)
            : connectDragSource(connectDropTarget(row));
    }
}

const DragDrop = DropTarget(TYPE, dropSpec, dropCollect)(
    DragSource(TYPE, dragSpec, dragCollect)(DragDropBase)
);

DragDrop.dropSpec = dropSpec;
DragDrop.dragSpec = dragSpec;
DragDrop.isInTopHalf = isInTopHalf;
DragDrop.isInLeftHalf = isInLeftHalf;

export default DragDrop;
