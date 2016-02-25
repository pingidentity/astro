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
            index: props.index
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

var dropSpec = {
    /*
     * @param {object} props - the properties of the target row
     * @param {object} monitor - the monitor object:
     *  - monitor.getItem() will return the row being dragged
     *  - monitor.getClientOffset() will return the mouse position.
     * @param {object} component - the target row react instance
     * @returns null - nothing
     */
    hover: function (props, monitor, component) {
        var itemBeingDragged = monitor.getItem();

        if (itemBeingDragged.id === props.id) {
            props.onDrag(props.index, props.index);
            return;
        }

        props.onDrag(props.index + (isInTopHalf(monitor, ReactDOM.findDOMNode(component)) ? 0 : 1),
                     itemBeingDragged.index);
    },

    drop: function (props, monitor, component) {
        props.onDrop(props.index + (isInTopHalf(monitor, ReactDOM.findDOMNode(component)) ? 0 : 1),
                     monitor.getItem().index);
    }
};

var dropCollect = function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

/**
 * @class DragDropRow
 *
 * @desc A component to hide the workings of react-dnd.  Can be dragged on dropped onto any other component of type DragDropRow
 * @param {string|number} id - An id for the row
 * @param {number} index - The index number for the row
 * @param {bool} [disabled=false] - If child content should not be draggable. False by default (draggable).
 * @param {function} onDrag - A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {function} onDrop - A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {function} onCancel - A callback which is executed when the dragging is cancelled (dropped outside a droppable area or esc button pressed).
 * @example
 *  <DragDropRow onDrop={this._reorder} disabled={this.props.disabled} id="1" index={1}>
 *      <div>Row #1</div>
 *  </DragDropRow>
 *  <DragDropRow onDrop={this._reorder} id="2" index={2}>
 *      <div>Row #2</div>
 *  </DragDropRow>
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

        disabled: PropTypes.bool
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

        return connectDragSource(connectDropTarget(
            <div style={{ opacity: opacity }}>
                {this.props.children}
            </div>
        ));
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
