var React = require("re-react"),
    ReactDOM = require("react-dom"),
    Spinner = require("../general/Spinner.jsx"),
    _ = require("underscore"),
    Utils = require("../../util/Utils.js");

/**
 * @callback Batch~onGenerateHeading
 *
 * @param {object} data
 *    The data item from the batch for the current row.
 * @param {string} previousHeading
 *    The previous heading text generated from the last call to the generator.
 *
 * @returns {string|null}
 *    The generated section heading text or null if no heading should be added.
 */

/**
 * @class Batch
 * @memberof InfiniteScroll
 *
 * @param {string} [data-id="batch"]
 *    To define the base "data-id" value for the top-level HTML container.
 *
 * @param {Batch~onGenerateHeading} [onGenerateHeading]
 *    A heading generator function. If the result is anything but null, a new heading will be generated
 *    the content of which will be set to the result of the call.
 *
 * @private
 * @ignore
 */
var Batch = React.createClass({
    displayName: "Batch",

    propTypes: {
        "data-id": React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "batch",
            onGenerateHeading: _.noop
        };
    },

    componentWillUpdate: function () {
        var container = ReactDOM.findDOMNode(this.refs.container);
        if (container) {
            this.containerHeight = ReactDOM.findDOMNode(this.refs.container).scrollHeight;
            this.containerWidth = ReactDOM.findDOMNode(this.refs.container).scrollWidth;
        }
    },

    render: function () {
        var visible = this.props.isVisible !== false;
        var style = {};
        var rows = null;
        var heading = this.props.prev && this.props.onGenerateHeading(_.last(this.props.prev));

        if (!visible) {
            style.height = this.containerHeight;
            style.width = this.containerWidth;
        } else {
            rows = [];

            for (var i = 0; i < this.props.data.length; i += 1) {
                var nextHeading = this.props.onGenerateHeading(this.props.data[i], heading);

                if (nextHeading !== null) {
                    rows.push(
                        <div key={i}>
                            <div className="item-head">{nextHeading}</div>
                            {
                                React.cloneElement(this.props.contentType, this.props.data[i])
                            }
                        </div>
                    );
                    heading = nextHeading;
                } else {
                    rows.push(React.cloneElement(
                        this.props.contentType,
                        _.defaults(
                            { key: i },
                            this.props.data[i])
                    ));
                }
            }
        }

        return <div data-id={this.props["data-id"]} ref="container" className="batch" style={style}>{rows}</div>;
    }
});

/**
* @typedef InfiniteScroll~BatchItem
* @desc A single batch item (e.g. &#123;id: _id, data: [_data_]&#125).
*
* @property {number} id
*    The item's identifier.
* @property {array<*>} data
*    The data for the batch item.
*/

/**
* @typedef InfiniteScroll~VisibleItem
* @desc The batch id and scroll offset of the top visible item.
*
* @property {number} batchId
*    The batch id of the top visible item.
* @property {number} itemIndex
*    The array index of the item within the batch of the top visible item.
*/

/**
* @typedef InfiniteScroll~initialItem
* @desc The batch index and item index of the initial item to display.
*
* @property {number} batchIndex
*    The array index of the batch in which the initial item is found within batches.
* @property {number} itemIndex
*    The array index of the item in the batch at batchIndex.
*/

/**
 * @callback InfiniteScroll~onScroll
 *
 * @param {InfiniteScroll~VisibleItem} visibleItem
 *    The new top visible item.
 */

 /**
 * @callback InfiniteScroll~onLoadPrev
 */

 /**
 * @callback InfiniteScroll~onLoadNext
 */

/**
 * @callback InfiniteScroll~onGenerateHeading
 *
 * @param {array<*>} data
 *    The array of data from the batch for the current row.
 * @param {string} previousHeading
 *    The previous heading text generated from the last call to the generator.
 *
 * @returns {string|null}
 *    The generated section heading text or null if no heading should be added.
 */

