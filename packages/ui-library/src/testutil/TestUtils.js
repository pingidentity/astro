/*eslint-disable valid-jsdoc*/

"use strict";

/**
 * @module util/TestUtils
 * @desc A collection of ReactJS test utils, to complement the ones provided by the
 * framework. This is a copy of the TestUtils in the library, just because this class
 * is used in the tests and should work with the same version of React used in the WP
 * and not in the library.
 */

var ReactDOM = require("react-dom");
var React = require("react");
var ReactTestUtils = require("react-addons-test-utils");
var _ = require("underscore");
var assign = require("object-assign");

var TestUtils = {

    /**
     * @alias module:util/TestUtils.scryRenderedDOMNodesWithDataId
     * @desc Return all DOM nodes children of the given tree with the specified dataId.
     *
     * @param {object} parent - the React component or DOM Node tree to search
     * @param {string} dataId - the value of the data-id attribute on the target elements
     * @return {array} - of DOM node objects which match the given criteria
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
     * If no node in the tree matches the criteria, null is returned.
     * If there are more than one node, an error is thrown.
     *
     * @param {object} parent - the React component or DOM Node tree to search
     * @param {string} dataId - the value of the data-id attribute on the target element
     * @return {object} - the DOM node object which matches the given criteria
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
     * @param {object} parent - the React component or DOM Node tree to search
     * @param {string} tagName - the tag name on the target elements
     * @return {array} - array of DOM nodes object which match the given criteria
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
     * If no node in the tree matches the criteria, null is returned.
     * If there are more than one node, an error is thrown.
     *
     * @param {ReactComponent} parent - the React component or DOM Node tree to search
     * @param {string} tagName - the tag name on the target element
     * @return {DOMNode} - the DOM node which matches the given criteria
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
     * @param {ReactComponent} parent - the React component or DOM Node tree to search
     * @param {string} name - the name on the target elements
     * @return {DOMNode[]} - all DOM nodes which match the given criteria
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
     * If no node in the tree matches the criteria, null is returned.
     * If there are more than one node, an error is thrown.
     *
     * @param {ReactComponent} parent - the React component or DOM Node tree to search
     * @param {string} name - the name on the target element
     * @return {DOMNode} - the DOM node which matches the given criteria
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
     * @param {ReactComponent} parent - the React component or DOM Node tree to search
     * @param {string} className - the CSS class name on the target elements (or a concatenation of classes, separated by space)
     * @return {DOMNode[]} - all DOM nodes which match the given criteria
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
     * If no node in the tree matches the criteria, null is returned.
     * If there are more than one node, an error is thrown.
     *
     * @param {ReactComponent} parent - the React component or DOM Node tree to search
     * @param {string} className - the CSS class name on the target element
     * @return {DOMNode} - the DOM node which matches the given criteria
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
     * @param {object} root - a composite (ie. React) component
     * @param {object} componentType - the component type
     * @return {array} an array of all the matches.
     */
    scryRenderedComponentsWithType: function (root, componentType) {
        return ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
    },

    /**
     * @alias module:util/TestUtils.findRenderedComponentWithType
     * @desc Same as `scryRenderedComponentsWithType` but expects there to be one result
     * and returns that one result, or throws exception if there is any other
     * number of matches besides one.
     * @param {object} root - a composite (ie. React) component
     * @param {object} componentType - the component type
     * @return {!ReactComponent} The one match.
     */
    findRenderedComponentWithType: function (root, componentType) {
        return ReactTestUtils.findRenderedComponentWithType(root, componentType);
    },

    /**
     * @alias module:util/TestUtils.captureGlobalListener
     * @desc Attaches proxy function for `window.addEvenListener` which will save reference to actual provided callback when
     * event type match filter. Useful for testing ReactJS component global (window) callbacks behaviour.
     *
     * @param {string} eventType event to save callback for. case insensitive.
     * @param {object} [obj=window] optional object to capture listener from. Like `document`. If not provided - window object
     * @returns {function} - when executed will trigger actual provided callback to `window.addEventListener`
     *
     * @example
     * //capture registered callback from reactjs control
     * var onKeyDown = TestUtils.captureGlobalListener("keyDown");
     *
     * onKeyDown({keyCode:13});  //later in test trigger global event
     *
     * @example
     * //capture registered callback from reactjs control on `document` object
     * var onKeyDown = TestUtils.captureGlobalListener("keyDown", document);
     *
     * onKeyDown({keyCode:13});  //later in test trigger global event
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
    }

    /**
     * @desc Return all components in the supplied tree with the specified dataId.
     *
     * @param {ReactComponent} tree - the React component tree to search
     * @param {string} dataId - the value of the data-id attribute on the target elements
     * @return {ReactComponent[]} - all components which match the given criteria
     */
    /*
     scryRenderedDOMComponentsWithDataId: function (tree, dataId) {
     var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
     var instId = ReactDOM.findDOMNode(inst).getAttribute("data-id");
     return ReactTestUtils.isDOMComponent(inst) && (instId === dataId);
     });

     return components;
     },
     */

    /**
     * @desc Return the single component in the supplied tree with the specified dataId.
     * If no component in the tree matches the criteria, null is returned.
     * If there are more than one component, an error is thrown.
     *
     * @param {ReactComponent} tree - the React component tree to search
     * @param {string} dataId - the value of the data-id attribute on the target element
     * @return {ReactComponent} - the component which match the given criteria
     * @throws Will throw an Error if more than one element match the criteria
     */
    /*
     findRenderedDOMComponentWithDataId: function (tree, dataId) {
     var components = TestUtils.scryRenderedDOMNodesWithDataId(tree, dataId);

     if (components.length > 1) {
     throw new Error("Found more than one component with dataId: " +
     dataId + " in the given tree");
     }

     return components.length === 0 ? null : components[0];
     },
     */

    /**
     * @desc Return the single component in the supplied tree with the specified name.
     * If no component in the tree matches the criteria, null is returned.
     * If there are more than one component, an error is thrown.
     *
     * @param {ReactComponent} tree - the React component tree to search
     * @param {string} name - the value of the name attribute on the target element
     * @return {ReactComponent} - the component which match the given criteria
     * @throws Will throw an Error if more than one element match the criteria
     */
    /*
     findRenderedDOMComponentWithName: function (tree, name) {
     var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
     var instName = ReactDOM.findDOMNode(inst).name;
     return ReactTestUtils.isDOMComponent(inst) && (name === instName);
     });

     if (components.length > 1) {
     throw new Error("Found more than one component with name: " +
     name + " in the given tree");
     }

     return components.length === 0 ? null : components[0];
     }
     */
};

