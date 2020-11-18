var React = require("react"),
    ReportTable = require("./../../../components/tables/ReportTable"),
    mockData = require("./mockData.json"),
    _ = require("underscore");

import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import Button from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import Text from "ui-library/lib/components/general/Text";

/**
* @name ReportTableDemo
* @memberof ReportTable
* @desc A demo for ReportTable
*/
class ReportTableDemo extends React.Component {
    constructor(props) {
        super(props);
        //slice of 20 for infinite scroll
        var dataSlice = (mockData.data).slice(0, this.ENTRIES_PER_BATCH);

        var order = Array.apply(this, { length: mockData.cols.length }).map(Number.call, Number);

        this.state = {
            loading: false,
            headings: mockData.cols,
            rows: mockData.data,
            order: order,
            sort: {},
            hasNext: true,
            batches: [{ id: 0, data: dataSlice }]
        };
    }

    SIMULATED_DELAY_MS = 2000;
    ENTRIES_PER_BATCH = 20;


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
                width: 100
            },
            ...headings
        ];
        return (
            <div>

                <div className="instructions">Basic table with fixed head</div>

                <ReportTable
                    headData={withWidth}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType(this._sort)}
                    bodyData={
                        this.state.rows.map(row => row.map((item, index) => {
                            if (index === 0) {
                                return                 <HelpHint
                                data-id="helphint-button"
                                hintText="Help hint text">
                                <Text overflow="ellipsis">{item}</Text>
                            </HelpHint>
                            }
                            return item;
                        }))
                    }
                    fixedHead={true}
                />

                <br />
                <div className="instructions">Table with infinite scroll</div>
                <ReportTable
                    headData={this.state.headings}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType(this._sortBatches)}
                    fixedHead={true}
                    infiniteScroll={infiniteScrollProps}
                />
            </div>
        );
    }
}

module.exports = ReportTableDemo;
