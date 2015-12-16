var React = require("react/addons"),
    Spinner = require("../general/Spinner.jsx"),
    _ = require("underscore");

/** @class InfiniteScroll#Batch
 * @module InfiniteScroll
 * @private */
var Batch = React.createClass({
    displayName: "Batch",

    componentWillUpdate: function () {
        var container = React.findDOMNode(this.refs.container);
        if (container) {
            this.containerHeight = React.findDOMNode(this.refs.container).scrollHeight;
        }
    },

    render: function () {
        var visible = this.props.isVisible !== false;
        var style = {};
        var rows = null;
        var heading = this.props.prev && this.props.headingGenerator
            ? this.props.headingGenerator(_.last(this.props.prev)) : null;

        if (!visible) {
            style.height = this.containerHeight;
        } else {
            rows = [];

            for (var i = 0; i < this.props.data.length; i += 1) {
                var nextHeading = this.props.headingGenerator
                    ? this.props.headingGenerator(this.props.data[i], heading) : null;

                if (nextHeading !== null) {
                    rows.push(
                        <div key={i}>
                            <div className="item-head">{nextHeading}</div>
                            {React.addons.cloneWithProps(this.props.contentType, _.defaults(this.props.data[i]))}
                        </div>
                    );
                    heading = nextHeading;
                } else {
                    rows.push(React.addons.cloneWithProps(this.props.contentType,
                        _.defaults({ key: i }, this.props.data[i])));
                }
            }
        }

        return <div ref="container" className="batch" style={style}>{rows}</div>;
    }
});

/**
 * @module InfiniteScroll
 * @desc An scrolling component which pages content in and out of the dom as their visibility changes.    Content is passed as an
 * array of batches which is a simple js object with an id and an array of rows.
 *
 * @param {function} loadNext - callback which will fetch the next batch of data, executed when the user scrolls to the bottom of the container
 * @param {function} loadPrev - callback which will fetch the prev batch of data, executed when the user scrolls to the top of the container
 * @param {bool} hasNext - has more batches after the last batch loaded
 * @param {bool} hasPrev - has more batches preceding the first batch loaded
 * @param {object[]} batches - An array of objects in the form &#123;id: _id, data: [_data_]&#125;
 * @param {Component} contentType - A react component representing the row type
 * @param {bool} [attachToWindow] - When set, the component will attach to the window instead of creating a scrolling container
 * @param {object} [initialItem] - An object describing the batchIdex and itemIndex of the first row to display
 * @param {function} [onScroll] - A callback which will get the batch id and the scroll offset of the infinite scroller
 * @param {function} [headingGenerator] - A heading generator function.  Will be passed the data item for
 * the current row and the result from the last call to the generator.  If the result is anything but null, a new heading will
 * be generated the content of which will be set to the result of the call.
 * @param {number} [minHeight] - Min height for the container (when not attached to window)
 * @param {number} [height] - Required when not attached to the window
 * @example
 * var batches=[{id: 1, data: ['some', 'data', 'here']}...];
 * <InfiniteScroll loadNext={this.loadNext} hasNext={true} hasPrev={false} batches={batches} contentType={MyRow} />
 */
