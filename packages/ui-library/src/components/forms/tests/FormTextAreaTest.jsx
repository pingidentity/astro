window.__DEV__ = true;

jest.dontMock("../FormTextArea.jsx");
jest.dontMock("classnames");
jest.dontMock("underscore");
jest.dontMock("../../../testutil/TestUtils");

describe("FormTextArea", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        FormTextArea = require("../FormTextArea.jsx");

    it("renders the component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} />
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-textarea");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
        // make sure that the field is not required by default
        var elements = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("shows field as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} isRequired={true} />
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("shows the default value", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} defaultValue={defaultValue} />
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        expect(field.getDOMNode().value).toContain(defaultValue);
    });

    it("shows placeholder", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} defaultValue={defaultValue} placeholder="edit me"/>
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        expect(field.getDOMNode().getAttribute("placeholder")).toEqual("edit me");
    });

    it("respects value over defaultValue and state precedence", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} defaultValue={'my random value'} value={'my value'}/>
        );

        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        expect(field.getDOMNode().value).toContain("my value");

        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        expect(field.getDOMNode().value).toContain("my value");
    });

    it("fires the onValueChange callback when field changes", function () {
        var handleChange = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea referenceName={'test'} onValueChange={handleChange} />
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);

    });

    it("does not show the undo button if the originalValue param is not passed in", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea
                referenceName={'test'}
                defaultValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("shows the undo icon when text changes", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("reverts the input text to its original value if the undo icon is clicked", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        // check that the undo icon gets displayed
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon and verify that the field gets reverted to the original value
        ReactTestUtils.Simulate.click(undo);
        expect(field.getDOMNode().value).toEqual(originalValue);
        // now check that the undo icon dissapeared
        undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("fires the onValueChange callback when clicking on the undo icon", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        // make the undo icon appear by changing the field
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "textarea");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        // the field change will trigger the callback, clear it since we are not testing for it
        handleChange.mockClear();
        // check that the icon is actually there
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon
        ReactTestUtils.Simulate.click(undo);
        // now we can verify that the callback gets triggered
        expect(handleChange.mock.calls.length).toBe(1);

    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormTextArea errorMessage={errorMessage} />
        );

        var errorDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, "tooltip-text");
        expect(errorDiv.getDOMNode().textContent).toBe(errorMessage);
    });
});
