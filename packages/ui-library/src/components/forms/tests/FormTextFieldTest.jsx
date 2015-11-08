window.__DEV__ = true;

jest.dontMock("../FormTextField.jsx");
jest.dontMock("classnames");
jest.dontMock("underscore");
jest.dontMock("../../../testutil/TestUtils");

describe("FormTextField", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        FormTextField = require("../FormTextField.jsx");

    it("renders the component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} />
            /* jshint ignore:end */
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-text");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
        // make sure that the field is not required by default
        var elements = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("shows field as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} isRequired={true} />
            /* jshint ignore:end */
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("shows the default value", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} defaultValue={defaultValue} />
            /* jshint ignore:end */
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        expect(field.getDOMNode().value).toEqual(defaultValue);
    });

    it("shows placeholder", function () {
        var defaultValue = "my random value";
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} defaultValue={defaultValue} placeholder="edit me"/>
            /* jshint ignore:end */
        );
        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        expect(field.getDOMNode().getAttribute("placeholder")).toEqual("edit me");
    });

    it("respects value over defaultValue and state precedence", function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} defaultValue={'my random value'} value={'my value'}/>
            /* jshint ignore:end */
        );

        // verify that the component is rendered
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        expect(field.getDOMNode().value).toEqual("my value");

        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } });
        expect(field.getDOMNode().value).toEqual("my value");
    });

    it("fires the onValueChange callback when field changes", function () {
        var handleChange = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);

    });

    it("fire onChange validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange}
                           validatorTrigger="onChange" />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(1);
    });

    it("do not fire validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(0);
    });

    it("fire onBlur validatorTrigger when field changes", function () {
        var handleChange = jest.genMockFunction();
        var validator = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField referenceName={'test'} validator={validator} onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        ReactTestUtils.Simulate.blur(field);
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(1);
    });

    it("does not show the undo button if the originalValue param is not passed in", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeFalsy();
    });

    it("shows the undo icon when text changes", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        var undo = TestUtils.findRenderedDOMComponentWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
    });

    it("reverts the input text to its original value if the undo icon is clicked", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
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
            /* jshint ignore:start */
            <FormTextField
                referenceName={'test'}
                defaultValue={originalValue}
                originalValue={originalValue}
                onValueChange={handleChange} />
            /* jshint ignore:end */
        );
        // make the undo icon appear by changing the field
        var field = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
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
            /* jshint ignore:start */
            <FormTextField errorMessage={errorMessage} />
            /* jshint ignore:end */
        );

        var errorDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, "tooltip-text");
        expect(errorDiv.getDOMNode().textContent).toBe(errorMessage);
    });

});
