window.__DEV__ = true;

jest.dontMock("../ColorPicker.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Validators.js");
jest.dontMock("../../../util/Utils.js");

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
            onValueChange: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            color: "#fff"
        });
        return ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
    }

    function getParts (component) {
        var componentRef = component.refs.stateless || component.refs.stateful.refs.stateless;
        return {
            input: TestUtils.findRenderedDOMNodeWithDataId(component, "input"),
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
        var label = TestUtils.scryRenderedComponentsWithType(component, FormLabel)
            .filter(function (formLabelComponent) {
                if (formLabelComponent.props["data-id"] === "colorLabel") {
                    return formLabelComponent;
                }
            })[0];
        expect(label).toBeTruthy();
        expect(label.props.value).toEqual("my color picker");
        expect(label.props.hint).toEqual("dont touch me");

        var colorSample = componentRef.refs.colorSample;
        expect(colorSample.style.backgroundColor).toEqual("rgb(255, 0, 255)");

        var colorInput = TestUtils.findRenderedDOMNodeWithDataId(component, "input");
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

    it("stateless: skips the global click handler if not open and click outside of picker", function () {
        var component = getComponent({ controlled: true });
        var handler = window.addEventListener.mock.calls[0][1];
        var e = { target: document.body };

        expect(component.props.onToggle).not.toBeCalled();

        //click outside
        handler(e);

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("stateless: skips the global click handler if not open and click inside picker", function () {
        var component = getComponent({ controlled: true });
        var innerSwatch = component.refs.stateless.refs.innerSwatch;
        var handler = window.addEventListener.mock.calls[0][1];

        //click on the inner swatch
        handler({ target: innerSwatch });
        expect(component.props.onToggle).not.toBeCalled();
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
        var colorInput = TestUtils.findRenderedDOMNodeWithDataId(component, "input");
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

        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));
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

        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));
        expect(input.disabled).toBeTruthy();

        // the picker should not be rendered (due to the disable state), even after forcibly toggling it
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
        component.refs.stateful._handleToggle();
        var picker = componentRef.refs.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: accepts valid user typed color", function () {
        var component = getComponent({
            controlled: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.onValueChange).lastCalledWith("#ff00aa");
    });

    it("stateful: accepts valid user typed color", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#ff00aa" } });
        expect(component.props.onValueChange).lastCalledWith("#ff00aa");
    });

    it("stateless: does not accept invalid user typed color", function () {
        var component = getComponent({
            controlled: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#xxi" } });
        expect(component.props.onValueChange).not.toBeCalled();
    });

    it("stateful: does not accept invalid user typed color", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "#xxi" } });
        expect(component.props.onValueChange).not.toBeCalled();
    });

    it("stateless: triggers error for invalid user typed color on blur", function () {
        var component = getComponent({
            controlled: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        ReactTestUtils.Simulate.blur(input, { target: { value: "#ff" } });
        expect(component.props.onError).toBeCalled();
    });

    it("stateless: does not triggers error for valid user typed color on blur", function () {
        var component = getComponent({
            controlled: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        ReactTestUtils.Simulate.blur(input, { target: { value: "#000" } });
        expect(component.props.onError).not.toBeCalled();
    });

    it("stateless: prepends '#' to user typed color if it does not start with '#'", function () {
        var component = getComponent({
            controlled: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "ff00aa" } });
        expect(component.props.onValueChange).lastCalledWith("#ff00aa");

        ReactTestUtils.Simulate.change(input, { target: { value: "#aabbcc" } });
        expect(component.props.onValueChange).lastCalledWith("#aabbcc");
    });

    it("stateful: prepends '#' to user typed color if it does not start with '#'", function () {
        var component = getComponent();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand.  This is weak but simulating keydowns didnt work
        ReactTestUtils.Simulate.change(input, { target: { value: "ff00aa" } });
        expect(component.props.onValueChange).lastCalledWith("#ff00aa");

        ReactTestUtils.Simulate.change(input, { target: { value: "#aabbcc" } });
        expect(component.props.onValueChange).lastCalledWith("#aabbcc");
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
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(componentRef.props.open).toBe(true);
        //esc key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(componentRef.props.open).toBe(false);
        //esc key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(componentRef.props.open).toBe(false);

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(componentRef.props.open).toBe(true);
        //tab key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(componentRef.props.open).toBe(false);
        //tab key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(componentRef.props.open).toBe(false);

    });

    it("stateless: calls onToggle when press ENTER when closed", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(1);
        //esc key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(onToggle.mock.calls.length).toBe(1);
        //tab key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: calls onToggle when press ESC when closed", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle,
            open: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(0);
        //esc key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: calls onToggle when press tab when closed", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            onToggle: onToggle,
            open: true
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithDataId(component, "input"));

        //return key should not toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(onToggle.mock.calls.length).toBe(0);
        //esc key should toggle
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
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

    it("stateless: do not toggle if disabled when the inner swatch is clicked", function () {
        var onToggle = jest.genMockFunction();
        var component = getComponent({
            controlled: true,
            disabled: true,
            onToggle: onToggle
        });
        var componentRef = component.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        expect(onToggle.mock.calls.length).toBe(0);
    });

    it("stateless: open when the inner swatch is focused on", function () {
        var component = getComponent({ controlled: true });
        var componentRef = component.refs.stateless;

        ReactTestUtils.Simulate.focus(componentRef.refs.innerSwatch, { nativeEvent: { relatedTarget: {} } });

        expect(component.props.onToggle).toBeCalled();
    });

    it("stateless: open when the inner swatch is focused on", function () {
        var component = getComponent({ controlled: true });
        var componentRef = component.refs.stateless;

        ReactTestUtils.Simulate.focus(componentRef.refs.innerSwatch, { nativeEvent: { relatedTarget: false } });

        expect(component.props.onToggle).not.toBeCalled();
    });


    it("stateful: open when the inner swatch is clicked", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        expect(componentRef.props.open).toBe(true);
    });

    it("stateless: trigger onValueChange when color is picked", function () {
        var component = getComponent({
            controlled: true,
            open: true
        });
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._handleValueChange("#aaa");

        expect(component.props.onValueChange.mock.calls.length).toBe(1);
        expect(component.props.onValueChange.mock.calls[0][0]).toBe("#aaa");
        expect(component.props.onValueChange.mock.calls[0][1]).toBeUndefined();
    });

    it("stateful: trigger onValueChange when color is picked", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._handleValueChange("#aaa");
        expect(component.props.onValueChange.mock.calls.length).toBe(1);
    });

    it("stateless: trigger onValueChange when mouse is dragged on the color picker", function () {
        var component = getComponent({
            controlled: true,
            open: true
        });
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._handleDrag("#aaa");

        expect(component.props.onValueChange.mock.calls.length).toBe(1);
        expect(component.props.onValueChange.mock.calls[0][0]).toBe("#aaa");
    });

    it("stateful: trigger onValueChange when mouse is dragged on the color picker", function () {
        var component = getComponent();
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._handleDrag("#aaa");

        expect(component.props.onValueChange.mock.calls.length).toBe(1);
        // and the color picker should not close
        expect(componentRef.props.open).toBe(true);
    });

    //TODO To be removed once "onChange" support is discontnued.
    it("stateless: trigger onChange when color is picked", function () {
        var opts = {
            onToggle: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            color: "#fff",
            controlled: true,
            open: true
        };
        var component = ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._handleValueChange("#aaa");

        expect(component.props.onChange.mock.calls.length).toBe(1);
        expect(component.props.onChange.mock.calls[0][0]).toBe("#aaa");
        expect(component.props.onChange.mock.calls[0][1]).toBeUndefined();
    });

    //TODO To be removed once "onChange" support is discontnued.
    it("stateful: trigger onChange when color is picked", function () {
        var opts = {
            onToggle: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            color: "#fff"
        };
        var component = ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._handleValueChange("#aaa");
        expect(component.props.onChange.mock.calls.length).toBe(1);
    });

    //TODO To be removed once "onChange" support is discontnued.
    it("stateless: trigger onChange when mouse is dragged on the color picker", function () {
        var opts = {
            onToggle: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            color: "#fff",
            controlled: true,
            open: true
        };
        var component = ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
        var componentRef = component.refs.stateless;

        // simulate a call back from the react color picker component
        componentRef._handleDrag("#aaa");

        expect(component.props.onChange.mock.calls.length).toBe(1);
        expect(component.props.onChange.mock.calls[0][0]).toBe("#aaa");
    });

    //TODO To be removed once "onChange" support is discontnued.
    it("stateful: trigger onChange when mouse is dragged on the color picker", function () {
        var opts = {
            onToggle: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            color: "#fff"
        };
        var component = ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);
        var componentRef = component.refs.stateful.refs.stateless;

        // open the color picker
        ReactTestUtils.Simulate.click(componentRef.refs.innerSwatch);

        // simulate a call back from the react color picker component
        componentRef._handleDrag("#aaa");

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

    // TODO To be removed once "id" support is discontnued.
    it("render component with id", function () {
        var component = getComponent(
            { id: "colorPickerWithId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "colorPickerWithId");

        expect(element).toBeDefined();
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

    it("stateless: render component with null color", function () {
        var component = getComponent({
            color: null,
            controlled: true
        });

        var componentRef = component.refs.stateless;

        var colorSample = componentRef.refs.colorSample;
        expect(colorSample.style.backgroundColor).toEqual("");

        var colorInput = TestUtils.findRenderedDOMNodeWithDataId(component, "input");
        expect(colorInput.disabled).toBe(false);
        expect(colorInput.value).toEqual("");
    });

    // TODO To be removed once "id" support is discontnued.
    it("log warning in console for id", function () {
        console.warn = jest.genMockFunction();
        getComponent(
            { id: "colorPickerWithId" }
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
    });

    // TODO To be removed once "onChange" support is discontnued.
    it("log warning in console for onChange", function () {
        console.warn = jest.genMockFunction();
        getComponent({
            "data-id": "colorPickerWithOnChange",
            onChange: jest.genMockFunction()
        });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onValueChange instead of onChange. Support for onChange will be removed in next version");
    });

    // TODO To be removed once "onChange" support is discontnued.
    it("log warning in console for missing onValueChange and onChange", function () {
        console.error = jest.genMockFunction();
        var opts = {
            onToggle: jest.genMockFunction(),
            onError: jest.genMockFunction(),
            color: "#fff"
        };
        ReactTestUtils.renderIntoDocument(<ColorPicker {...opts} />);

        expect(console.error).toBeCalledWith(
            "Warning: Failed propType: Required prop onValueChange was not specified in `ColorPicker`.");
    });

    //TODO: remove when deprecated props no longer supported
    it("does not log warning for id, onChange when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({
            id: "colorPickerWithOnChange",
            onChange: jest.genMockFunction()
        });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
