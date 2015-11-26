window.__DEV__ = true;

jest.dontMock("../ColorPicker.jsx");

describe("ColorPicker", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        ColorPicker = require("../ColorPicker.jsx"),
        _ = require("underscore");

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onToggle: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            controlled: true,
            expanded: true,
            color: "#fff",
            labelText: "some label"
        });

        return ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("accepts user typed color", function () {
        var component = getComponent({ controlled: false });
        var manager = component.refs.manager;
        var picker = manager.refs.picker;
        var input = React.findDOMNode(picker.refs.input);

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.onChange).lastCalledWith("#ff00aa");
    });

    it("detaches on unmount", function () {
        var component = getComponent();
        var picker = component.refs.picker;

        expect(window.addEventListener).toBeCalledWith("click", picker._close);
        React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", picker._close);
    });

    it("expands and collapses with key presses", function () {
        var component = getComponent({ controlled: false });
        var manager = component.refs.manager;
        var picker = manager.refs.picker;
        var input = React.findDOMNode(picker.refs.input);

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(component.props.onToggle.mock.calls.length).toBe(1);
        //esc key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(component.props.onToggle.mock.calls.length).toBe(2);
        //esc key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(component.props.onToggle.mock.calls.length).toBe(2);
    });

    it("calls onToggle even if internally managed", function () {
        var component = getComponent({ controlled: false });
        var manager = component.refs.manager;
        var picker = manager.refs.picker;
        var container = React.findDOMNode(picker.refs.container);

        //locating node by class because it's part of a  react-colorpicker.  No control over this
        expect(manager.state.expanded).toBe(false);

        //simulate expanding the color picker
        ReactTestUtils.Simulate.click(container);
        expect(component.props.onToggle.mock.calls.length).toBe(1);
        expect(manager.state.expanded).toBe(true);

        //simulate collapsing the color picker
        ReactTestUtils.Simulate.click(container);
        expect(component.props.onToggle.mock.calls.length).toBe(2);
        expect(manager.state.expanded).toBe(false);
    });

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
