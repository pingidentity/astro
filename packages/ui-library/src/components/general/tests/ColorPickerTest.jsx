window.__DEV__ = true;

jest.dontMock("../ColorPicker");
jest.dontMock("../If");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Validators.js");
jest.dontMock("../../../util/Utils.js");
jest.dontMock("react-color");

jest.mock("popper.js");
jest.mock("react-portal");

describe("ColorPicker", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ColorPicker = require("../ColorPicker"),
        _ = require("underscore");

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onToggle: jest.fn(),
            onValueChange: jest.fn(),
            onError: jest.fn(),
            color: "#fff"
        });
        return TestUtils.renderInWrapper(<ColorPicker {...opts} />);
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("stateless: closes on a global click", function () {
        var component = getComponent({ stateless: true, open: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        var e = { target: document.body };
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });


        expect(component.props.children.props.onToggle).not.toBeCalled();

        //click outside
        handler(e);

        expect(component.props.children.props.onToggle).toBeCalled();
    });

    it("stateless: skips the global click handler if not open and click outside of picker", function () {
        var component = getComponent({ stateless: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        var e = { target: document.body };

        expect(component.props.children.props.onToggle).not.toBeCalled();

        //click outside
        handler(e);

        expect(component.props.children.props.onToggle).not.toBeCalled();
    });

    it("stateless: accepts valid user typed color", function () {
        var component = getComponent({
            stateless: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#ff00aa");
    });

    it("stateful: accepts valid user typed color", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#ff00aa");
    });

    it("stateless: does not accept invalid user typed color", function () {
        var component = getComponent({
            stateless: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#xxi" } });
        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    it("stateful: does not accept invalid user typed color", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#xxi" } });
        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    it("stateless: triggers error for invalid user typed color on blur", function () {
        var component = getComponent({
            stateless: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        ReactTestUtils.Simulate.blur(input, { target: { value: "#ff" } });
        expect(component.props.children.props.onError).toBeCalled();
    });

    it("stateless: does not triggers error for valid user typed color on blur", function () {
        var component = getComponent({
            stateless: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        ReactTestUtils.Simulate.blur(input, { target: { value: "#000" } });
        expect(component.props.children.props.onError).not.toBeCalled();
    });

    it("stateless: prepends '#' to user typed color if it does not start with '#'", function () {
        var component = getComponent({
            stateless: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "ff00aa" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#ff00aa");

        ReactTestUtils.Simulate.change(input, { target: { value: "#aabbcc" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#aabbcc");
    });

    it("stateful: prepends '#' to user typed color if it does not start with '#'", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "ff00aa" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#ff00aa");

        ReactTestUtils.Simulate.change(input, { target: { value: "#aabbcc" } });
        expect(component.props.children.props.onValueChange).lastCalledWith("#aabbcc");
    });

    it("stateless: calls onToggle when press ESC when closed", function () {
        var onToggle = jest.fn();
        var component = getComponent({
            stateless: true,
            onToggle: onToggle,
            open: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.scryRenderedDOMNodesWithTag(component, "input")[0]);

        //return key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(0);
        //esc key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: calls onToggle when press tab when closed", function () {
        var onToggle = jest.fn();
        var component = getComponent({
            stateless: true,
            onToggle: onToggle,
            open: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.scryRenderedDOMNodesWithTag(component, "input")[0]);

        //return key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(0);
        //esc key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("render component with data-id", function () {
        var component = getComponent(
            { "data-id": "colorPickerWithDataId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "colorPickerWithDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = getComponent();

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "color-picker");

        expect(element).toBeDefined();
    });

    it("render open state using portal", function () {
        var component = getComponent({
            stateless: true,
            open: true,
        });

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "popover-display");

        expect(element).toBeDefined();
    });

});