/**
 * @class UpdatePropsWrapper
 *
 * @desc
 * A simple wrapper to be used for unit testing, when you need to update
 * a property on a rendered component. Starting with React 0.14.x,
 * directly setting or replacing a prop on a rendered component is deprecated.
 * Instead, use this wrapper and call _setProps(newProps) on it
 * to have the wrapped component re-render with the new property(ies).
 * The ref attribute on the wrapper is set to "wrapper".
 *
 * @Example
 *  // initial render
 *  var component = ReactTestUtils.renderIntoDocument(
 *      <UpdatePropsWrapper type={If} test={true} />
 *  );
 *  // update the property through re-render
 *  component._setProps({test: false});
 *
 * @Example
 *  var component = ReactTestUtils.renderIntoDocument(
 *      <UpdatePropsWrapper type={TabbedSections}
 *              onSectionChange={jest.genMockFunction()}
 *              selectedIndex={-1}>
 *          <div data-id="section1" title="section 1">section 1</div>
 *          <div data-id="section2" title="section 2">section 2</div>
 *      </UpdatePropsWrapper>
 *  );
 *  component._setProps({ selectedIndex: 0 });
 *
 */
TestUtils.UpdatePropsWrapper = React.createClass({
    /**
     * Re-render the wrapped component using the new property.
     * Use this function to avoid setting the props directly on the component (anti pattern).
     * @param {object} props - new property(ies) to set
     */
    _setProps: function (props) {
        this.setState(props);
    },
    getInitialState: function () {
        return assign({ ref: "wrapper" }, this.props);
    },
    render: function () {
        return React.createElement(
            this.props.type, // this is the type of element to create, provided as prop
            this.state // this is the rest of props to set on the element
        );
    }
});

module.exports = TestUtils;
