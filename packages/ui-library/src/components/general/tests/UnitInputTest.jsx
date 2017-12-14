window.__DEV__ = true;

jest.dontMock("moment");
jest.dontMock("../UnitInput");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/form-text-field/v2");

describe("UnitInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ReactDOM = require("react-dom"),
        UnitInput = require("../UnitInput"),
        _ = require("underscore"),
        onTextValueChange = jest.genMockFunction(),
        onDropdownValueChange = jest.genMockFunction(),
        component;
        
    var options = [
        { label: "Minute(s)", value: "Minute(s)" },
        { label: "Hour(s)", value: "Hour(s)" },
        { label: "Day(s)", value: "Day(s)" },
        { label: "Week(s)", value: "Week(s)" },
        { label: "Year(s)", value: "Year(s)" }
    ];

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <UnitInput onDropdownValueChange={onDropdownValueChange}
                       onTextValueChange={onTextValueChange}
                       {...props} />
        );
    }

    beforeEach(function () {
        onTextValueChange.mockClear();
        onDropdownValueChange.mockClear();
    });
    
    it("renders the component", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             selectedOption: options[0] });

        // verify that the component is rendered
        var input = ReactDOM.findDOMNode(component);
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
    });
    
    it("verify default data-id", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             selectedOption: options[0] });
        expect(component.props["data-id"]).toBe("unit-input");
        // expect(TestUtils.findRenderedDOMNodeWithDataId(component, "unit-input")).toBeTruthy();
    });
    
    it("accepts custom data-id", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             "data-id": "my-custom-select",
                             selectedOption: options[0] });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "my-custom-select")).toBeTruthy();
    });

    it("accepts classsname", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0] });
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "custom-container-class")).toBeTruthy();
    });

    it("default not required", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0] });
        var textField = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field");
        var classes = textField.className.split(" ");

        expect(_.contains(classes, "required")).toEqual(false);
    });
    
    it("default not disabled", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0] });
        var unitInput = TestUtils.findRenderedDOMNodeWithDataId(component, "unit-input");
        var classes = unitInput.className.split(" ");

        expect(_.contains(classes, "disabled")).toEqual(false);
    });

    it("supports disabled when set", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0],
                             disabled: true });
        var formTextField = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field");
        var textClasses = formTextField.className.split(" ");

        expect(_.contains(textClasses, "disabled")).toEqual(true);
        
        var formDropDown = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var dropDownClasses = formDropDown.className.split(" ");

        expect(_.contains(dropDownClasses, "disabled")).toEqual(true);
    });
    
    it("renders list of options", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0] });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        expect(select.children.length).toEqual(5);
        expect(select.children[0].textContent).toEqual("Minute(s)");
        expect(select.children[1].textContent).toEqual("Hour(s)");
        expect(select.children[2].textContent).toEqual("Day(s)");
        expect(select.children[3].textContent).toEqual("Week(s)");
        expect(select.children[4].textContent).toEqual("Year(s)");
    });
    
    it("list option triggers onDropdownValueChange callback on item click", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0] });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        
        ReactTestUtils.Simulate.click(select);
        
        var option1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option-1");

        ReactTestUtils.Simulate.click(option1);

        expect(component.props.onDropdownValueChange).toBeCalled();
    });
    
    it("renders value in form text field", function () {
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0],
                             value: "ABC" });

        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-input");
        expect(input.value).toEqual("ABC");
    });
    
    it("triggers onChange callback when input updated", function () {
        var callback = jest.genMockFunction();
        component = render({ labelText: "Unit Input Text",
                             options: options,
                             className: "custom-container-class",
                             selectedOption: options[0],
                             value: "ABC",
                             onTextValueChange: callback });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-input");

        ReactTestUtils.Simulate.change(input, { target: { value: "DEF" } });

        expect(callback.mock.calls[0][0].target.value).toBe("DEF");
    });
});
