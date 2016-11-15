
jest.dontMock("../v2.jsx");
jest.dontMock("./common.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../../tooltips/HelpHint.jsx");

describe("FormTextArea", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextArea = require("../v2.jsx"),
        _ = require("underscore"),
        CommonTests = require("./common.jsx");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            controlled: true,
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            onBlur: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormTextArea {...props} />);
    }

    CommonTests(getComponent);

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
        var component = getComponent({ controlled: false }),
            componentRef = component.refs.FormTextAreaStateful;

        expect(componentRef.state.value).toBe("");
    });

    it("stateful: does not show the undo button if the originalValue param is not passed in", function () {
        var originalValue = "my original value";
        var component = getComponent({
            controlled: false,
            defaultValue: originalValue
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("stateful: shows the undo icon when text changes", function () {
        var originalValue = "my original value";
        var component = getComponent({
            controlled: false,
            defaultValue: originalValue,
            originalValue: originalValue
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("stateful: reverts the input text to its original value if the undo icon is clicked", function () {
        var originalValue = "my original value";
        var component = getComponent({
            controlled: false,
            defaultValue: originalValue,
            originalValue: originalValue
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
            controlled: false,
            defaultValue: originalValue,
            originalValue: originalValue
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

    it("shows labelHelpText with the labelClassName applied", function () {
        var helpText = "help!";
        var component = getComponent({
            labelText: "label",
            labelHelpText: helpText,
            helpClassName: "bottom right"
        });

        var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(help).toBeTruthy();
        expect(help.getAttribute("class")).toContain("bottom right");
    });
});
