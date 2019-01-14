window.__DEV__ = true;

jest.dontMock("moment");
jest.dontMock("../UnitInput");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/form-text-field/v2");

import { InputWidthClasses } from "../../forms/InputWidths";

describe("UnitInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ReactDOM = require("react-dom"),
        UnitInput = require("../UnitInput"),
        _ = require("underscore"),
        component;

    var options = [
        { label: "Minute(s)", value: "Minute(s)" },
        { label: "Hour(s)", value: "Hour(s)" },
        { label: "Day(s)", value: "Day(s)" },
        { label: "Week(s)", value: "Week(s)" },
        { label: "Year(s)", value: "Year(s)" }
    ];

    function render (props) {
        var callback = jest.fn();
        var callback1 = jest.fn();
        return ReactTestUtils.renderIntoDocument(
            <UnitInput
                {...props}
                labelText="Unit Input Text"
                className="custom-container-class"
                textFieldProps={{
                    onValueChange: callback,
                    value: "ABC",
                    className: InputWidthClasses.XS
                }}
                dropDownListProps={{
                    options: options,
                    onValueChange: callback1,
                    selectedOption: options[0],
                    className: InputWidthClasses.SM
                }}
            />
        );
    }

    it("verify it renders the component", function () {
        component = render({ labelText: "Unit Input Text" });
        var input = ReactDOM.findDOMNode(component);
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
    });

    it("verify default data-id", function () {
        component = render({ labelText: "Unit Input Text" });
        expect(component.props["data-id"]).toBe("unit-input");
    });

    it("accepts custom data-id", function () {
        component = render({ labelText: "Unit Input Text",
            "data-id": "my-custom-select" });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "my-custom-select")).toBeTruthy();
    });

    it("accepts classsname", function () {
        component = render({ labelText: "Unit Input Text",
            className: "custom-container-class" });
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "custom-container-class")).toBeTruthy();
    });

    it("default not required", function () {
        component = render({ labelText: "Unit Input Text" });
        var textField = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field");
        var classes = textField.className.split(" ");

        expect(_.contains(classes, "required")).toEqual(false);
    });

    it("supports disabled when set", function () {
        var callback = jest.fn();
        var callback1 = jest.fn();
        var component1 = ReactTestUtils.renderIntoDocument(
            <UnitInput
                labelText="Unit Input Text"
                className="custom-container-class"
                data-id= "my-custom-select"
                textFieldProps={{
                    onValueChange: callback,
                    value: "ABC",
                    className: InputWidthClasses.XS,
                    disabled: true
                }}
                dropDownListProps={{
                    options: options,
                    onValueChange: callback1,
                    selectedOption: options[0],
                    className: InputWidthClasses.SM,
                    disabled: true
                }}
            /> );

        var formTextField = TestUtils.findRenderedDOMNodeWithDataId(component1, "form-text-field");
        var textClasses = formTextField.className.split(" ");

        expect(_.contains(textClasses, "disabled")).toEqual(true);

        var formDropDown = TestUtils.findRenderedDOMNodeWithDataId(component1, "form-drop-down-list");
        var dropDownClasses = formDropDown.className.split(" ");

        expect(_.contains(dropDownClasses, "disabled")).toEqual(true);
    });

    it("renders list of options", function () {
        component = render({ labelText: "Unit Input Text" });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        expect(select.children.length).toEqual(5);
        expect(select.children[0].textContent).toEqual("Minute(s)");
        expect(select.children[1].textContent).toEqual("Hour(s)");
        expect(select.children[2].textContent).toEqual("Day(s)");
        expect(select.children[3].textContent).toEqual("Week(s)");
        expect(select.children[4].textContent).toEqual("Year(s)");
    });

    it("renders value in form text field", function () {
        component = render({ labelText: "Unit Input Text" });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-input");

        expect(input.value).toEqual("ABC");
    });

    it("renders label as well as labelText", function() {
        component = ReactTestUtils.renderIntoDocument(
            <UnitInput
                label="Unit Input Text"
                dropDownListProps={{
                    options: options,
                }}
            />
        );

        const label = TestUtils.findRenderedDOMNodeWithDataId(component, "unit-input-label");
        expect(label.textContent).toEqual("Unit Input Text");
    });
});
