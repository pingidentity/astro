var React = require("react"),
    _ = require("underscore");

/**
 * @module util/ReduxTest
 * @desc The module contains utility functions to help with testing Redux componentn
 */

/**
 * @function createTestDispatcher
 * @desc When writing unit tests for a reducer, there needs to be a convenient way to induce the reducer and execute
 * the middleware.  This function will create a mock dispatcher for the closed over state
 * @param {function} reducer - The reducer to bind to the dispatch
 * @param {object} obj - The initial state wrapped in an object so we get a pointer to the
 * @returns {function} - Returns a dispatch function
 * @example:
 * var wrapper = { state: {} };
 * var dispatch = createTestDispatcher(reducer, wrapper);
 *
 * dispatch(Action.someAction());
 */
exports.createTestDispatcher = function (reducer, obj) {
    var dispatch = function (action) {
        if (typeof(action) === "function") {
            action(dispatch);
        } else {
            obj.state = reducer(obj.state, action);
        }
    };

    return dispatch;
};

/**
 * @class Wrapper
 * @desc Since react has deprecated using set props, we need to wrap components in another component to enable
 * sending properties to them by exposing a function.
 */
exports.Wrapper = React.createClass({
    sendProps: function (state) {
        this.setState(state);
    },

    render: function () {
        var opts = _.extend({}, this.props.opts, this.state, { ref: "target" });

        /* eslint-disable */
        return React.createElement(this.props.type, opts);
        /* eslint-enable */
    }
});
