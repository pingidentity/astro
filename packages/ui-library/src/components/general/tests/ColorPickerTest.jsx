window.__DEV__ = true;

jest.dontMock("../ColorPicker.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("ColorPicker", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ColorPicker = require("../ColorPicker.jsx"),
        FormLabel = require("../../forms/FormLabel.jsx"),
        _ = require("underscore");

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onToggle: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            color: "#fff"
        });
        return ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
    }

    function getParts (component) {
        var componentRef = component.refs.stateless || component.refs.stateful.refs.stateless;
        return {
            input: componentRef.refs.colorInput,
            picker: componentRef.refs.reactColorPicker
        };
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("stateless: renders label, hint and color", function () {
        var component = getComponent({
            color: "#ff00ff",
            labelText: "my color picker",
            hintText: "dont touch me",
            controlled: true
        });
        var componentRef = component.refs.stateless;

        // check the form label properties
        var label = TestUtils.findRenderedComponentWithType(component, FormLabel);
        expect(label).toBeTruthy();
        expect(label.props.value).toEqual("my color picker");
        expect(label.props.hint).toEqual("dont touch me");

        var colorSample = componentRef.refs.colorSample;
        expect(colorSample.style.backgroundColor).toEqual("rgb(255, 0, 255)");

        var colorInput = componentRef.refs.colorInput;
        expect(colorInput.disabled).toBe(false);
        expect(colorInput.value).toEqual("#ff00ff");

        // the picker is not visible by default
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: opens if tabbed to it", function () {
        var component = getComponent({ controlled: true });
        var input = getParts(component).input;

        ReactTestUtils.Simulate.focus(input, { nativeEvent: { relatedTarget: {} } });

        expect(component.props.onToggle).toBeCalled();
    });

    it("stateless: closes on a global click", function () {
        var component = getComponent({ controlled: true, open: true });
        var handler = window.addEventListener.mock.calls[0][1];
        var e = { target: document.body };

        expect(component.props.onToggle).not.toBeCalled();

        //click outside
        handler(e);

        expect(component.props.onToggle).toBeCalled();
    });

    it("stateless: skips global click handler if the click is inside the hue-spectrum", function () {
        var component = getComponent({ controlled: true, open: true });
        var handler = window.addEventListener.mock.calls[0][1];
        var hue = ReactDOM.findDOMNode(component).getElementsByClassName("react-color-picker__hue-spectrum")[0];

        //click inside hue spectrum
        handler({ target: hue });
        expect(component.props.onToggle).not.toBeCalled();
    });

    it("stateless: renders as closed and enabled if open and disabled props are not provided", function () {
        var component = getComponent({
            color: "#ff00ff",
            controlled: true
        });
        var componentRef = component.refs.stateless;

        // input should be enabled
        var colorInput = componentRef.refs.colorInput;
        expect(colorInput.disabled).toBe(false);

        // the picker should not be visible
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: renders the picker when open", function () {
        var component = getComponent({
            id: "container",
            color: "#ff00ff",
            open: true,
            controlled: true
        });
        var componentRef = component.refs.stateless;

        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeTruthy();

        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "container");
        expect(container.classList.contains("open")).toBeTruthy();
    });

    it("stateless: disables component if disabled=true", function () {
        var component = getComponent({
            disabled: true,
            controlled: true
        });
        var componentRef = component.refs.stateless;

        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);
        expect(input.disabled).toBeTruthy();

        // the picker should not be rendered (due to the disable state), even after forcibly toggling it
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: do not open picker if component is disabled", function () {
        var component = getComponent({
            open: true,
            disabled: true,
            controlled: true
        });
        var componentRef = component.refs.stateless;

        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateful: disables component if disabled=true", function () {
        var component = getComponent({ disabled: true });
        var componentRef = component.refs.stateful.refs.stateless;

        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);
        expect(input.disabled).toBeTruthy();

        // the picker should not be rendered (due to the disable state), even after forcibly toggling it
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
        component.refs.stateful._toggle();
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: accepts user typed color", function () {
        var component = getComponent({
            controlled: true
        });
        var componentRef = component.refs.stateless;
        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.onChange).lastCalledWith("#ff00aa");
    });

    it("stateful: accepts user typed color", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;
        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.onChange).lastCalledWith("#ff00aa");
    });

    it("stateless: detaches on unmount", function () {
        var component = getComponent({
            controlled: true
        });
        var componentRef = component.refs.stateless;

        expect(window.addEventListener).toBeCalledWith("click", componentRef._handleGlobalClick);
        expect(window.addEventListener).toBeCalledWith("keydown", componentRef._handleGlobalKeyDown);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", componentRef._handleGlobalClick);
        expect(window.removeEventListener).toBeCalledWith("keydown", componentRef._handleGlobalKeyDown);
    });

    it("stateless: handle global key down when closed", function () {
        var component = getComponent({
            controlled: true
        });
        var componentRef = component.refs.stateless;

        var e = { keyCode: 27 };
        componentRef._handleGlobalKeyDown(e);

        expect(component.props.onToggle.mock.calls.length).toBe(0);
    });

    it("stateless: handle global key down when open", function () {
        var component = getComponent({
            controlled: true,
            open: true
        });
        var componentRef = component.refs.stateless;

        // nothing happens when pressing any key other than ESC
        var e = { keyCode: 13 };
        componentRef._handleGlobalKeyDown(e);
        expect(component.props.onToggle.mock.calls.length).toBe(0);

        // should call the onToggle callback on ESC key press
        e = { keyCode: 27 };
        componentRef._handleGlobalKeyDown(e);
        expect(component.props.onToggle.mock.calls.length).toBe(1);
    });

    it("stateful: handle global key down", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // nothing happens when pressing ESC and picker is not open
        var e = { keyCode: 27 };
        componentRef._handleGlobalKeyDown(e);
        expect(componentRef.props.open).toBe(false);

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // should close
        e = { keyCode: 27 };
        componentRef._handleGlobalKeyDown(e);
        expect(componentRef.props.open).toBe(false);
    });

    it("stateful: expands and collapses with key presses", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;
        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(componentRef.props.open).toBe(true);
        //esc key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(componentRef.props.open).toBe(false);
        //esc key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(componentRef.props.open).toBe(false);
    });

    it("stateless: calls onToggle when press ENTER when closed", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle
        });
        var componentRef = component.refs.stateless;
        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);

        //return key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(1);
        //esc key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: calls onToggle when press ESC when closed", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle,
            open: true
        });
        var componentRef = component.refs.stateless;
        var input = ReactDOM.findDOMNode(componentRef.refs.colorInput);

        //return key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(0);
        //esc key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: toggle when the inner swatch is clicked", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle
        });
        var componentRef = component.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateful: open when the inner swatch is clicked", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        expect(componentRef.props.open).toBe(true);
    });

    it("stateless: trigger onChange when color is picked", function () {
        var component = getComponent({
            controlled: true,
            open: true
        });
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._onChange("#aaa");

        expect(component.props.onChange.mock.calls.length).toBe(1);
        expect(component.props.onChange.mock.calls[0][0]).toBe("#aaa");
        expect(component.props.onChange.mock.calls[0][1]).toBeUndefined();
    });

    it("stateful: trigger onChange when color is picked", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._onChange("#aaa");
        expect(component.props.onChange.mock.calls.length).toBe(1);
    });

    it("stateless: trigger onChange when mouse is dragged on the color picker", function () {
        var component = getComponent({
            controlled: true,
            open: true
        });
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._onDrag("#aaa");

        expect(component.props.onChange.mock.calls.length).toBe(1);
        expect(component.props.onChange.mock.calls[0][0]).toBe("#aaa");
    });

    it("stateful: trigger onChange when mouse is dragged on the color picker", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._onDrag("#aaa");

        expect(component.props.onChange.mock.calls.length).toBe(1);
        // and the color picker should not close
        expect(componentRef.props.open).toBe(true);
    });

    it("stateless: sets the provided color on the color picker", function () {
        var component = getComponent({
            color: "#ff00ff",
            open: true,
            controlled: true
        });
        var componentRef = component.refs.stateless;

        // the picker is not visible by default
        var picker = componentRef.refs.reactColorPicker;
        expect(picker.props.value).toBe("#ff00ff");
    });

    it("stateless: hides picker when told so", function () {
        var component = getComponent({
            id: "container",
            color: "#ff00ff",
            pickerHidden: true,
            controlled: true
        });
        var componentRef = component.refs.stateless;

        // the picker is not visible by default
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeDefined();

        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "container");
        expect(container.classList.contains("open")).toBeFalsy();
    });

});
