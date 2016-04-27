window.__DEV__ = true;

jest.dontMock("../FormCheckbox.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../FormLabel.jsx");

describe("FormCheckbox", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        FormCheckbox= require("../FormCheckbox.jsx"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormCheckbox {...opts} />);
    }

    it("uses 'data-id' to set data-id", function () {
        var component = getComponent({
            "data-id": "my-new-id"
        });

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "my-new-id")).toBeTruthy();
    });

    it("test default render with minimum required params", function () {
        var component = getComponent();

        //Expect a single checkbox to be rendered with default data-id.
        var checkbox = TestUtils.scryRenderedDOMNodesWithDataId(component, "form-checkbox");
        expect(checkbox.length).toEqual(1);
        expect(checkbox[0].checked).toBe(false); //expect not to be checked

        //Expect the label text to be blank
        var label = TestUtils.scryRenderedDOMNodesWithClass(component, "label-text");
        expect(label[0].childNodes.length).toEqual(0);
    });

    it("test pre-checked box with custom id and label", function () {
        var component = getComponent({
            checked: true,
            label: "pre-check",
            id: "checkbox-test"
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

    it("simulate change event", function () {
        var component = getComponent();
        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox");

        //expect default unchecked
        expect(checkbox.checked).toBe(false);

        ReactTestUtils.Simulate.change(checkbox);

        //expect callback
        expect(component.props.onChange).toBeCalled();
    });

    it("check help tootip", function () {
        var component = getComponent({
            labelHelpText: "Enter a port number"
        });

        var tooltip = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        expect(tooltip.textContent).toEqual("Enter a port number");
    });
});
