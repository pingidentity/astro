window.__DEV__ = true;

jest.dontMock("./common.jsx");
jest.dontMock("../v1.jsx");
jest.dontMock("../index.js");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../../tooltips/HelpHint.jsx");

describe("FormTextField", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextField = require("../v1.jsx"),
        CommonTests = require("./common.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
        });

        return ReactTestUtils.renderIntoDocument(<FormTextField {...opts} />);
    }

    CommonTests(getComponent);

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
        var onBlur = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField referenceName={'test'}
                           validator={validator}
                           onValueChange={handleChange}
                           onBlur={onBlur} />
        );
        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(field, { target: { value: "abc" } } );
        ReactTestUtils.Simulate.blur(field);
        expect(handleChange.mock.calls.length).toBe(1);
        expect(validator.mock.calls.length).toBe(1);
        expect(onBlur).toBeCalled();
    });

    it("fire onKeyPress when key is pressed", function () {
        var handleKeyPress = jest.genMockFunction();
        var component = getComponent({
            onKeyPress: handleKeyPress
        });

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyPress(field, { key: "Enter", keyCode: 13, which: 13 });
        expect(handleKeyPress.mock.calls.length).toBe(1);
        expect(handleKeyPress.mock.calls[0][0]).toBe(13);
        expect(handleKeyPress.mock.calls[0][1].which).toBe(13);
    });

    it("does not show the undo button if the originalValue param is not passed in", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var component = getComponent({
            defaultValue: originalValue,
            onValueChange: handleChange
        });

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

    it("renders help tooltip", function () {
        var component = getComponent({
            labelText: "some label",
            labelHelpText: "some help",
            referenceName: "text"
        });
        var help = TestUtils.findRenderedDOMNodeWithDataId(component, "text_helptooltip");

        expect(help.textContent).toBe("some help");
    });

    it("renders custom className", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField className="extra" />
        );

        var test = TestUtils.findRenderedDOMNodeWithDataId(component, "formTextField_label");

        expect(test.getAttribute("class")).toContain("extra");
    });

    it("renders save control", function () {
        var callback = jest.genMockFunction();
        var component = getComponent({
            referenceName: "formTextinput",
            save: callback,
            originalValue: "value"
        });

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "formTextinput");

        ReactTestUtils.Simulate.change(input, {
            target: {
                value: "abc"
            }
        });

        //make sure save control was rendered
        var save = TestUtils.findRenderedDOMNodeWithDataId(component, "save");

        ReactTestUtils.Simulate.click(save, {});

        expect(callback).toBeCalledWith("abc");
    });

    it("should receive props errorMessage from parent component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                errorMessage="abc"
                validatorTrigger="onChange"/>
        );
        var inputField = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(inputField, { target: { value: "abc" } } );

        var field = TestUtils.findRenderedDOMNodeWithTag(component, "label");
        expect(field.getAttribute("class")).toContain("form-error");
    });

    it("should fire the handleUndo event when click on undo", function () {
        var handleChange = jest.genMockFunction();
        var originalValue = "my original value";
        var defaultValue = "default value";
        var component = ReactTestUtils.renderIntoDocument(
            <FormTextField
                referenceName={'test'}
                defaultValue={defaultValue}
                value={defaultValue}
                onChange={handleChange}
                originalValue={originalValue}
                forceExternalState={true}
            />
        );
        // check that the icon is actually there
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        expect(ReactTestUtils.isDOMComponent(undo)).toBeTruthy();
        // click on the undo icon
        ReactTestUtils.Simulate.click(undo);
        // now we can verify that the callback gets triggered
        expect(handleChange.mock.calls.length).toBe(1);
    });

    //TODO: remove when v1 no longer supported
    it("does not log deprecate warning when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
