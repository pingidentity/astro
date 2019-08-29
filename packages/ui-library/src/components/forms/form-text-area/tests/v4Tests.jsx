import React from "react";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import FormTextArea from "../v2";
import HelpHint from "../../../tooltips/HelpHint";
import Utils from "../../../../util/Utils";
import _ from "underscore";
import StateContainer from "../../../utils/StateContainer";
import { mount } from "enzyme";

describe("FormTextArea v4", function () {

    function getComponent (props) {
        props = _.defaults(props || {}, {
            stateless: true,
            onChange: jest.fn(),
            onValueChange: jest.fn(),
            onBlur: jest.fn(),
            flags: [ "p-stateful" ],
        });

        return ReactTestUtils.renderIntoDocument(<FormTextArea {...props} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <FormTextArea
                stateless={true}
                onChange={jest.fn()}
                onValueChange={jest.fn()}
                onBlur={jest.fn()}
                flags={[ "p-stateful" ]}
            />
        );
    });

    it("renders the component", function () {
        var component = getComponent();

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "input-textarea");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
        // make sure that the field is not required by default
        var elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("renders with given value", function () {
        var component = getComponent({
            value: "myValue"
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        expect(field.value).toBe("myValue");
    });

    it("shows the default value", function () {
        var defaultValue = "my random value";
        var component = getComponent({ value: defaultValue });

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        expect(field.value).toContain(defaultValue);
    });

    it("shows placeholder", function () {
        var defaultValue = "my random value",
            placeholder = "edit me";

        var component = getComponent({
            defaultValue: defaultValue,
            placeholder: placeholder
        });

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        expect(field.getAttribute("placeholder")).toEqual(placeholder);
    });

    it("shows labelHelpText", function () {
        var helpText = "help!";
        var component = getComponent({
            labelText: "label",
            labelHelpText: helpText
        });

        var help = TestUtils.findRenderedComponentWithType(component, HelpHint);

        expect(help).toBeTruthy();
    });

    it("shows labelText", function () {
        var component = getComponent({ labelText: "myLabel" });

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "label-text");

        expect(label).toBeDefined();
    });

    it("respects value over defaultValue and state precedence", function () {
        var component = getComponent({
            defaultValue: "my random value",
            value: "my value"
        });

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        expect(field.value).toContain("my value");

        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        expect(field.value).toContain("my value");
    });

    it("fires the onChange and onValueChange callbacks when field changes", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(component.props.onChange).toBeCalled();
        expect(component.props.onValueChange).toBeCalled();
    });

    it("triggers the onBlur callback on field blur", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");

        ReactTestUtils.Simulate.blur(field);

        expect(component.props.onBlur).toBeCalled();
    });

    it("does not show the undo button if showUndo is not set to true", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("shows the undo button if showUndo is set to true", function () {
        var component = getComponent({ showUndo: true });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeDefined();
    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";
        var component = getComponent({
            errorMessage: errorMessage
        });

        var errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area-errorMessage") ||
            TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area_errormessage");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

    it("is disabled when it is specified", function () {
        var component = getComponent({ disabled: true });

        var textarea = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        expect(ReactTestUtils.isDOMComponent(textarea)).toBeTruthy();
        expect(textarea.disabled).toBeTruthy();
    });

    it("uses autoComplete when specified", function () {
        var component = getComponent({ useAutocomplete: true });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");

        expect(field.getAttribute("autocomplete")).toBe("on");
    });

    it("shows field as required", function () {
        var component = getComponent({ required: true });

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("stateless: renders the component with default data-id", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area");

        expect(field).toBeDefined();
    });

    it("stateless: renders the component with given data-id", function () {
        var component = getComponent({ "data-id": "myField" });

        var field = TestUtils.findRenderedDOMNodeWithDataId(component, "myField");

        expect(field).toBeDefined();
    });

    it("stateful: assigns empty string to value state when no value or defaultValue given", function () {
        const component = getComponent();
        const stateContainer = ReactTestUtils.findRenderedComponentWithType(component, StateContainer);

        expect(stateContainer.state.value).toBe("");
    });

    it("stateful: does not show the undo button if the originalValue param is not passed in", function () {
        var originalValue = "my original value";
        var component = getComponent({
            stateless: false,
            defaultValue: originalValue
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("stateful: shows the undo icon when text changes", function () {
        const originalValue = "my original value";
        const component = getComponent({
            initialState: { value: originalValue },
            originalValue: originalValue,
            showUndo: true,
        });

        const field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        const undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("stateful: reverts the input text to its original value if the undo icon is clicked", function () {
        var originalValue = "my original value";
        var component = getComponent({
            stateless: false,
            defaultValue: originalValue,
            originalValue: originalValue,
            showUndo: true,
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        // check that the undo icon gets displayed
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon and verify that the field gets reverted to the original value
        ReactTestUtils.Simulate.click(undo);
        expect(field.value).toEqual(originalValue);
        // now check that the undo icon dissapeared
        undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("stateful: fires the onValueChange callback when clicking on the undo icon", function () {
        var originalValue = "my original value";
        var component = getComponent({
            stateless: false,
            defaultValue: originalValue,
            originalValue: originalValue,
            showUndo: true,
        });

        // make the undo icon appear by changing the field
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        // check that the icon is actually there
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon
        ReactTestUtils.Simulate.click(undo);
        // now we can verify that the callback gets triggered
        expect(component.props.onValueChange).toBeCalled();
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("shows labelHelpText with the labelClassName applied", function () {
        var helpText = "help!";
        var component = getComponent({
            labelText: "label",
            labelHelpText: helpText,
            helpClassName: "bottom right",
            showUndo: true,
        });

        var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(help).toBeTruthy();
        // expect(help.getAttribute("class")).toContain("bottom right");
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("fires cannonball warning when p-stateful flag isn't set", function () {
        console.warn = jest.fn();
        getComponent({ flags: [] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire cannonball warning when p-stateful flag is set", function () {
        console.warn = jest.fn();
        getComponent({ flags: ["p-stateful"] });
        expect(console.warn).not.toBeCalled();
    });

    it("renders with no monospaced class when monospaced is false", () => {
        const component = mount(
            <FormTextArea
                monospaced={false}
            />
        );

        const spacing = component.find(".input-textarea__input--monospaced");

        expect(spacing.exists()).toEqual(false);
    });

    it("renders with single spacing class when spacing property is set to single", () => {
        const component = mount(
            <FormTextArea
                monospaced
            />
        );

        const spacing = component.find(".input-textarea__input--monospaced");

        expect(spacing.exists()).toEqual(true);
    });

    it("does not block resizing when noResize is false", () => {
        const component = mount(
            <FormTextArea
                noResize={false}
            />
        );
        const textarea = component.find(".input-textarea__input--no-resize");
        expect(textarea.exists()).toBeFalsy();
    });
    it("blocks resizing when noResize is true", () => {
        const component = mount(
            <FormTextArea
                noResize={true}
            />
        );
        const textarea = component.find("textarea.input-textarea__input--no-resize");
        expect(textarea.exists()).toBeTruthy();
    });
});
