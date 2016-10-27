window.__DEV__ = true;

jest.dontMock("./common.jsx");
jest.dontMock("../v1.jsx");
jest.dontMock("../../FormError.jsx");

describe("FormTextArea", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextArea = require("../v1.jsx"),
        _ = require("underscore"),
        CommonTests = require("./common.jsx");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            onBlur: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormTextArea {...props} />);
    }

    CommonTests(getComponent);

    it("shows field as required", function () {
        var component = getComponent({ isRequired: true });

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("shows the undo icon when text changes", function () {
        var originalValue = "my original value";
        var component = getComponent({
            defaultValue: originalValue,
            originalValue: originalValue
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("reverts the input text to its original value if the undo icon is clicked", function () {
        var originalValue = "my original value";
        var component = getComponent({
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

    it("fires the onValueChange callback when clicking on the undo icon", function () {
        var originalValue = "my original value";
        var component = getComponent({
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

    it("warns of deprecated v1 when not in production", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "** This version of the FormTextArea is deprecated and will be removed in the next release");
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
