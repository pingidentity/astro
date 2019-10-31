window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import FormIntegerField from "../v2";
import TestUtils from "../../../../testutil/TestUtils";

jest.dontMock("../v2");
jest.dontMock("../../form-text-field/index.js");
jest.dontMock("../../form-text-field/v2");
jest.dontMock("../../FormLabel");
jest.dontMock("../../FormError");

describe("FormIntegerField", function () {
    let callback;

    function getComponent (opts={}) {
        opts.onValueChange = jest.fn();
        return TestUtils.renderInWrapper(<FormIntegerField {...opts} />);
    }

    const getInput = component => (
        TestUtils.findRenderedDOMNodeWithDataId(component,"form-integer-field-text-field-input")
    );

    const getDownSpinner = component => (
        TestUtils.findRenderedDOMNodeWithDataId(component, "form-integer-field-down-btn")
    );

    const getMessage = component => TestUtils.findRenderedDOMNodeWithDataId(
        component, "form-integer-field-text-field-error-message"
    );

    beforeEach(function () {
        jest.useFakeTimers();
        callback = jest.fn();
    });


    it("renders component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField labelText="Default Integer Box" onValueChange={callback} />
        );

        //Expect a single checkbox to be rendered with default data-id.
        var integerNode = TestUtils.findRenderedDOMNodeWithDataId(component, "form-integer-field");
        expect(integerNode).toBeDefined();
    });

    it("test up/down key press and up/down spinner press", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int" onValueChange = {callback} value = {40} />
        );

        //Expect a single input to be renderd with initial value of 40
        var input = TestUtils.findRenderedDOMNodeWithDataId(component,"int-text-field-input");
        expect(input.value).toBe("40");

        //Test the up and down keys
        //Press the up key 9 times and expect 9 callback
        for (var i = 0; i < 9; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );
            expect(callback.mock.calls.length).toBe(1);
            expect(callback.mock.calls[0][0]).toBe(41);
            callback.mockClear();
        }

        //test non-arrow keys
        ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 37, which: 37 } );
        expect(callback.mock.calls.length).toBe(0);


        //Press the down key 3 times and expect three more callback
        for (var i = 0; i < 3; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "down arrow", keyCode: 40, which: 40 } );
            expect(callback.mock.calls.length).toBe(1);
            expect(callback.mock.calls[0][0]).toBe(39);
            callback.mockClear();
        }

        //Test the up and down spinners
        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");
        var spinnerDown = TestUtils.findRenderedDOMNodeWithDataId(component, "int-down-btn");

        //mouseDown the up arrow and expect 1 to be added to the callback
        ReactTestUtils.Simulate.mouseDown(spinnerUp);
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(41);
        jest.clearAllTimers();

        callback.mockClear();

        //mouseDown the down arrow and expect 1 to be added to callback
        ReactTestUtils.Simulate.mouseDown(spinnerDown);
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(39);
        jest.clearAllTimers();
    });

    it("disables up/down keys when in read only mode", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int" readOnly={true} onValueChange={callback} value={40} />
        );
        var input = TestUtils.findRenderedDOMNodeWithDataId(component,"int-text-field-input");
        ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );
        expect(callback).not.toBeCalled();
    });

    it("shows placeholder", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField onChange={callback} placeholder="Enter a number"/>
        );
        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.getAttribute("placeholder")).toEqual("Enter a number");
    });

    it("fires the onValueChange callback when field changes", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField onValueChange={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3" } } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it("triggers onBlur event", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField onBlur={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.blur(input);

        expect(callback.mock.calls.length).toEqual(1);
    });

    it("is limiting up/down arrows within min-max interval", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int"
                onValueChange={callback}
                max={5}
                min={3}
                value={4}
                increment={3}
            />
        );

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");
        var spinnerDown = TestUtils.findRenderedDOMNodeWithDataId(component, "int-down-btn");

        ReactTestUtils.Simulate.mouseDown(spinnerUp);

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(5);
        callback.mockClear();
        jest.clearAllTimers();

        ReactTestUtils.Simulate.mouseDown(spinnerDown);

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(3);
        jest.clearAllTimers();
    });

    it("is releasing timer tasks on mouse up", function () {
        jest.useFakeTimers();

        var component = TestUtils.renderInWrapper(
            <FormIntegerField onChange={callback} max={5} min={3} value={4} increment={3} />
        );

        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "integer-controls");
        var spinnerUp = (spinnerContainer.childNodes[0]);

        ReactTestUtils.Simulate.mouseUp(spinnerUp);

        expect(clearTimeout.mock.calls.length).toBe(1);
        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it("is autoincrementing field while spinner is pressed", function () {
        jest.useFakeTimers();

        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int" onValueChange={callback} value={1} />
        );

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");

        ReactTestUtils.Simulate.mouseDown(spinnerUp);

        // this to run the this._interval timer
        jest.runOnlyPendingTimers();
        // this to run the this._counter interval set by the expiration of the previous timer
        jest.runOnlyPendingTimers();

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("it assigns tabIndex when specified", function () {

        var noTabIndex = TestUtils.renderInWrapper(
                <FormIntegerField onChange={callback} value={1} />
            ),
            withTabIndex = TestUtils.renderInWrapper(
                <FormIntegerField onChange={callback} value={1} tabIndex={10} />
            ),
            testIntField;

        // check default tabIndex
        testIntField = TestUtils.findRenderedDOMNodeWithClass(noTabIndex, "integer-up");
        expect(testIntField.tabIndex).toBe(-1);

        // check assigned tabIndex
        testIntField = TestUtils.findRenderedDOMNodeWithClass(withTabIndex, "integer-up");
        expect(testIntField.tabIndex).toBe(10);
    });

    it("is disabled when it is specified", function () {
        var onChange = function () {};
        var helpText = "Disabled with help text";
        var component = TestUtils.renderInWrapper(
            <FormIntegerField onChange={onChange} value={1} labelHelpText={helpText} disabled={true} />
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
        expect(input.disabled).toBeTruthy();
    });

    it("the min value is used as default on spinner mouse down if provided value is NaN", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int" onValueChange={callback} />
        );

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");

        ReactTestUtils.Simulate.mouseDown(spinnerUp);
        jest.clearAllTimers();

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(0);
    });

    it("the min value is used as default on field key down if provided value is NaN", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField data-id="int" onValueChange={callback} />
        );

        var input = TestUtils.findRenderedDOMNodeWithDataId(component,"int-text-field-input");
        ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(1);
    });

    it("does trigger onValueChange for empty value in stateful component", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField onValueChange={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "" } } );
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe("");

    });

    it("will add css class to container", function () {
        var component = TestUtils.renderInWrapper(
            <FormIntegerField
                className="added"
            />
        );
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "added")).not.toBeNull();
    });

    it("hides controls", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField hideControls={true} />);

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");
        var spinnerDown = TestUtils.findRenderedDOMNodeWithDataId(component, "int-down-btn");

        expect(spinnerUp).toBeFalsy();
        expect(spinnerDown).toBeFalsy();

    });

    //Tests for isValid() method
    it("validation for integer", function () {
        expect(FormIntegerField.isValid(5)).toBe(true);
    });

    it("validation returns false for alphabetic key", function () {
        expect(FormIntegerField.isValid("r")).toBe(false);
    });

    it("validation returns false for none number", function () {
        expect(FormIntegerField.isValid("r")).toBe(false);
    });

    it("validation returns false for non-integer number", function () {
        expect(FormIntegerField.isValid(5.9)).toBe(false);
    });

    it("validation with enforce range", function () {
        expect(FormIntegerField.isValid(5, true, 0, 10)).toBe(true);
    });

    it("validation out of range", function () {
        expect(FormIntegerField.isValid(5, true, 10, 20)).toBe(false);
    });

    it("validates a value", function () {
        expect(FormIntegerField.validateInt("1234", 0, {})).toEqual(1234);
        expect(FormIntegerField.validateInt("1234a", 0, {})).toEqual("1234");
    });

    it("should not fire onValueChange when enforcing range and keying down below min", function() {
        const component = getComponent({ min: 10, max: 50, value: 10 });
        const input = getInput(component);
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });

        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    it("should not fire onValueChange when enforcing range and spinning down below min", function() {
        const component = getComponent({ min: 10, value: 10 });
        const down = getDownSpinner(component);
        ReactTestUtils.Simulate.mouseDown(down);

        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    // make sure these make it into the v4 tests
    it("should not fire onValueChange when enforcing range and keying down below min", function() {
        const component = getComponent({ min: 10, max: 50, value: 10 });
        const input = getInput(component);
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });

        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    it("should not fire onValueChange when enforcing range and spinning down below min", function() {
        const component = getComponent({ min: 10, value: 10 });
        const down = getDownSpinner(component);
        ReactTestUtils.Simulate.mouseDown(down);

        expect(component.props.children.props.onValueChange).not.toBeCalled();
    });

    it("shows warning and updates value to min when too low on min", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
            outOfRangeErrorMessage: "Oops",
        });
        const input = getInput(component);

        // no warning yet
        ReactTestUtils.Simulate.change(input, { target: { value: 5 } });
        let message = getMessage(component);
        expect(message).toBeFalsy();

        // warning now
        ReactTestUtils.Simulate.blur(input);
        message = getMessage(component);
        expect(message).toBeTruthy();
        expect(input.value).toBe("10");
    });

    it("doesn't show error until blurring when too low and not enforcing", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
            outOfRangeErrorMessage: "Oops",
            enforceRange: false,
        });
        const input = getInput(component);

        // no error yet
        ReactTestUtils.Simulate.change(input, { target: { value: 5 } });
        expect(getMessage(component)).toBeFalsy();

        // error now
        ReactTestUtils.Simulate.blur(input);
        expect(getMessage(component)).toBeTruthy();
        expect(input.value).toBe("5");
    });

    it("clears warning on focus and blur", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
            outOfRangeErrorMessage: "Oops",
        });
        const input = getInput(component);

        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });
        expect(getMessage(component)).toBeTruthy();

        ReactTestUtils.Simulate.blur(input);
        expect(getMessage(component)).toBeFalsy();

        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });
        expect(getMessage(component)).toBeTruthy();

        ReactTestUtils.Simulate.focus(input);
        expect(getMessage(component)).toBeFalsy();
    });

    it("clears error when value is fixed", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
            outOfRangeErrorMessage: "Oops",
            enforceRange: false,
        });
        const input = getInput(component);

        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });
        expect(getMessage(component)).toBeTruthy();

        ReactTestUtils.Simulate.change(input, { target: { value: 20 } });
        expect(getMessage(component)).toBeFalsy();
    });

    it("doesn't clear error on focus", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
            outOfRangeErrorMessage: "Oops",
            enforceRange: false,
        });
        const input = getInput(component);

        ReactTestUtils.Simulate.keyDown(input, { keyCode: 40 });
        expect(getMessage(component)).toBeTruthy();

        ReactTestUtils.Simulate.focus(input);
        expect(getMessage(component)).toBeTruthy();
    });

    it("lets you clear out the field even while enforcing", function() {
        const component = getComponent({
            min: 10,
            max: 50,
            initialState: { value: 10 },
        });
        const input = getInput(component);

        ReactTestUtils.Simulate.change(input, { target: { value: "" } });
        ReactTestUtils.Simulate.blur(input);
        expect(input.value).toBe("");
    });

    it("undoes", function() {
        const component = getComponent({
            initialValue: 20,
            initialState: { value: 10 },
            showUndo: true,
        });
        const undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");
        ReactTestUtils.Simulate.click(undo);

        expect(getInput(component).value).toBe("20");
    });

});
