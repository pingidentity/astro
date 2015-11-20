window.__DEV__ = true;

jest.dontMock("../ColorPicker.jsx");

describe("ColorPicker", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        ColorPicker = require("../ColorPicker.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onToggle: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            visible: true,
            color: "#fff"
        });

        return ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
    }

    it("cancels click on the hue slider", function () {
        var component = getComponent();
        var node = React.findDOMNode(component);
        //locating node by class because it's part of a  react-colorpicker.  No control over this
        var slider = node.getElementsByClassName("hue-slider")[0];
        var map = node.getElementsByClassName("map")[0];

        //simulate moving the slider
        ReactTestUtils.Simulate.click(slider);
        expect(component.props.onToggle.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(map);
        expect(component.props.onToggle.mock.calls.length).toBe(1);
    });

    it("trigger onChange when color is picked", function () {
        var component = getComponent();
        var node = React.findDOMNode(component);
        //locating node by class because it's part of a  react-colorpicker.  No control over this
        var map = node.getElementsByClassName("pointer")[0];

        //simulate moving the slider
        ReactTestUtils.Simulate.mouseDown(map);
        expect(component.props.onChange.mock.calls.length).toBe(1);
    });
});
