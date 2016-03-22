window.__DEV__ = true;

jest.dontMock("../FormIntegerField.jsx");
jest.dontMock("../FormTextField.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");

describe("FormIntegerField", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        FormIntegerField= require("../FormIntegerField.jsx"),
        TestUtils = require("../../../testutil/TestUtils"),
        callback;

    beforeEach(function () {
        callback = jest.genMockFunction();
    });


    it("test default render with simple label", function () {

        var component = ReactTestUtils.renderIntoDocument(

            <FormIntegerField labelText = "Default Integer Box" onChange = {callback} />

        );

        //Expect a single checkbox to be rendered with default data-id.
        var integer = TestUtils.scryRenderedDOMNodesWithDataId(component,"formIntegerField");
        expect(integer.length).toEqual(1);
        var input = integer[0];
        expect(input.value).toBe(""); //expect no value

        //Expect properly named labelText
        var label = TestUtils.findRenderedDOMNodeWithClass(component,"label-text");
        expect(label.children[0].textContent).toBe("Default Integer Box");


    });

    it("test up/down key press and up/down spinner press", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange = {callback} value = {40} />
        );

        //Expect a single input to be renderd with initial value of 40
        var integer = TestUtils.scryRenderedDOMNodesWithDataId(component,"formIntegerField");
        var input = integer[0];
        expect(input.value).toBe("40");

        //Test the up and down keys
        //Press the up key 9 times and expect 9 callback
        for (var i = 0; i < 9; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );
        }

        //test non-arrow keys
        ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 37, which: 37 } );

        expect(callback.mock.calls.length).toBe(9);

        //Press the down key 3 times and expect three more callback
        for (var i = 0; i < 3; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "down arrow", keyCode: 40, which: 40 } );
        }
        expect(callback.mock.calls.length).toBe(12);

        //Test the up and down spinners
        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "up-down-spinner");
        var spinnerUp = (spinnerContainer.childNodes[0]);
        var spinnerDown = (spinnerContainer.childNodes[1]);

        //mouseDown the up arrow and expect 1 to be added to the callback
        ReactTestUtils.Simulate.mouseDown(spinnerUp);
        expect(callback.mock.calls.length).toBe(13);

        //mouseDown the down arrow and expect 1 to be added to callback
        ReactTestUtils.Simulate.mouseDown(spinnerDown);
        expect(callback.mock.calls.length).toBe(14);

    });

    it("shows field as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange = {callback} isRequired={true} />
        );
        // verify that the component is rendered
        var integer = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(integer)).toBeTruthy();
    });

    it("shows placeholder", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} placeholder="Enter a number"/>
        );
        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.getAttribute("placeholder")).toEqual("Enter a number");
    });

    it("fires the onChange callback when field changes", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3" } } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField errorMessage={errorMessage} onChange={callback} />
        );

        var errorDiv = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

    it("triggers onBlur event", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onBlur={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.blur(input, { target: { value: "3" } } );

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual("3");
    });

    it("is not triggering onChange callback on invalid input", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "A" } } );

        expect(callback).not.toBeCalled();
    });

    it("is not triggering onChange callback when max limit exceeded", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} max={5} />
        );
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "6" } } );

        expect(callback).not.toBeCalled();
    });

    it("is limiting up/down arrows within min-max interval", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} max={5} min={3} value={4} increment={3} />
        );

        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "up-down-spinner");
        var spinnerUp = (spinnerContainer.childNodes[0]);
        var spinnerDown = (spinnerContainer.childNodes[1]);

        ReactTestUtils.Simulate.mouseDown(spinnerUp);

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(5);

        ReactTestUtils.Simulate.mouseDown(spinnerDown);

        expect(callback.mock.calls.length).toEqual(2);
        expect(callback.mock.calls[1][0]).toEqual(3);

    });

    it("is releasing timer tasks on mouse up", function () {
        clearTimeout = jest.genMockFunction(); //eslint-disable-line
        clearInterval = jest.genMockFunction(); //eslint-disable-line

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} max={5} min={3} value={4} increment={3} />
        );

        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "up-down-spinner");
        var spinnerUp = (spinnerContainer.childNodes[0]);

        ReactTestUtils.Simulate.mouseUp(spinnerUp);

        expect(clearTimeout).toBeCalled();
        expect(clearInterval).toBeCalled();
    });

    it("is autoincrementing field while spinner is pressed", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} value={1} />
        );

        var spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "up-down-spinner");
        var spinnerUp = (spinnerContainer.childNodes[0]);

        ReactTestUtils.Simulate.mouseDown(spinnerUp);

        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();

        expect(callback.mock.calls.length).toEqual(2);
    });

});
