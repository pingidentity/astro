var React = require("react"),
    DragDropTable = require("./../../../components/tables/DragDropTable"),
    mockData = require("./mockData.json"),
    _ = require("underscore");

/**
* @name DragDropTableDemo
* @memberof DragDropTable
* @desc A demo for DragDropTable
*/
class DragDropTableDemo extends React.Component {
    constructor(props) {
        super(props);
        //slice of 20 for infinite scroll
        var dataSlice = (mockData.data).slice(0, this.ENTRIES_PER_BATCH);

        this.state = {
            loading: false,
            headings: mockData.cols,
            rows: mockData.data,
            order: null,
            sort: {},
            dropTarget: -1,
            beingDragged: -1,
            hasNext: true,
            batches: [{ id: 0, data: dataSlice }]
        };
    }

    SIMULATED_DELAY_MS = 2000;
    ENTRIES_PER_BATCH = 20;

    componentWillMount() {
        var order = Array.apply(this, { length: this.state.headings.length }).map(Number.call, Number);
        this.setState({ order: order });
    }

    _onCancel = () => {
        this.setState({ dropTarget: -1, beingDragged: -1 });
    };

    _onDrag = (targetId, beingDraggedId) => {
        if (this.state.dropTarget !== targetId) {
            this.setState({ dropTarget: targetId, beingDragged: beingDraggedId });
        }
    };

    _onDrop = (targetId, beingDraggedId) => {
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
    };

    _sort = (index) => {
        var ascending = this.state.sort && this.state.sort.column === index ? !this.state.sort.ascending : true;

        var nextRows = _.sortBy(this.state.rows, function (a) {
            return (a[index].toLowerCase());
        });
        if (ascending !== true) {
            nextRows.reverse();
        }
        var sort = {
            column: index,
            ascending: ascending
        };

        this.setState({ rows: nextRows, sort: sort });
    };

    _getHeadContentType = (sortFunction) => {
        var HeaderCell = function (props) {
            var linkClass = (this.state.sort.column === props.index)
                ? (this.state.sort.ascending ? "ascending" : "descending")
                : null;

            var _handleOnClick = function (event) {
                sortFunction(props.index, event);
            };

            return (
                <a onClick={_handleOnClick} className={linkClass}>
                    {props.data}
                </a>
            );
        }.bind(this);
        return (<HeaderCell />);
    };

    //infinite scroll callbacks
    _onNext = () => {
        var numBatches = this.state.batches.length;
        var newBatchStart = numBatches * this.ENTRIES_PER_BATCH;
        var newBatchEnd = newBatchStart + this.ENTRIES_PER_BATCH;
        var newBatchData = mockData.data.slice(newBatchStart, newBatchEnd);
        var newBatch = { id: numBatches, data: newBatchData };

        var newBatches = _.clone(this.state.batches);
        newBatches.push(newBatch);
        var hasNext = newBatchEnd <= mockData.data.length;
        //set timeout mocks api loading time. Don't use in prod.
        setTimeout(function () {
            this.setState({ batches: newBatches, hasNext: hasNext });
        }.bind(this), this.SIMULATED_DELAY_MS);
    };

    _sortBatches = (index) => {
        var ascending = this.state.sort && this.state.sort.column === index ? !this.state.sort.ascending : true;
        var nextBatchData = _.sortBy(
            _.flatten(
                this.state.batches.map(
                    function (batch) {
                        return batch.data;
                    }),
                true),
            function (a) {
                return (a[index].toLowerCase());
            });

        if (ascending !== true) {
            nextBatchData.reverse();
        }


        var newBatches = _.range(this.state.batches.length).map(function (batchNumber) {
            var start = batchNumber * this.ENTRIES_PER_BATCH;
            var end = start + this.ENTRIES_PER_BATCH;
            var slice = nextBatchData.slice(start, end);
            return ({ id: batchNumber, data: slice });
        }.bind(this));

        var sort = {
            column: index,
            ascending: ascending
        };

        this.setState({ batches: newBatches, sort: sort });

    };

    render() {
        const infiniteScrollProps = {
            onLoadPrev: _.noop,
            onLoadNext: this._onNext,
            hasNext: this.state.hasNext,
            batches: this.state.batches
        };

        // Individual columns can have hard-coded widths by passing in an object
        // with a content and width property instead of a string for that array member.
        const [first, ...headings] = this.state.headings;
        const withWidth = [
            {
                content: first,
                width: 250
            },
            ...headings
        ];
        return (
            <div data-id="dragDropRowDemo" id="dragDemoParent">

                <div className="instructions">Basic Drag and drop table with fixed head</div>

                <DragDropTable
                    headData={withWidth}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType(this._sort)}
                    bodyData={this.state.rows}
                    beingDragged={this.state.beingDragged}
                    dropTarget={this.state.dropTarget}
                    onDrag={this._onDrag}
                    onDrop={this._onDrop}
                    onCancel={this._onCancel}
                    fixedHead={true}
                />

                <br />
                <div className="instructions">Drag and drop table with infinite scroll</div>
                <DragDropTable
                    headData={this.state.headings}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType(this._sortBatches)}
                    beingDragged={this.state.beingDragged}
                    dropTarget={this.state.dropTarget}
                    onDrag={this._onDrag}
                    onDrop={this._onDrop}
                    onCancel={this._onCancel}
                    fixedHead={true}
                    infiniteScroll={infiniteScrollProps}
                />
            </div>
        );
    }
}

module.exports = DragDropTableDemo;
