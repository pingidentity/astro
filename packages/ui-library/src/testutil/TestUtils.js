"use strict";

var React = require("react/addons");
var ReactTestUtils = React.addons.TestUtils;

/**
 * @module testutil/TestUtils
 *
 * @desc A collection of ReactJS test utils, to complement the ones provided by the
 * framework.
 *
 */
var TestUtils = {
    
    /**
     * @desc Return all components in the supplied tree with the specified dataId.
     *
     * @param {ReactComponent} tree - the React component tree to search
     * @param {string} dataId - the value of the data-id attribute on the target elements
     * @return {ReactComponent[]} - all components which match the given criteria
     */
    scryRenderedDOMComponentsWithDataId: function (tree, dataId) {
        var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
            var instId = inst.props["data-id"];
            return ReactTestUtils.isDOMComponent(inst) && (instId === dataId);
        });
        
        return components;
    },

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
    findRenderedDOMComponentWithDataId: function (tree, dataId) {
        var components = TestUtils.scryRenderedDOMComponentsWithDataId(tree, dataId);

        if (components.length > 1) {
            throw new Error("Found more than one component with dataId: " +
                    dataId + " in the given tree");
        }

        return components.length === 0 ? null : components[0];
    },
    
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
    findRenderedDOMComponentWithName: function (tree, name) {
        var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
            var instName = inst.props.name;
            return ReactTestUtils.isDOMComponent(inst) && (name === instName);
        });
    
        if (components.length > 1) {
            throw new Error("Found more than one component with name: " +
                    name + " in the given tree");
        }
    
        return components.length === 0 ? null : components[0];
    }
};

module.exports = TestUtils;
