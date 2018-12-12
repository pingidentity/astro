/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

var React = require("react"),
    ReactDOM = require("react-dom"),
    TestUtils = require("../testutil/TestUtils"),
    _ = require("underscore");

/**
 * @module util/ReduxTest
 *
 * @desc The module contains utility functions to help with testing Redux component.
 */

/**
 * @alias module:util/ReduxTest.createTestDispatcher
 *
 * @desc When writing unit tests for a reducer, there needs to be a convenient way to induce the reducer and execute
 *    the middleware.  This function will create a mock dispatcher for the closed over state
 *
 * @param {function} reducer
 *    The reducer to bind to the dispatch.
 * @param {object} initialState
 *    The initial state wrapped in an object so we get a pointer to it.
 *
 * @returns {function}
 *    A dispatch function.
 *
 * @example:
 *      var wrapper = { state: {} };
 *      var dispatch = createTestDispatcher(reducer, wrapper);
 *
 *      dispatch(Action.someAction());
 */
exports.createTestDispatcher = function (reducer, initialState) {
    var dispatch = function (action) {
        if (typeof(action) === "function") {
            action(dispatch);
        } else {
            initialState.state = reducer(initialState.state, action);
        }
    };

    return dispatch;
};

/**
 * @class Wrapper
 *
 * @desc Since react has deprecated using set props, we need to wrap components in another component to enable
 *    sending properties to them by exposing a function.
 */
exports.Wrapper = class extends React.Component {
    sendProps = (state) => {
        this.setState(state);
    };

    render() {
        var opts = _.extend({}, this.props.opts, this.state, { ref: "target" });

        /* eslint-disable */
        return React.createElement(this.props.type, opts);
        /* eslint-enable */
    }
};

/**
 * @alias module:util/ReduxTest.unmountDetachesWindowListener
 *
 * @desc This test appears in many components so it makes sense to implement it once and reuse it.
 *
 * @param {function} getComponent
 *    A function which returns the component to test.
 * @param {string} type
 *    The Event type that we expect to attach and detach.
 *
 * @returns {boolean}
 *    The result of the test.
 */
exports.unmountDetachesWindowListener = function (getComponent, type) {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    var component = getComponent();
    var handler;

    //find the event handler
    window.addEventListener.mock.calls.some(function (args) {
        if (args[0] === type) {
            handler = args[1];
            return true;
        }
    });

    //attaches listener
    var attached = TestUtils.mockCallsContains(window.addEventListener, type);

    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

    return (attached &&
        TestUtils.mockCallsContains(window.addEventListener, type) &&
        TestUtils.findMockCall(window.addEventListener, type)[0] === type &&
        TestUtils.findMockCall(window.addEventListener, type)[1] === handler);
};
