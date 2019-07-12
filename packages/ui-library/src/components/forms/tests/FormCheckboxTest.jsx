window.__DEV__ = true;

jest.dontMock("../FormCheckbox");
jest.dontMock("../../tooltips/HelpHint");
jest.dontMock("../FormLabel");
jest.dontMock("../FormError");

import { shallow } from "enzyme";

describe("FormCheckbox", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        FormCheckbox= require("../FormCheckbox"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.fn(),
            onValueChange: jest.fn()
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
        const callback = jest.fn();
        var component = getComponent({
            onValueChange: value => callback(value)
        });
        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox");

        //expect default unchecked
        expect(checkbox.checked).toBe(false);

        ReactTestUtils.Simulate.change(checkbox, { target: { checked: true } });

        //expect callback
        expect(component.props.onChange).toBeCalled();
        expect(callback).toBeCalledWith(true);
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

    it("passes stacked and inline props to className", () => {
        const component = getComponent({ stacked: true, inline: true });

        const container = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox-container");
        const inline = TestUtils.scryRenderedDOMNodesWithClass(component, "inline");
        const stacked = TestUtils.scryRenderedDOMNodesWithClass(component, "stacked");

        // make sure only one exists of each
        expect(inline.length).toEqual(1);
        expect(stacked.length).toEqual(1);

        //make sure className is on the container
        expect(container).toEqual(inline[0]);
        expect(container).toEqual(stacked[0]);
    });

    it("renders conditional content when conditionalContent prop is passed in and checked is true", () => {
        const component = shallow(
            <FormCheckbox
                checked
                conditionalContent={<div id="SNAAAAAARF" />}
            />
        );

        const conditional = component.find("#SNAAAAAARF");

        expect(conditional.exists()).toEqual(true);
    });

    it("does not render conditional content when conditionalContent prop is passed in and checked is false", () => {
        const component = shallow(
            <FormCheckbox
                checked={false}
                conditionalContent={<div id="SNAAAAAARF" />}
            />
        );

        const conditional = component.find("#SNAAAAAARF");

        expect(conditional.exists()).toEqual(false);
    });

});
