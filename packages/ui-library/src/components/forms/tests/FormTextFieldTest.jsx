window.__DEV__ = true;

jest.dontMock("../FormTextField.jsx");

describe("FormTextField", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormTextField = require("../FormTextField.jsx");

    it("renders the component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "input-text");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
        // make sure that the field is not required by default
        var elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("shows field as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} isRequired={true} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("shows the default value", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} defaultValue={defaultValue} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(field.value).toEqual(defaultValue);
    });

    it("shows placeholder", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} defaultValue={defaultValue} placeholder="edit me"/>
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(field.getAttribute("placeholder")).toEqual("edit me");
    });

    it("respects value over defaultValue and state precedence", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} defaultValue={'my random value'} value={'my value'}/>
        );

        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(field.value).toEqual("my value");

        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        expect(field.value).toEqual("my value");
    });

    it("fires the onValueChange callback when field changes", function () {
        var handleChange = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);

    });

    it("fire onChange validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange}
                           validatorTrigger="onChange" />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(1);
    });

    it("do not fire validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(0);
    });

    it("fire onBlur validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        ReactTestUtils.Simulate.blur(field);
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(1);
    });

    it("fire onFocus callback when field gains focus", function () {
        var handleFocus = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'} onFocus={handleFocus} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.focus(field);
        expect(handleFocus.mock.calls.length).toBe(1);
    });

    it("fire onKeyPress when key is pressed", function () {
        var handleKeyPress = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                    referenceName={'test'}
                    onKeyPress={handleKeyPress} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyPress(field, { key: "Enter", keyCode: 13, which: 13 });
        expect(handleKeyPress.mock.calls.length).toBe(1);
        expect(handleKeyPress.mock.calls[0][0]).toBe(13);
        expect(handleKeyPress.mock.calls[0][1].which).toBe(13);
    });

    it("does not show the undo button if the originalValue param is not passed in", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("shows the undo icon when text changes", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("reverts the input text to its original value if the undo icon is clicked", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
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
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
        );
        // make the undo icon appear by changing the field
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        // the field change will trigger the callback, clear it since we are not testing for it
        handleChange.mockClear();
        // check that the icon is actually there
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon
        ReactTestUtils.Simulate.click(undo);
        // now we can verify that the callback gets triggered
        expect(handleChange.mock.calls.length).toBe(1);

    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField errorMessage={errorMessage} />
        );

        var errorDiv = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

});
