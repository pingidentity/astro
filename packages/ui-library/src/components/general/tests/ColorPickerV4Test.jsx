window.__DEV__ = true;

jest.dontMock("../ColorPicker");
jest.dontMock("../If");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Validators.js");
jest.dontMock("../../../util/Utils.js");
jest.dontMock("react-color");

jest.mock("popper.js");
jest.mock("react-portal");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import ColorPicker from "../ColorPicker";
import FormLabel from "../../forms/FormLabel";
import _ from "underscore";

describe("ColorPicker v4", function () {

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onToggle: jest.fn(),
            onValueChange: jest.fn(),
            onError: jest.fn(),
            color: "#fff",
        });
        return TestUtils.renderInWrapper(<ColorPicker {...opts} />);
    }

    function getParts (component) {
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);
        return {
            input: TestUtils.scryRenderedDOMNodesWithTag(component, "input")[0],
            picker: stateless.reactColorPicker
        };
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ColorPicker
                onToggle={jest.fn()}
                onValueChange={jest.fn()}
                onError={jest.fn()}
                color={"#fff"}
            />
        );
    });

    it("stateless: renders label, hint and color", function () {
        var component = getComponent({
            color: "#ff00ff",
            labelText: "my color picker",
            hintText: "dont touch me",
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

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

        var colorSample = stateless.refs.colorSample;
        expect(colorSample.style.backgroundColor).toEqual("rgb(255, 0, 255)");

        var colorInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(colorInput.disabled).toBe(false);
        expect(colorInput.value).toEqual("#ff00ff");

        // the picker is not visible by default
        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: doesn't open when tabbed to it", function () {
        var component = getComponent({ stateless: true });
        var input = getParts(component).input;

        ReactTestUtils.Simulate.focus(input, { nativeEvent: { relatedTarget: {} } });

        expect(component.props.children.props.onToggle).not.toBeCalled();
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

    it("stateless: skips the global click handler if not open and click inside picker", function () {
        var component = getComponent({ stateless: true });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);
        const innerSwatch = stateless.refs.innerSwatch;
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];

        //click on the inner swatch
        handler({ target: innerSwatch });
        expect(component.props.children.props.onToggle).not.toBeCalled();
    });

    it("stateless: skips global click handler if the click is inside the component", function () {
        var component = getComponent({ stateless: true, open: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        var pickerNode = ReactDOM.findDOMNode(getParts(component).picker);


        handler({ target: pickerNode });
        expect(component.props.children.props.onToggle).not.toBeCalled();
    });

    it("stateless: renders as closed and enabled if open and disabled props are not provided", function () {
        var component = getComponent({
            color: "#ff00ff",
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // input should be enabled
        var colorInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(colorInput.disabled).toBe(false);

        // the picker should not be visible
        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: renders the picker when open", function () {
        var component = getComponent({
            "data-id": "container",
            color: "#ff00ff",
            open: true,
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var picker = stateless.reactColorPicker;
        expect(picker).toBeTruthy();

        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "container");
        expect(container.classList.contains("open")).toBeTruthy();
    });

    it("stateless: disables component if disabled=true", function () {
        var component = getComponent({
            disabled: true,
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));
        expect(input.disabled).toBeTruthy();

        // the picker should not be rendered (due to the disable state), even after forcibly toggling it
        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateless: do not open picker if component is disabled", function () {
        var component = getComponent({
            open: true,
            disabled: true,
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
    });

    it("stateful: disables component if disabled=true", function () {
        var component = getComponent({ disabled: true });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));
        expect(input.disabled).toBeTruthy();

        // the picker should not be rendered (due to the disable state), even after forcibly toggling it
        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
        stateless.props.onToggle();
        var picker = stateless.reactColorPicker;
        expect(picker).toBeUndefined();
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

    it("stateless: detaches on unmount", function () {
        var component = getComponent({
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        expect(window.addEventListener).toBeCalledWith("click", stateless._handleGlobalClick);
        expect(window.addEventListener).toBeCalledWith("keydown", stateless._handleGlobalKeyDown);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", stateless._handleGlobalClick);
        expect(window.removeEventListener).toBeCalledWith("keydown", stateless._handleGlobalKeyDown);
    });

    it("stateless: handle global key down when closed", function () {
        var component = getComponent({
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var e = { keyCode: 27 };
        stateless._handleGlobalKeyDown(e);

        expect(component.props.children.props.onToggle.mock.calls.length).toBe(0);
    });

    it("stateless: handle global key down when open", function () {
        var component = getComponent({
            stateless: true,
            open: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // nothing happens when pressing any key other than ESC
        var e = { keyCode: 13 };
        stateless._handleGlobalKeyDown(e);
        expect(component.props.children.props.onToggle.mock.calls.length).toBe(0);

        // should call the onToggle callback on ESC key press
        e = { keyCode: 27 };
        stateless._handleGlobalKeyDown(e);
        expect(component.props.children.props.onToggle.mock.calls.length).toBe(1);
    });

    it("stateful: handle global key down", function () {
        var component = getComponent();
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // nothing happens when pressing ESC and picker is not open
        var e = { keyCode: 27 };
        stateless._handleGlobalKeyDown(e);
        expect(stateless.props.open).toBe(false);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        // should close
        e = { keyCode: 27 };
        stateless._handleGlobalKeyDown(e);
        expect(stateless.props.open).toBe(false);
    });

    it("stateful: expands and collapses with key presses", function () {
        var component = getComponent();
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(stateless.props.open).toBe(true);
        //esc key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(stateless.props.open).toBe(false);
        //esc key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 27 });
        expect(stateless.props.open).toBe(false);

        //return key should make it expand
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });
        expect(stateless.props.open).toBe(true);
        //tab key will close the picker
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(stateless.props.open).toBe(false);
        //tab key again will have no effect
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 9 });
        expect(stateless.props.open).toBe(false);

    });

    it("stateless: calls onToggle when press ENTER when closed", function () {
        var onToggle = jest.fn();
        var component = getComponent({
            stateless: true,
            onToggle: onToggle,
            open: false,
        });
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMNodeWithTag(component, "input"));

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

    it("stateless: toggle when the inner swatch is clicked", function () {
        var onToggle = jest.fn();
        var component = getComponent({
            stateless: true,
            onToggle: onToggle
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        expect(onToggle.mock.calls.length).toBe(1);
    });

    it("stateless: do not toggle if disabled when the inner swatch is clicked", function () {
        var onToggle = jest.fn();
        var component = getComponent({
            stateless: true,
            disabled: true,
            onToggle: onToggle
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        expect(onToggle.mock.calls.length).toBe(0);
    });

    it("stateless: doesn't open when the inner swatch is focused on", function () {
        var component = getComponent({ stateless: true });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        ReactTestUtils.Simulate.focus(stateless.refs.innerSwatch, { nativeEvent: { relatedTarget: {} } });

        expect(component.props.children.props.onToggle).not.toBeCalled();
    });

    it("stateless: open when the inner swatch is focused on", function () {
        var component = getComponent({ stateless: true });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        ReactTestUtils.Simulate.focus(stateless.refs.innerSwatch, { nativeEvent: { relatedTarget: false } });

        expect(component.props.children.props.onToggle).not.toBeCalled();
    });

    it("stateful: open when the inner swatch is clicked", function () {
        var component = getComponent();
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        expect(stateless.props.open).toBe(true);
    });

    it("stateless: trigger onValueChange when color is picked", function () {
        var component = getComponent({
            stateless: true,
            open: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // simulate a call back from the react color picker component
        stateless._handleValueChange({ hex: "#aaa" });

        expect(component.props.children.props.onValueChange.mock.calls.length).toBe(1);
        expect(component.props.children.props.onValueChange.mock.calls[0][0]).toBe("#aaa");
        expect(component.props.children.props.onValueChange.mock.calls[0][1]).toBeUndefined();
    });

    it("stateful: trigger onValueChange when color is picked", function () {
        var component = getComponent();
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        // simulate a call back from the react color picker component
        stateless._handleValueChange("#aaa");
        expect(component.props.children.props.onValueChange.mock.calls.length).toBe(1);
    });

    it("stateless: trigger onValueChange when mouse is dragged on the color picker", function () {
        var component = getComponent({
            stateless: true,
            open: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // simulate a call back from the react color picker component
        stateless._handleDrag({ hex: "#aaa" });

        expect(component.props.children.props.onValueChange.mock.calls.length).toBe(1);
        expect(component.props.children.props.onValueChange.mock.calls[0][0]).toBe("#aaa");
    });

    it("stateful: trigger onValueChange when mouse is dragged on the color picker", function () {
        var component = getComponent();
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // open the color picker
        ReactTestUtils.Simulate.click(stateless.refs.innerSwatch);

        // simulate a call back from the react color picker component
        stateless._handleDrag("#aaa");

        expect(component.props.children.props.onValueChange.mock.calls.length).toBe(1);
        // and the color picker should not close
        expect(stateless.props.open).toBe(true);
    });

    it("stateless: sets the provided color on the color picker", function () {
        var component = getComponent({
            color: "#ff00ff",
            open: true,
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        // the picker is not visible by default
        var picker = stateless.reactColorPicker;

        expect(picker.props.color).toBe("#ff00ff");
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
            stateless: true
        });

        const stateless = ReactTestUtils.findRenderedComponentWithType(component, ColorPicker._statelessComponent);

        var colorSample = stateless.refs.colorSample;
        expect(colorSample.style.backgroundColor).toEqual("");

        var colorInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(colorInput.disabled).toBe(false);
        expect(colorInput.value).toEqual("");
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
