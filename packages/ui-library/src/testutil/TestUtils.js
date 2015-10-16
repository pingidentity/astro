'use strict';

var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

var TestUtils = {
    
    /*
     * Return all components in the supplied tree with the specified dataId.
     *
     */
    scryRenderedDOMComponentsWithDataId: function (tree, dataId) {
        var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
            var instId = inst.props['data-id'];
            return ReactTestUtils.isDOMComponent(inst) && (instId === dataId);
        });
        
        return components;
    },

    findRenderedDOMComponentWithDataId: function (tree, dataId) {
        var components = TestUtils.scryRenderedDOMComponentsWithDataId(tree, dataId);

        if (components.length > 1) {
            throw new Error('Found more than one component with dataId: ' +
                    dataId + ' in the given tree');
        }

        return components.length === 0 ? null : components[0];
    },
    
    findRenderedDOMComponentWithName: function (tree, name) {
        var components = ReactTestUtils.findAllInRenderedTree(tree, function (inst) {
            var instName = inst.props.name;
            return ReactTestUtils.isDOMComponent(inst) && (name === instName);
        });
    
        if (components.length > 1) {
            throw new Error('Found more than one component with name: ' +
                    name + ' in the given tree');
        }
    
        return components.length === 0 ? null : components[0];
    }
};

module.exports = TestUtils;
