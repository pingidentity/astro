var React = require('react'),
    InfiniteScroll = require('../../../components/list/InfiniteScroll.jsx');

var Demo = React.createClass({
    SIMULATED_DELAY_MS: 200,

    getInitialState: function () {
        this.batches = [];

        var bs = 20;
        /*eslint-disable */
        for (var batchI = 0; batchI < 10; batchI += 1) {
            var data = Object.keys(new Int8Array(bs + 1)).map(function (e){
                return { num: parseInt(e) + (bs * batchI) }
            }).slice(1);

            this.batches.push({
                id: batchI,
                data: data});
        }
        /*eslint-enable */

        return {
            batches: this.batches.slice(4,5),
            pending: {
                next: false,
                prev: false
            }
        };
    },

    hasPrev: function () {
        return this.state.batches[0].id > 0;
    },

    hasMore: function () {
        return this.state.batches[this.state.batches.length - 1].id < 9;
    },

    loadPrev: function () {
        this.setState({ pending: { prev: true } });
        setTimeout(function () {
            this.setState({ pending: { prev: false } });
            if (this.state.batches[0].id > 0) {
                this.state.batches.unshift(this.batches[this.state.batches[0].id - 1]);
                this.forceUpdate();
            }
        }.bind(this), this.SIMULATED_DELAY_MS);
    },

    loadNext: function () {
        this.setState({ pending: { next: true } });
        setTimeout(function () {
            this.setState({ pending: { next: false } });
            if (this.hasMore()) {
                this.state.batches.push(this.batches[this.state.batches[this.state.batches.length - 1].id + 1]);
                this.forceUpdate();
            }
        }.bind(this), this.SIMULATED_DELAY_MS);
    },

    headingGenerator: function (data) {
        return data.num % 10 === 0 ? '=== Every 10 Heading ===' : null;
    },

    render: function () {
        return (
            <div style={{ height: 300 }}>
            <InfiniteScroll
                contentType={<MyRow/>}
                loadNext={this.loadNext}
                loadPrev={this.loadPrev}
                hasNext={this.hasMore()}
                hasPrev={this.hasPrev()}
                pendingNext={this.state.pending.next}
                pendingPrev={this.state.pending.prev}
                headingGenerator={this.headingGenerator}
                batches={this.state.batches}><div>Hello</div></InfiniteScroll></div>
        );
    }
});

var MyRow = React.createClass({
    render: function () {
        return <div ref="container" className="row" onClick={this.handleClick}>My row: {this.props.num}</div>;
    }
});

module.exports = Demo;