/**
 * @class InfiniteScroll
 * @desc An scrolling component which pages content in and out of the dom as their visibility changes.
 *    Content is passed as an array of batches which is a simple js object with an id and an array of rows.
 *
 * @param {string} [data-id="infinite-scroll"]
 *    To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 *
 * @param {array<InfiniteScroll~BatchItem>} batches
 *    An array of InfiniteScroll~BatchItem objects.
 * @param {InfiniteScroll~initialItem} [initialItem]
 *    An object describing the batch index and item index of the first row to display.
 * @param {InfiniteScroll~onScroll} [onScroll]
 *    Callback to be triggered when the component is scrolled.
 *
 * @param {boolean} [hasPrev=false]
 *    Whether or not ther are more batches preceeding the first batch loaded.
 * @param {InfiniteScroll~onLoadPrev} [onLoadPrev]
 *    Callback to be triggered when the previous batch of data is fetched.
 *    Executed when the user scrolls to the top of the container.
 * @param {InfiniteScroll~onLoadPrev} [loadPrev]
 *    DEPRECATED. Use "onLoadPrev" instead.
 *
 * @param {boolean} [hasNext=false]
 *    Whether or not there are more batches following the last batch loaded.
 * @param {InfiniteScroll~onLoadNext} [onLoadNext]
 *    Callback to be triggered when the next batch of data is fetched.
 *    Executed when the user scrolls to the bottom of the container.
 * @param {InfiniteScroll~onLoadNext} [loadNext]
 *    DEPRECATED. Use "onLoadNext" instead.
 *
 * @param {Component} contentType
 *    A ReactJS component representing the row type.
 *
 * @param {InfiniteScroll~onGenerateHeading} [onGenerateHeading]
 *    A heading generator function. If the result is anything but null, a new heading will be generated
 *    the content of which will be set to the result of the call.
 * @param {InfiniteScroll~onGenerateHeading} [headingGenerator]
 *    DEPRECATED. Use "onGenerateHeading" instead.
 *
 * @param {number} [height]
 *    The height of the container. Required when not attached to the window.
 * @param {number} [minHeight]
 *    Minimum height for the container (when not attached to window).
 * @param {bool} [attachToWindow=false]
 *    If true, the component will attach to the window instead of creating a scrolling container.
 *
 * @example
 *   var batches=[{id: 1, data: ['some', 'data', 'here']}...];
 *   <InfiniteScroll onLoadNext={this.loadNext} hasNext={true} hasPrev={false} batches={batches} contentType={MyRow} />
 */
