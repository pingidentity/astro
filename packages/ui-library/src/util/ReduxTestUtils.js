var React = require("react"),
    ReactDOM = require("react-dom"),
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

/**
 * @function
 * @name unmountDetachesWindowListener
 * @param {function} getComponentFn - A function which returns the component to test
 * @param {string} type - The Event type that we expect to attach and detach
 * @returns {bool} The result of the test
 * @desc This test appears in many components so it makes sense to implement it once and reuse it.
 */
exports.unmountDetachesWindowListener = function (getComponentFn, type) {
    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    var component = getComponentFn();
    var handler;

    //find the event handler
    window.addEventListener.mock.calls.some(function (args) {
        if (args[0] === type) {
            handler = args[1];
            return true;
        }
    });

    //attaches listener
    var attached = window.addEventListener.mock.calls.length > 0;

    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

    return (attached &&
        window.removeEventListener.mock.calls.length > 0 &&
        window.removeEventListener.mock.calls[0][0] === type &&
        window.removeEventListener.mock.calls[0][1] === handler);
};
