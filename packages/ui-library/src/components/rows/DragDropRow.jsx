var React = require('react');
var dnd = require('react-dnd');
var dragSource = dnd.DragSource;
var dropTarget = dnd.DropTarget;
var PropTypes = React.PropTypes;
var TYPE = 'DragDropRow';

var rowSource = {
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
    }
};

var sourceCollect = function (connect, monitor) {
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

var rowTarget = {
    hover: function (props, monitor, component) {
        var targetItem = monitor.getItem();

        if (targetItem.id === props.id) {
            props.onDrag(props.index, props.index);
            return;
        }

        props.onDrag(props.index + (isInTopHalf(monitor, React.findDOMNode(component)) ? 0 : 1),
                     targetItem.index);
    },

    drop: function (props, monitor, component) {
        props.onDrop(props.index + (isInTopHalf(monitor, React.findDOMNode(component)) ? 0 : 1),
                     monitor.getItem().index);
    }
};

var targetCollect = function (connect) {
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
 * @param {function} onDrag - A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {function} onDrop - A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {function} onCancel - A callback which is executed when the dragging is cancelled (dropped outside a droppable area or esc button pressed).
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
        onCancel: PropTypes.func.isRequired
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

DragDropRow = dropTarget(TYPE, rowTarget, targetCollect)(
    dragSource(TYPE, rowSource, sourceCollect)(DragDropRow)
);

//expose these functions for unit tests
DragDropRow.target = rowTarget;
DragDropRow.source = rowSource;
DragDropRow.targetCollect = targetCollect;
DragDropRow.isInTopHalf = isInTopHalf;

module.exports = DragDropRow;
