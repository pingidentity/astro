var React = require("react"),
    InfiniteScroll = require("../../../components/list/InfiniteScroll.jsx"),
    Utils = require("../../../util/Utils");

/**
* @name InfiniteScrollDemo
* @memberof InfiniteScroll
* @desc A demo for InfiniteScroll
*/
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.batches = [];

        var bs = 20;
        /*eslint-disable */
        // ie9 doesn't support TypedArrays (Int8Array)
        // need to create a false TypedArray
        var typedArray;
        if (typeof (bs + 1) === "number") {
            typedArray = new Array(bs + 1);
            for (var i = 0; i < (bs + 1); ++i)
                typedArray[i] = 0;
        } else
            typedArray = (bs + 1).slice(0);
        typedArray.buffer = typedArray;
        typedArray.byteLength = typedArray.length;
        if (typeof (bs + 1) === "object" && (bs + 1).buffer)
            typedArray.buffer = (bs + 1).buffer;

        for (var batchI = 0; batchI < 10; batchI += 1) {
            var aTypedArray = Utils.isIE9() ? typedArray : new Int8Array(bs + 1);

            var data = Object.keys(aTypedArray).map(function (e) {
                return { num: parseInt(e) + (bs * batchI) }
            }).slice(1);

            this.batches.push({
                id: batchI,
                data: data
            });
        }

        this.state = {
            batches: this.batches.slice(4,5),
            pending: {
                next: false,
                prev: false
            }
        };
    }

    SIMULATED_DELAY_MS = 200;

    hasPrev = () => {
        return this.state.batches[0].id > 0;
    };

    hasMore = () => {
        return this.state.batches[this.state.batches.length - 1].id < 9;
    };

    _handleLoadPrev = () => {
        this.setState({ pending: { prev: true } });
        setTimeout(function () {
            this.setState({ pending: { prev: false } });
            if (this.state.batches[0].id > 0) {
                this.setState({
                    batches: [this.batches[this.state.batches[0].id - 1]].concat(this.state.batches)
                });
            }
        }.bind(this), this.SIMULATED_DELAY_MS);
    };

    _handleLoadNext = () => {
        this.setState({ pending: { next: true } });
        setTimeout(function () {
            this.setState({ pending: { next: false } });
            if (this.hasMore()) {
                this.setState({
                    batches: this.state.batches.concat(
                        this.batches[this.state.batches[this.state.batches.length - 1].id + 1])
                });
            }
        }.bind(this), this.SIMULATED_DELAY_MS);
    };

    _handleGenerateHeading = (data) => {
        var start = data.num - (data.num % 10);
        var end = start + 10;
        return data.num % 10 === 0 ? ("Heading " + start + " to " + end) : null;
    };

    render() {
        return (
            <div className="infiniteScrollDemo">
                <InfiniteScroll
                        contentType={<MyRow/>}
                        onLoadNext={this._handleLoadNext}
                        onLoadPrev={this._handleLoadPrev}
                        hasNext={this.hasMore()}
                        hasPrev={this.hasPrev()}
                        pendingNext={this.state.pending.next}
                        pendingPrev={this.state.pending.prev}
                        onGenerateHeading={this._handleGenerateHeading}
                        batches={this.state.batches}>
                    <div>Hello</div>
                </InfiniteScroll>
            </div>
        );
    }
}

class MyRow extends React.Component {
    render() {
        return <div ref="container" className="row" onClick={this.handleClick}>My row: {this.props.num}</div>;
    }
}

module.exports = Demo;
