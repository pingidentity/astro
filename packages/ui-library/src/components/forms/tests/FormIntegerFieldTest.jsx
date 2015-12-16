window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../FormIntegerField.jsx");
jest.dontMock("../FormTextField.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("underscore");
jest.dontMock("classnames");

describe("FormIntegerField", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
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
        var integer = TestUtils.scryRenderedDOMComponentsWithDataId(component,"formIntegerField");
        expect(integer.length).toEqual(1);
        var input = integer[0].getDOMNode();
        expect(input.value).toBe(""); //expect no value

        //Expect properly named labelText
        var label = ReactTestUtils.findRenderedDOMComponentWithClass(component,"label-text");
        expect(label.getDOMNode().children[0].innerHTML).toBe("Default Integer Box");


    });
    it("test up/down key press and up/down spinner press", function () {
        var component = ReactTestUtils.renderIntoDocument(

            <FormIntegerField onChange = {callback} value = {40}/>

        );

        //Expect a single input to be renderd with initial value of 40
        var integer = TestUtils.scryRenderedDOMComponentsWithDataId(component,"formIntegerField");
        var input = integer[0].getDOMNode();
        expect(input.value).toBe("40");

        //Test the up and down keys
        //Press the up key 9 times and expect 9 callback
        for (var i = 0; i < 9; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "up arrow", keyCode: 38, which: 38 } );
        }
        expect(callback.mock.calls.length).toBe(9);

        //Press the down key 3 times and expect three more callback
        for (var i = 0; i < 3; i = i + 1) {
            ReactTestUtils.Simulate.keyDown(input, { key: "down arrow", keyCode: 40, which: 40 } );
        }
        expect(callback.mock.calls.length).toBe(12);

        //Test the up and down spinners
        var spinnerContainer = ReactTestUtils.findRenderedDOMComponentWithClass(component, "up-down-spinner");
        var spinnerUp = (spinnerContainer.getDOMNode().childNodes[0]);
        var spinnerDown = (spinnerContainer.getDOMNode().childNodes[1]);

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
        var integer = ReactTestUtils.findRenderedDOMComponentWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(integer)).toBeTruthy();
    });

    it("shows placeholder", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} placeholder="Enter a number"/>
        );
        // verify that the component is rendered
        var input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        expect(input.getDOMNode().getAttribute("placeholder")).toEqual("Enter a number");
    });

    it("fires the onChange callback when field changes", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField onChange={callback} />
        );
        var input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        ReactTestUtils.Simulate.change(input, { target: { value: "3" } } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormIntegerField errorMessage={errorMessage} onChange={callback} />
        );

        var errorDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, "tooltip-text");
        expect(errorDiv.getDOMNode().textContent).toBe(errorMessage);
    });
});