var InfiniteScroll = React.createClass({
    displayName: "InfiniteScroll",

    propTypes: {
        "data-id": React.PropTypes.string,
        batches: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number,
                data: React.PropTypes.array
            })).isRequired.affectsRendering,
        initalItem: React.PropTypes.object.affectsRendering,
        onScroll: React.PropTypes.func,
        hasPrev: React.PropTypes.bool.affectsRendering,
        onLoadPrev: React.PropTypes.func, //TODO: set as required when v1 removed
        loadPrev: React.PropTypes.func, //TODO: remove when v1 no longer supported
        hasNext: React.PropTypes.bool.affectsRendering,
        onLoadNext: React.PropTypes.func, //TODO: set as required when v1 removed
        loadNext: React.PropTypes.func, //TODO: remove when v1 no longer supported
        contentType: React.PropTypes.object.affectsRendering,
        onGenerateHeading: React.PropTypes.func,
        headingGenerator: React.PropTypes.func, //TODO: remove when v1 no longer supported
        height: React.PropTypes.number.affectsRendering,
        minHeight: React.PropTypes.number.affectsRendering,
        attachToWindow: React.PropTypes.bool.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "infinite-scroll",
            hasPrev: false,
            hasNext: false,
            attachToWindow: false
        };
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
            ReactDOM.findDOMNode(this.refs.container).scrollTop += y;
        }
    },

    _getContainerBounds: function () {
        return this.props.attachToWindow
            ? { top: 0, bottom: window.innerHeight }
            : ReactDOM.findDOMNode(this.refs.container).getBoundingClientRect();
    },

    _didScrollToBottom: function () {
        var containerBounds = this._getContainerBounds();
        return this.props.hasNext &&
            ReactDOM.findDOMNode(this.refs.spinnerNext).getBoundingClientRect().top <= containerBounds.bottom;
    },

    _didScrollToTop: function () {
        var containerBounds = this._getContainerBounds();
        return this.props.hasPrev &&
            ReactDOM.findDOMNode(this.refs.spinnerPrev).getBoundingClientRect().bottom >= containerBounds.top;
    },

    _handleScroll: function (e) {
        //dont handle scrolls before there's any data
        if (!this.batchRange) {
            return;
        }
        if (!_.isEqual(this._getBatchVisibility(), this.visibilityArray)) {
            this.forceUpdate();
        }
        if (this._didScrollToTop()) {
            //TODO: remove loadPrev logic when v1 removed.
            //Also, if check can be removed as onLoadPrev should be made required then as well
            var onLoadPrev = this.props.onLoadPrev || this.props.loadPrev;

            if (onLoadPrev) {
                onLoadPrev();
            }
        }
        if (this._didScrollToBottom()) {
            //TODO: remove loadNext logic when v1 removed.
            //Also, if check can be removed as onLoadNext should be made required then as well
            var onLoadNext = this.props.onLoadNext || this.props.loadNext;

            if (onLoadNext) {
                onLoadNext();
            }
        }
        if (this.props.onScroll) {
            this.props.onScroll(this._getFirstVisibleItem(), e);
        }
    },

    _getBatchNode: function (batchIndex) {
        return ReactDOM.findDOMNode(this.refs["batch" + batchIndex]);
    },

    /** @method InfiniteScroll#jumpToItem
     * @desc scroll the infinite scroll to the give item
     * @param {number} batchIndex - The batch index
     * @param {number} itemIndex - The item index within the batch
     * @param {bool} [scrollIfOutOfView=false] - Normally the infinite scroll will scroll so the specified item is the first
     *   visible item.  If this param is set to true, it will only scroll if the item is out of view
     * @returns {bool} - true if jumping to the item was successful, false otherwise
     */
    jumpToItem: function (batchIndex, itemIndex, scrollIfOutOfView) {
        var batch = this._getBatchNode(batchIndex);

        if (batch && batch.childNodes.length > itemIndex) {
            var containerBounds = this._getContainerBounds();

            if (!this.visibilityArray[batchIndex]) {
                var batchBounds = batch.getBoundingClientRect();

                this._scrollContainerBy(batchBounds.top - containerBounds.top);
                setTimeout(this.jumpToItem.bind(this, batchIndex, itemIndex), 100);
                return;
            }

            var itemBounds = batch.childNodes[itemIndex].getBoundingClientRect();

            if (!scrollIfOutOfView ||
                itemBounds.bottom > containerBounds.bottom || itemBounds.top < containerBounds.top)
            {
                this._scrollContainerBy(itemBounds.top - containerBounds.top);
            }

            //get the updated client rect
            itemBounds = batch.childNodes[itemIndex].getBoundingClientRect();
            return itemBounds.bottom <= containerBounds.bottom && itemBounds.top >= containerBounds.top;
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

        //TODO: remove these when v1 no longer supported:
        if (!Utils.isProduction()) {
            if (this.props.loadPrev) {
                console.warn(Utils.deprecateMessage("loadPrev", "onLoadPrev"));
            }
            if (this.props.loadNext) {
                console.warn(Utils.deprecateMessage("loadNext", "onLoadNext"));
            }
            if (this.props.headingGenerator) {
                console.warn(Utils.deprecateMessage("headingGenerator", "onGenerateHeading"));
            }
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
            this._scrollContainerBy(ReactDOM.findDOMNode(this.refs.batch0).clientHeight);
        }
        //after the first render with data, jump to the offset specified in the props
        if (!this.inited && this.props.batches.length > 0 && this.props.initialItem) {
            var batchIndex = this.props.initialItem.batchIndex;

            if (typeof(this.props.initialItem.batchId) !== "undefined") {
                batchIndex = _.findIndex(this.props.batches, { id: this.props.initialItem.batchId });
            }
            if (batchIndex !== -1) {
                this.inited = this.jumpToItem(batchIndex, this.props.initialItem.itemIndex);
            }
        }

        this.batchRange = newRange;
    },

    render: function () {
        if (this.props.batches.length === 0) {
            return (<div ref="container">{this.props.children}</div>);
        }

        var style = null,
            onScroll = null,
            ref = null;
        if (!this.props.attachToWindow) {
            style = _.defaults({
                overflow: "auto",
                height: "100%"
            }, _.pick(this.props, "minHeight", "height"));

            onScroll = this._handleScroll;

            ref = "container";
        }

        return (
            <div data-id={this.props["data-id"]}
                    className={this.props.className}
                    style={style}
                    onScroll={onScroll}
                    ref={ref} >
                { this.props.hasPrev ? <span ref="spinnerPrev"><Spinner show={true} /></span> : null }
                {
                    this.props.batches.map(function (b, i) {
                        return (<Batch prev={i > 0 ? this.props.batches[i - 1].data : null}
                            data={b.data}
                            ref={"batch" + i}
                            key={b.id}
                            id={b.id}
                            onGenerateHeading={this.props.onGenerateHeading || this.props.headingGenerator}
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
