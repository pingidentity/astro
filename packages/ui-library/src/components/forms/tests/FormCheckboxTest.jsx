window.__DEV__ = true;

jest.dontMock("../FormCheckbox.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../FormLabel.jsx");
jest.dontMock("../FormError.jsx");

describe("FormCheckbox", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        FormCheckbox= require("../FormCheckbox.jsx"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormCheckbox {...opts} />);
    }

    it("works with no callbacks", function () {
        var component = getComponent({
            onChange: null,
            onValueChange: null,
        });

        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox");

        ReactTestUtils.Simulate.change(checkbox, { target: { checked: true } });
    });

    it("renders with default data-id", function () {
        var component = getComponent();

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox-container")).toBeDefined();
    });

    it("uses 'data-id' to set data-id", function () {
        var component = getComponent({
            "data-id": "my-new-id"
        });

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "my-new-id-container")).toBeTruthy();
    });

    it("test default render with minimum required params", function () {
        var component = getComponent();

        //Expect a single checkbox to be rendered with default data-id.
        var checkbox = TestUtils.scryRenderedDOMNodesWithDataId(component, "form-checkbox");
        expect(checkbox.length).toEqual(1);
        expect(checkbox[0].checked).toBe(false); //expect not to be checked

        //Expect label container to not render when no label is provided
        var label = TestUtils.scryRenderedDOMNodesWithClass(component, "label-text");
        expect(label.length).toEqual(0);
    });

    it("test pre-checked box with custom data-id and label", function () {
        var component = getComponent({
            checked: true,
            label: "pre-check",
            "data-id": "checkbox-test"
        });

        //Expect single element with custom data-id
        var checkbox = TestUtils.scryRenderedDOMNodesWithDataId(component, "checkbox-test");
        expect(checkbox.length).toEqual(1);

        //expect to be checked
        expect(checkbox[0].checked).toBe(true);

        //expect properly titled label
        var label = TestUtils.scryRenderedDOMNodesWithClass(component, "label-text");
        expect(label[0].childNodes[0].textContent).toEqual("pre-check");
    });

    it("provides name and value", function () {
        var component = getComponent({
            name: "my name",
            value: "my value"
        });
        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox");

        expect(checkbox.getAttribute("value")).toEqual("my value");
    });

    it("simulate change event", function () {
        var component = getComponent({
            onValueChange: jest.genMockFunction()
        });
        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox");

        //expect default unchecked
        expect(checkbox.checked).toBe(false);

        ReactTestUtils.Simulate.change(checkbox, { target: { checked: true } });

        //expect callback
        expect(component.props.onChange).toBeCalled();
        expect(component.props.onValueChange).toBeCalledWith(true);
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("check help tootip", function () {
        // var component = getComponent({
        //     label: "Port Number",
        //     labelHelpText: "Enter a port number"
        // });

        // var tooltip = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        // expect(tooltip.textContent).toEqual("Enter a port number");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("is disabled when it is specified", function () {
        var component = getComponent({
            label: "Disable with help text",
            labelHelpText: "Disabled with help text",
            disabled: true
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
        expect(input.disabled).toBeTruthy();

        // var tooltip = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        // expect(tooltip.textContent).toEqual("Disabled with help text");
    });

    it("renders with error message when specified", function () {
        var errorMessage = "some error";
        var component = getComponent({ errorMessage: errorMessage });

        var error = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox-error-message");
        expect(error).toBeTruthy();
        expect(error.textContent).toEqual(errorMessage);

        var icon = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox-error-message-icon");
        expect(icon).toBeTruthy();
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

});
