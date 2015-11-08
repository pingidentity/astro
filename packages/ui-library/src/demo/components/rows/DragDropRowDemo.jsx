var React = require("react/addons"),
    DragDropContext = require("react-dnd").DragDropContext,
    HTML5Backend = require("react-dnd/modules/backends/HTML5"),
    DragDropRow = require("./../../../components/rows/DragDropRow.jsx"),
    _ = require("underscore");

var DragDropRowDemo = React.createClass({

    getInitialState: function () {
        return {
            loading: false,
            rows: [1, 2, 3, 4],
            dropTarget: -1
        };
    },

    _onCancel: function () {
        this.setState({ dropTarget: -1 });
    },

    _onDrag: function (targetId, beingDraggedId) {
        this.setState({ dropTarget: targetId === beingDraggedId ? -1 : targetId });
    },

    _onDrop: function (targetId, beingDraggedId) {
        if (targetId === beingDraggedId) {
            return;
        }

        var nextState = _.clone(this.state.rows);
        var insertAt = targetId < beingDraggedId ? targetId : targetId - 1;
        var beingDraggedObj = this.state.rows[beingDraggedId];
        nextState.splice(beingDraggedId, 1);

        if (targetId === this.state.rows.length) {
            nextState.push(beingDraggedObj);
        } else {
            nextState.splice(insertAt, 0, beingDraggedObj);
        }

        this.setState({ rows: nextState, dropTarget: -1 });
    },

    _getDragClass: function (item, index) {
        var dragBottom = this.state.rows.length - 1 === index &&
            this.state.dropTarget === this.state.rows.length;
        return "row" + (this.state.dropTarget === index ? " dragTop" : "") + (dragBottom ? " dragBottom" : "");
    },

    render: function () {
        return (
            <div className="dragDropRowDemo">
                <div className="instructions">Draw and drop rows into to re-order them</div>
                {
                    this.state.rows.map(function (item, index) {
                        return (
                            <DragDropRow
                                    id={index}
                                    index={index}
                                    onDrag={this._onDrag}
                                    onDrop={this._onDrop}
                                    onCancel={this._onCancel}>
                                <div className={this._getDragClass(item, index)}>Row {item}</div>
                            </DragDropRow>
                        );
                    }.bind(this))
                }
            </div>
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(DragDropRowDemo);
