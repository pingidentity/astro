module.exports = function (getComponent) {
    var ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        HelpHint = require("../../../tooltips/HelpHint.jsx");

    //XXX: Once v1 is deprecated, move all this into v2Tests.jsx

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
};