var InfiniteScroll = React.createClass({
    displayName: "InfiniteScroll",

    propTypes: {
        batches: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number,
                data: React.PropTypes.array
            })).isRequired,
        loadNext: React.PropTypes.func.isRequired,
        loadPrev: React.PropTypes.func.isRequired
    },

    _getBatchVisibility: function () {
        return this.props.batches.map(function (e,i) {return this._isBatchVisible(i);}.bind(this));
    },

    _rectIntersect: function (r1, r2) {
        return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
    },

    _isBatchVisible: function (batchIndex) {
        var batch = this._getBatchNode(batchIndex);

        return !batch || this._rectIntersect(batch.getBoundingClientRect(), this._getContainerBounds());
    },

    _getFirstVisibleItem: function () {
        var containerOffset = this._getContainerBounds().top;

        for (var i = 0; i < this.props.batches.length; i += 1) {
            var node = this._getBatchNode(i);
            var bounds = node.getBoundingClientRect();

            if (bounds.bottom >= containerOffset) {
                for (var j = 0; j < node.childNodes.length; j += 1) {
                    if (node.childNodes[j].getBoundingClientRect().bottom >= containerOffset) {
                        return {
                            batchId: this.props.batches[i].id,
                            itemIndex: j
                        };
                    }
                }
            }
        }
    },

    _scrollContainerBy: function (y) {
        if (this.props.attachToWindow) {
            window.scrollTo(0, window.scrollY + y);
        } else {
            React.findDOMNode(this.refs.container).scrollTop += y;
        }
    },

    _getContainerBounds: function () {
        return this.props.attachToWindow
            ? { top: 0, bottom: window.innerHeight } : React.findDOMNode(this.refs.container).getBoundingClientRect();
    },

    _didScrollToBottom: function () {
        var containerBounds = this._getContainerBounds();
        return this.props.hasNext &&
            React.findDOMNode(this.refs.spinnerNext).getBoundingClientRect().top <= containerBounds.bottom;
    },

    _didScrollToTop: function () {
        var containerBounds = this._getContainerBounds();
        return this.props.hasPrev &&
            React.findDOMNode(this.refs.spinnerPrev).getBoundingClientRect().bottom >= containerBounds.top;
    },

    _handleScroll: function () {
        //dont handle scrolls before there's any data
        if (!this.batchRange) {
            return;
        }
        if (!_.isEqual(this._getBatchVisibility(), this.visibilityArray)) {
            this.forceUpdate();
        }
        if (this._didScrollToTop()) {
            this.props.loadPrev();
        }
        if (this._didScrollToBottom()) {
            this.props.loadNext();
        }
        if (this.props.onScroll) {
            this.props.onScroll(this._getFirstVisibleItem());
        }
    },

    _getBatchNode: function (batchIndex) {
        return React.findDOMNode(this.refs["batch" + batchIndex]);
    },

    jumpToItem: function (batchIndex, itemIndex) {
        var batch = this._getBatchNode(batchIndex);

        if (batch) {
            var containerBounds = this._getContainerBounds();

            if (!this.visibilityArray[batchIndex]) {
                var batchBounds = batch.getBoundingClientRect();

                this._scrollContainerBy(batchBounds.top - containerBounds.top);
                setTimeout(this.jumpToItem.bind(this, batchIndex, itemIndex), 100);
                return;
            }

            var itemBounds = batch.childNodes[itemIndex].getBoundingClientRect();

            this._scrollContainerBy(itemBounds.top - containerBounds.top);

            //return false if we're setting an impossible scroll position
            return batch.childNodes[itemIndex].getBoundingClientRect().top >= 0;
        } else {
            return false;
        }
    },

    componentWillMount: function () {
        this.componentWillUpdate();
        this.inited = false;

        if (this.props.attachToWindow) {
            window.addEventListener("scroll", this._handleScroll);
        }
    },

    componentWillUnmount: function () {
        if (this.props.attachToWindow) {
            window.removeEventListener("scroll", this._handleScroll);
        }
    },

    componentWillUpdate: function () {
        this.visibilityArray = this._getBatchVisibility();
    },

    componentDidMount: function () {
        this.componentDidUpdate();
    },

    componentDidUpdate: function () {
        if (this.props.batches.length === 0) {
            return;
        }

        var newRange = {
            start: this.props.batches[0].id,
            end: this.props.batches[this.props.batches.length - 1].id
        };

        //after loading the first batch of data hide the prevSpinner
        if (!this.batchRange && this.props.hasPrev) {
            this.jumpToItem(0, 0);
        }

        //when a new batch is prepended, the container's scrollTop should be adjusted by the height of the new batch
        //so that the content in view doesnt change
        if (this.batchRange && newRange.start !== this.batchRange.start) {
            this._scrollContainerBy(React.findDOMNode(this.refs.batch0).clientHeight);
        }
        //after the first render with data, jump to the offset specified in the props
        if (!this.inited && this.props.batches.length > 0 && this.props.initialItem) {
            this.inited = this.jumpToItem(this.props.initialItem.batchIndex, this.props.initialItem.itemIndex);
        }

        this.batchRange = newRange;
    },

    render: function () {
        if (this.props.batches.length === 0) {
            return (<div ref="container">{this.props.children}</div>);
        }

        var props = this.props.attachToWindow ? {} : {
            style: _.defaults({
                overflow: "auto",
                height: "100%"
            }, _.pick(this.props, "minHeight", "height")),
            onScroll: this._handleScroll,
            ref: "container"
        };

        return (
            <div {...props}>
                { this.props.hasPrev ? <span ref="spinnerPrev"><Spinner show={true} /></span> : null }
                {
                    this.props.batches.map(function (b, i) {
                        return (<Batch prev={i > 0 ? this.props.batches[i - 1].data : null}
                            data={b.data}
                            ref={"batch" + i}
                            key={b.id}
                            id={b.id}
                            headingGenerator={this.props.headingGenerator}
                            contentType={this.props.contentType}
                            isVisible={this.visibilityArray[i]} />);
                    }.bind(this))
                }
                { this.props.hasNext ? <span ref="spinnerNext"><Spinner show={true} /></span> : null }
            </div>
        );
    }
});

InfiniteScroll.Batch = Batch;

module.exports = InfiniteScroll;
