window.__DEV__ = true;

jest.dontMock("../v2.jsx");
jest.dontMock("../../form-text-field/index.js");
jest.dontMock("../../form-text-field/v2.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormError.jsx");

describe("FormIntegerField", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        FormIntegerField= require("../v2.jsx"),
        TestUtils = require("../../../../testutil/TestUtils"),
        callback;

    beforeEach(function () {
        callback = jest.genMockFunction();
    });


    it("test default render with simple label", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField labelText = "Default Integer Box" onValueChange = {callback} />
        );

        //Expect a single checkbox to be rendered with default data-id.
        var integerNode = TestUtils.findRenderedDOMNodeWithDataId(component,"form-integer-field");
        expect(integerNode).toBeDefined();

        // check the default value
        var stateless = component.refs.formIntegerFieldStateless;
        expect(stateless.props.value).toEqual("");

        //Expect properly named labelText
        var textField = stateless.refs.formTextField;
        expect(textField.props.labelText).toBe("Default Integer Box");
    });

    it("test up/down key press and up/down spinner press", function () {
        var component = ReactTestUtils.renderIntoDocument(
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

    it("shows field as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange = {callback} isRequired={true} />
        );

        var stateless = component.refs.formIntegerFieldStateless;
        var textField = stateless.refs.formTextField;
        expect(textField.props.isRequired).toBe(true);
    });

    it("shows placeholder", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} placeholder="Enter a number"/>
        );
        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.getAttribute("placeholder")).toEqual("Enter a number");
    });

    it("fires the onValueChange callback when field changes", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3" } } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField errorMessage={errorMessage} onValueChange={callback} />
        );

        var stateless = component.refs.formIntegerFieldStateless;
        var textField = stateless.refs.formTextField;
        expect(textField.props.errorMessage).toEqual("help!");
    });

    it("triggers onBlur event", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onBlur={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.blur(input);

        expect(callback.mock.calls.length).toEqual(1);
    });

    it("is not triggering onValueChange callback on invalid input in stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} controlled={false} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "A" } } );

        expect(callback).not.toBeCalled();
    });



    it("is not triggering onChange callback when max limit exceeded", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} max={5} controlled={false} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "6" } } );

        expect(callback).not.toBeCalled();
    });

    it("is triggering onChange callback when max limit exceeded and range is not enforced", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} max={5} enforceRange={false} controlled={false} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "6" } } );

        expect(callback).toBeCalledWith(6);
    });

    it("is limiting up/down arrows within min-max interval", function () {
        var component = ReactTestUtils.renderIntoDocument(
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
        clearTimeout = jest.genMockFunction(); //eslint-disable-line
        clearInterval = jest.genMockFunction(); //eslint-disable-line

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} max={5} min={3} value={4} increment={3} />
        );

        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "integer-controls");
        var spinnerUp = (spinnerContainer.childNodes[0]);

        ReactTestUtils.Simulate.mouseUp(spinnerUp);

        expect(clearTimeout).toBeCalled();
        expect(clearInterval).toBeCalled();
    });

    it("is autoincrementing field while spinner is pressed", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField data-id="int" onValueChange={callback} value={1} />
        );

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");

        ReactTestUtils.Simulate.mouseDown(spinnerUp);

        // this to run the this._interval timer
        jest.runOnlyPendingTimers();
        // this to run the this._counter interval set by the expiration of the previous timer
        jest.runOnlyPendingTimers();

        expect(callback.mock.calls.length).toEqual(2);
    });

    it("it assigns tabIndex when specified", function () {

        var noTabIndex = ReactTestUtils.renderIntoDocument(
                <FormIntegerField onChange={callback} value={1} />
            ),
            withTabIndex = ReactTestUtils.renderIntoDocument(
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
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={onChange} value={1} labelHelpText={helpText} disabled={true} />
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
        expect(input.disabled).toBeTruthy();
    });

    it("the min value is used as default on spinner mouse down if provided value is NaN", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField data-id="int" onValueChange={callback} />
        );

        var spinnerUp = TestUtils.findRenderedDOMNodeWithDataId(component, "int-up-btn");

        ReactTestUtils.Simulate.mouseDown(spinnerUp);
        jest.clearAllTimers();

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(0);
    });

    it("the min value is used as default on field key down if provided value is NaN", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField data-id="int" onValueChange={callback} />
        );

        var input = TestUtils.findRenderedDOMNodeWithDataId(component,"int-text-field-input");
        ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(1);
    });

    it("show initial value if provided to stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField initialValue="123" onValueChange={callback} controlled={false} />
        );

        //Expect a single checkbox to be rendered with default data-id.
        var integerNode = TestUtils.findRenderedDOMNodeWithDataId(component,"form-integer-field");
        expect(integerNode).toBeDefined();

        // check the default value
        var stateless = component.refs.formIntegerFieldStateful.refs.stateless;
        expect(stateless.props.value).toEqual("123");
    });

    it("does not trigger onValueChange for non integer value in stateless component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField value="" onValueChange={callback} controlled={false} />
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3.3" } } );
        expect(callback.mock.calls.length).toBe(0);
    });

    it("does trigger onValueChange for valid value in stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} controlled={false} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3" } } );
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(3);

    });

    it("does trigger onValueChange for empty value in stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onValueChange={callback} controlled={false} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "" } } );
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe("");

    });

    it("toggle reveal in stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField value={3}
                    onValueChange={callback}
                    controlled={false}
                    showReveal={true}
                    maskValue={true} />
        );

        var stateful = component.refs.formIntegerFieldStateful;
        var stateless = stateful.refs.stateless;

        expect(stateless.props.reveal).toEqual(false);

        stateful._toggleReveal();
        expect(stateless.props.reveal).toEqual(true);
    });

    it("undo in stateful component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField initialValue={3}
                    onValueChange={callback}
                    controlled={false}
                    showUndo={true} />
        );

        var stateful = component.refs.formIntegerFieldStateful;
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        // verify the initial value
        expect(input.value).toEqual("3");

        // update the value and verify it
        ReactTestUtils.Simulate.change(input, { target: { value: "4" } } );
        expect(input.value).toEqual("4");

        // undo and verify the initial value
        stateful._handleUndo();
        expect(input.value).toEqual("3");
    });

});
