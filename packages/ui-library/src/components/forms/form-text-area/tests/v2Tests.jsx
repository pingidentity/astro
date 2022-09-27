
jest.dontMock("../v2");
jest.dontMock("../../FormLabel");
jest.dontMock("../../FormError");
jest.dontMock("../../../tooltips/HelpHint");

describe("FormTextArea", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextArea = require("../v2"),
        HelpHint = require("../../../tooltips/HelpHint"),
        _ = require("underscore");

    function getComponent(props) {
        props = _.defaults(props || {}, {
            stateless: true,
            onChange: jest.fn(),
            onValueChange: jest.fn(),
            onBlur: jest.fn()
        });

        return TestUtils.renderInWrapper(<FormTextArea {...props} />);
    }

    window.ResizeObserver = window.ResizeObserver ||
        jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
        }));

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

    it("renders text area with same id as label for", function () {
        var component = getComponent({
            labelText: "some label"
        });

        const textareaField = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area-textarea");
        const fieldLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area");

        expect(textareaField.getAttribute("id")).toStrictEqual(fieldLabel.getAttribute("for"));
    });

    it("renders input with custom id", function () {
        var customId = "custom-id";
        var component = getComponent({
            id: customId
        });

        const textareaField = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-area-textarea");

        expect(textareaField.getAttribute("id")).toStrictEqual(customId);
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
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        expect(component.props.children.props.onChange).toBeCalled();
        expect(component.props.children.props.onValueChange).toBeCalled();
    });

    it("triggers the onBlur callback on field blur", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");

        ReactTestUtils.Simulate.blur(field);

        expect(component.props.children.props.onBlur).toBeCalled();
    });

    it("does not show the undo button if showUndo is not set to true", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("shows the undo button if showUndo is set to true", function () {
        var component = getComponent({ showUndo: true });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
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

    it("stateful: does not show the undo button if the originalValue param is not passed in", function () {
        var originalValue = "my original value";
        var component = getComponent({
            stateless: false,
            defaultValue: originalValue
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
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
            helpClassName: "bottom right"
        });

        var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(help).toBeTruthy();
        // expect(help.getAttribute("class")).toContain("bottom right");
    });

    it("does not block resizing by default", function () {
        var component = getComponent({});
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "input-textarea__input--no-resize");
        expect(ReactTestUtils.isDOMComponent(field)).toBeFalsy();
    });

});
