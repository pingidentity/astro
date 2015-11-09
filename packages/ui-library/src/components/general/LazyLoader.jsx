"use strict";

var React = require("react");
/**
 * @module LazyLoader
 * @description Renders a limited amount of items initially and doubles the rendered items each time scrolling reaches
 *     the bottom.  Note: the container requires CSS rules for height and overflow.
 *
 * @param {string} className - name of css class(s) to add to the parent container
 * @param {Object} items - array of objects in the following format:
 *     [
 *         { id: "value", name: "value", group: "group name" },
 *         { id: "value", name: "value", group: "group name" },
 *         ...
 *     ]
 * @param {...number} limit - the maxium number of records to return with each fragment



 * @example
 * Example Use:
 *     { CSS }
 *     .multi-row-container {
 *         height: 256px;
 *         overflow-y: auto;
 *         ...
 *     }
 *
 *     { JS }
 *     ...
 *         render: function () {
 *             return (
 *                 <LazyLoader items={this.props.items}
 *                             limit={100}
 *                             classNames="multi-row-container" />
 *             );
 *         }
 *     ...
 */
var LazyLoader = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired,
        limit: React.PropTypes.number.isRequired,
        classNames: React.PropTypes.string
    },

    /**
     * @method LazyLoader#_onScroll
     * @private
     * @desc event handler for determining if iterations should be incremented
     * @param {object} e The event object
     * @returns {undefined}
     */
    _onScroll: function (e) {
        var el = e.currentTarget;

        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
            this.setState({ iterations: this.state.iterations + 1 });
        }
    },

    /**
     * @method LazyLoader#reset
     * @desc resets the amount of fragment iterations
     * @returns {undefined}
     */
    reset: function () {
        this.setState({ iterations: 1 });
    },

    getInitialState: function () {
        return {
            iterations: 1
        };
    },

    render: function () {
        var fragments = this.props.items.slice(0, this.props.limit * this.state.iterations);

        return (
            <div data-id="lazyLoaderContainer" onScroll={this._onScroll} className={this.props.classNames}>
                {fragments}
            </div>
        );
    }
});

module.exports = LazyLoader;
