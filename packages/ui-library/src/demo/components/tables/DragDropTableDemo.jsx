var React = require("react"),
    DragDropContext = require("react-dnd").DragDropContext,
    HTML5Backend = require("react-dnd-html5-backend"),
    DragDropTable = require("./../../../components/tables/DragDropTable.jsx"),
    mockData = require("./mockData.json"),
    _ = require("underscore");

/**
* @name DragDropTableDemo
* @memberof DragDropTable
* @desc A demo for DragDropTable
*/
var DragDropTableDemo = React.createClass({

    getInitialState: function () {
        return {
            loading: false,
            headings: mockData.cols,
            rows: mockData.data,
            order: null,
            sort: {},
            dropTarget: -1,
            beingDragged: -1
        };
    },

    componentWillMount: function () {
        var order = Array.apply(this, { length: this.state.headings.length }).map(Number.call, Number);
        this.setState({ order: order });
    },

    _onCancel: function () {
        this.setState({ dropTarget: -1, beingDragged: -1 });
    },

    _onDrag: function (targetId, beingDraggedId) {
        if (this.state.dropTarget !== targetId) {
            this.setState({ dropTarget: targetId, beingDragged: beingDraggedId });
        }
    },

    _onDrop: function (targetId, beingDraggedId) {
        if (targetId === beingDraggedId) {
            return;
        }
        var nextState = _.clone(this.state.order);
        var insertAt = targetId < beingDraggedId ? targetId : targetId - 1;
        var beingDraggedObj = this.state.order[beingDraggedId];
        nextState.splice(beingDraggedId, 1);
        if (targetId === this.state.headings.length) {
            nextState.push(beingDraggedObj);
        } else {
            nextState.splice(insertAt, 0, beingDraggedObj);
        }
        this.setState({ order: nextState, dropTarget: -1, beingDragged: -1 });
    },

    _sort: function (index) {
        var ascending = this.state.sort && this.state.sort.column === index ? !this.state.sort.ascending : true;

        var nextState = _.sortBy(this.state.rows, function (a) {
            return (a[index].toLowerCase());
        });
        if (ascending !== true) {
            nextState.reverse();
        }
        var sort = {
            column: index,
            ascending: ascending
        };
        this.setState({ rows: nextState, sort: sort });
    },

    _getHeadContentType: function () {
        var HeaderCell = function (props) {
            var linkClass = (this.state.sort.column === props.index)
                ? (this.state.sort.ascending ? "ascending" : "descending")
                : null;
            return (
                    <a onClick={this._sort.bind(null, props.index)} className={linkClass}>
                        {props.data}
                    </a>
                );
        }.bind(this);
        return (<HeaderCell />);
    },

    render: function () {
        return (
            <div style={{ overflow: "auto" }} data-id="dragDropRowDemo" id="dragDemoParent">
                <div className="instructions">Drag and drop rows into to re-order them</div>
                <DragDropTable
                    headData={this.state.headings}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType()}
                    bodyData={this.state.rows}
                    beingDragged={this.state.beingDragged}
                    dropTarget={this.state.dropTarget}
                    onDrag={this._onDrag}
                    onDrop={this._onDrop}
                    onCancel={this._onCancel} />
            </div>
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(DragDropTableDemo);
