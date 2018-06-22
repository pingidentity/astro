/*eslint-disable valid-jsdoc*/

"use strict";

/**
 * @module util/TestUtils
 * @desc A collection of ReactJS test utils, to complement the ones provided by the
 *     framework. This is a copy of the TestUtils in the library, just because this class
 *     is used in the tests and should work with the same version of React used in the WP
 *     and not in the library.
 */

var ReactDOM = require("react-dom");
var React = require("react");
var ReactTestUtils = require("react-dom/test-utils");
var _ = require("underscore");
var assign = require("object-assign");

var TestUtils = {

    /**
     * @alias module:util/TestUtils.scryRenderedDOMNodesWithDataId
     * @desc Return all DOM nodes children of the given tree with the specified dataId.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} dataId
     *     Value of the data-id attribute on the target elements
     * @return {object[]}
     *     DOM node objects which match the given criteria
     */
    scryRenderedDOMNodesWithDataId: function (parent, dataId) {
        // first check if the parent component is a DOM node
        if (ReactDOM.findDOMNode(parent) === null) {
            return [];
        }

        var parentNode =
            ReactTestUtils.isDOMComponent(parent) || ReactTestUtils.isCompositeComponent(parent)
                ? ReactDOM.findDOMNode(parent)
                : parent;

        var nodes;
        if (parentNode.getAttribute("data-id") === dataId) {
            nodes = [parentNode];
        }
        else {
            var selectorValue = dataId
                .replace(/\[/g, "\\[")
                .replace(/\]/g, "\\]")
                .replace(/'/g, "\\'");
            nodes = parentNode.querySelectorAll("[data-id=" + selectorValue + "]");
        }

        return nodes;
    },

    /**
     * @alias module:util/TestUtils.findRenderedDOMNodeWithDataId
     * @desc Return the single DOM node child of the given tree with the specified dataId.
     *     If no node in the tree matches the criteria, null is returned.
     *     If there are more than one node, an error is thrown.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} dataId
     *     Value of the data-id attribute on the target element
     * @return {object}
     *     DOM node object which matches the given criteria
     */
    findRenderedDOMNodeWithDataId: function (parent, dataId) {
        var nodes = this.scryRenderedDOMNodesWithDataId(parent, dataId);

        if (nodes.length > 1) {
            throw new Error("Found more than one DOM node with dataId: " +
                dataId + " in the given tree");
        }

        return nodes.length === 0 ? null : nodes[0];
    },

    /**
     * @alias module:util/TestUtils.scryRenderedDOMNodesWithTag
     * @desc Return all DOM nodes children of the given tree with the specified tag name.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} tagName
     *     Tag name on the target elements
     * @return {object[]}
     *     Array of DOM nodes object which match the given criteria
     */
    scryRenderedDOMNodesWithTag: function (parent, tagName) {
        // first check if the parent component is a DOM node
        if (ReactDOM.findDOMNode(parent) === null) {
            return [];
        }

        var parentNode =
            ReactTestUtils.isDOMComponent(parent) || ReactTestUtils.isCompositeComponent(parent)
                ? ReactDOM.findDOMNode(parent)
                : parent;

        var nodes;
        if (parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            nodes = [parentNode];
        }
        else {
            nodes = parentNode.querySelectorAll(tagName);
        }

        return nodes;
    },

    /**
     * @alias module:util/TestUtils.findRenderedDOMNodeWithTag
     * @desc Return the single DOM node child of the given tree with the specified tag name.
     *     If no node in the tree matches the criteria, null is returned.
     *     If there are more than one node, an error is thrown.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} tagName
     *     Tag name on the target element
     * @return {object}
     *     DOM node which matches the given criteria
     */
    findRenderedDOMNodeWithTag: function (parent, tagName) {
        var nodes = this.scryRenderedDOMNodesWithTag(parent, tagName);

        if (nodes.length > 1) {
            throw new Error("Found more than one DOM node with tag name: " +
                tagName + " in the given tree");
        }

        return nodes.length === 0 ? null : nodes[0];
    },

    /**
     * @alias module:util/TestUtils.scryRenderedDOMNodesWithName
     * @desc Return all DOM nodes children of the given tree with the specified name.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} name
     *     Name on the target elements
     * @return {object[]}
     *     All DOM nodes which match the given criteria
     */
    scryRenderedDOMNodesWithName: function (parent, name) {
        // first check if the parent component is a DOM node
        if (ReactDOM.findDOMNode(parent) === null) {
            return [];
        }

        var parentNode =
            ReactTestUtils.isDOMComponent(parent) || ReactTestUtils.isCompositeComponent(parent)
                ? ReactDOM.findDOMNode(parent)
                : parent;

        var nodes;
        if (parentNode.name === name) {
            nodes = [parentNode];
        }
        else {
            nodes = parentNode.querySelectorAll("[name='" + name.replace("'", "\\'") + "']");
        }

        return nodes;
    },

    /**
     * @alias module:util/TestUtils.findRenderedDOMNodeWithName
     * @desc Return the single DOM node child of the given tree with the specified name.
     *     If no node in the tree matches the criteria, null is returned.
     *     If there are more than one node, an error is thrown.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} name
     *     Name on the target element
     * @return {object}
     *     DOM node which matches the given criteria
     */
    findRenderedDOMNodeWithName: function (parent, name) {
        var nodes = this.scryRenderedDOMNodesWithName(parent, name);

        if (nodes.length > 1) {
            throw new Error("Found more than one DOM node with name: " +
                name + " in the given tree");
        }

        return nodes.length === 0 ? null : nodes[0];
    },

    /**
     * @alias module:util/TestUtils.scryRenderedDOMNodesWithClass
     * @desc Return all DOM nodes children of the given tree with the specified CSS class name.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} className
     *     CSS class name on the target elements (or a concatenation of classes, separated by space)
     * @return {object[]}
     *     All DOM nodes which match the given criteria
     */
    scryRenderedDOMNodesWithClass: function (parent, className) {
        // first check if the parent component is a DOM node
        if (ReactDOM.findDOMNode(parent) === null) {
            return [];
        }

        var parentNode = ReactTestUtils.isDOMComponent(parent) || ReactTestUtils.isCompositeComponent(parent)
            ? ReactDOM.findDOMNode(parent)
            : parent;

        var nodes;

        // first check if the root element has the provided classes;
        // if not, build a selector and look for any children

        var parentMatches = _.every(className.split(" "), function (name) {
            return (" " + parentNode.className + " ").indexOf(" " + name + " ") > -1;
        });
        if (parentMatches) {
            nodes = [parentNode];
        }
        else {
            var selector = _.reduce(className.split(" "), function (memo, name) {
                return memo + "." + name;
            }, "");
            nodes = parentNode.querySelectorAll(selector);
        }

        return nodes;
    },

    /**
     * @alias module:util/TestUtils.findRenderedDOMNodeWithClass
     * @desc Return the single DOM node child of the given tree with the specified CSS class name.
     *     If no node in the tree matches the criteria, null is returned.
     *     If there are more than one node, an error is thrown.
     *
     * @param {object} parent
     *     React component or DOM Node tree to search
     * @param {string} className
     *     CSS class name on the target element
     * @return {object}
     *     DOM node which matches the given criteria
     */
    findRenderedDOMNodeWithClass: function (parent, className) {
        var nodes = this.scryRenderedDOMNodesWithClass(parent, className);

        if (nodes.length > 1) {
            throw new Error("Found more than one DOM node with class name: " +
                className + " in the given tree");
        }

        return nodes.length === 0 ? null : nodes[0];
    },

    /**
     * @alias module:util/TestUtils.scryRenderedComponentsWithType
     * @desc Finds all instances of components with type equal to `componentType`.
     *
     * @param {object} root
     *     A composite (ie. React) component
     * @param {object} componentType
     *     The component type
     * @return {object[]}
     *     An array of all the matches.
     */
    scryRenderedComponentsWithType: function (root, componentType) {
        return ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
    },

    /**
     * @alias module:util/TestUtils.findRenderedComponentWithType
     * @desc Same as `scryRenderedComponentsWithType` but expects there to be one result and returns that one result,
     *     or throws exception if there is any other number of matches besides one.
     *
     * @param {object} root
     *     A composite (ie. React) component
     * @param {object} componentType
     *     The component type
     * @return {object}
     *     The one match.
     */
    findRenderedComponentWithType: function (root, componentType) {
        return ReactTestUtils.findRenderedComponentWithType(root, componentType);
    },

    /**
     * @alias module:util/TestUtils.captureGlobalListener
     * @desc Attaches proxy function for `window.addEvenListener` which will save reference to actual provided
     *     callback when event type match filter. Useful for testing ReactJS component global (window)
     *     callbacks behaviour.
     *
     * @param {string} eventType
     *     Event to save callback for. case insensitive.
     * @param {object} [obj=window]
     *     Optional object to capture listener from. Like `document`. If not provided - window object
     * @returns {function}
     *     Function which when executed will trigger actual provided callback to `window.addEventListener`
     *
     * @example
     *
     *     //capture registered callback from reactjs control
     *     var onKeyDown = TestUtils.captureGlobalListener("keyDown");
     *     onKeyDown({keyCode:13});  //later in test trigger global event
     *
     *     //capture registered callback from reactjs control on `document` object
     *     var onKeyDown = TestUtils.captureGlobalListener("keyDown", document);
     *     onKeyDown({keyCode:13});  //later in test trigger global event
     */
    captureGlobalListener: function (eventType, obj) {

        var captured;

        var target = obj || window;

        target.addEventListener = function (event, listener) {
            if (event.toLowerCase() === eventType.toLowerCase()) {
                captured = listener;
            }
        };

        return function () {
            return captured.apply(this, arguments);
        };
    },
    /**
     * @alias module:util/TestUtils.findMockCall
     * @desc Searches a mock function calls to see if value exists and returns the call. Written because new react-dom.development.js adds error calls to window object
     *
     * @param {function} mockFunction
     *     The mock function to search
     * @param {string} value
     *     the string to look for in the falue
     * @returns {array}
     *     returns the found call or undefined
     *
     * @example
     *
     *     //expect click handler to be execute
     *     const clickCallback = TestUtils.findMockCall(window.addEventListener, "click")[1];
     *     clickCallback(); trigger a callback
     */
    findMockCall: function (mockFunction, value) {
        return _.find(mockFunction.mock.calls, call => _.contains(call, value));
    },
     /**
      * @alias module:util/TestUtils.findMockCallIndex
      * @desc Searches a mock function calls to see if value exists and returns the index of the call. Written because new react-dom.development.js adds error calls to window object
      *
      * @param {function} mockFunction
      *     The mock function to search
      * @param {string} value
      *     the string to look for in the falue
      * @returns {number}
      *     returns index if found
      *
      * @example
      *
      *     //expect click handler to be executed
      *     const index = TestUtils.findMockCallIndex(window.addEventListener, "click")
      *
      */
    findMockCallIndex: function (mockFunction, value) {
        return _.findIndex(mockFunction.mock.calls, call => _.contains(call, value));
    },
     /**
      * @alias module:util/TestUtils.mockCallsContains
      * @desc Finds searches a mock function calls to see if value exists. Written because new react-dom.development.js adds error calls to window object
      *
      * @param {function} mockFunction
      *     The mock function to search
      * @param {string} value
      *     the string to look for in the falue
      * @returns {boolean}
      *     returns true if found and false if not
      *
      * @example
      *
      *     //expect click handler to be executed
      *     expect(TestUtils.mockCallsContains(window.addEventListener, "click")).toEqual(true);
      *
      */
    mockCallsContains: function (mockFunction, value) {
        return _.contains(_.flatten(mockFunction.mock.calls), value);
    }

};

/**
 * @class UpdatePropsWrapper
 *
 * @desc A simple wrapper to be used for unit testing, when you need to update a property on a rendered component.
 * Starting with React 0.14.x, directly setting or replacing a prop on a rendered component is deprecated.
 * Instead, use this wrapper and call _setProps(newProps) on it to have the wrapped component re-render with the
 * new property(ies). The ref attribute on the wrapper is set to "wrapper".
 *
 * @example
 *     // initial render
 *     var component = ReactTestUtils.renderIntoDocument(
 *         <UpdatePropsWrapper type={If} test={true} />
 *     );
 *     // update the property through re-render
 *     component._setProps({test: false});
 *
 *     var component = ReactTestUtils.renderIntoDocument(
 *         <UpdatePropsWrapper type={TabbedSections}
 *                 onSectionChange={jest.genMockFunction()}
 *                 selectedIndex={-1}>
 *             <div data-id="section1" title="section 1">section 1</div>
 *             <div data-id="section2" title="section 2">section 2</div>
 *         </UpdatePropsWrapper>
 *     );
 *     component._setProps({ selectedIndex: 0 });
 *
 */
TestUtils.UpdatePropsWrapper = class extends React.Component {
    state = assign({ ref: "wrapper" }, this.props);

    /*
     * Re-render the wrapped component using the new property.
     * Use this function to avoid setting the props directly on the component (anti pattern).
     *
     * @param {object} props
     *     New property(ies) to set
     */
    _setProps = (props) => {
        this.setState(props);
    };

    render() {
        return React.createElement(
            this.props.type, // this is the type of element to create, provided as prop
            this.state // this is the rest of props to set on the element
        );
    }
};

TestUtils.checkForDataIds = function (component, ids) {
    return _.reduce(ids, (result, id) => {
        if (!result) {
            return false;
        }

        const subcomponent = TestUtils.findRenderedDOMNodeWithDataId(component, id);

        return subcomponent ? true : false;
    }, true);
};



module.exports = TestUtils;
