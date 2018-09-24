window.__DEV__ = true;

jest.dontMock("../ConditionalFieldset");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/FormLabel");
jest.dontMock("../../forms/FormError");
jest.dontMock("../../forms/FormRadioGroup");
jest.dontMock("../../forms/FormRadioInput");

describe("ConditionalFieldset", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils"),
        FormDropDownList = require("../../forms/FormDropDownList"),
        FormRadioGroup = require("../../forms/FormRadioGroup"),
        ConditionalFieldset = require("../ConditionalFieldset"),
        _ = require("underscore"),
        callback,
        dataId = "fieldset",
        selectedIndex = 0;

    beforeEach(function () {
        callback = jest.genMockFunction();
    });

    function getComponent (props) {
        const defaultProps = {
            "data-id": dataId
        };

        return ReactTestUtils.renderIntoDocument(
            <ConditionalFieldset {...defaultProps} {...props}>
                 <div data-id="option1" title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                 <div data-id="option2" title="Option 2">Option 2</div>
             </ConditionalFieldset>
        );
    }

    it("renders default configuration with select", function () {
        var component = getComponent({ "data-id": dataId, type: ConditionalFieldset.Types.SELECT });

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        expect(form1.textContent).toBe("Option with some MARKUP");
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(select).toBeTruthy();
        var dropDownList = TestUtils.findRenderedComponentWithType(component, FormDropDownList);
        expect(dropDownList).toBeTruthy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(dropDownList, "li");
        expect(options.length).toBe(2);
        expect(options[0].textContent).toBe("Option 1");
        expect(options[1].textContent).toBe("Option 2");
    });

    it("renders default configuration with all defaults", function () {
        var component = getComponent({ "data-id": dataId });

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        expect(form1.textContent).toBe("Option with some MARKUP");
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var radio = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(radio).toBeTruthy();
        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(formRadioGroup).toBeTruthy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(radio, "input");
        expect(options.length).toBe(2);
        // make sure no radios are checked since we didn't provide a default
        expect(options[0].checked).toBe(true);
        expect(options[1].checked).toBe(false);

        var optionLabel = TestUtils.scryRenderedDOMNodesWithTag(radio, "label");
        expect(optionLabel.length).toBe(2);
        expect(optionLabel[0].textContent).toBe("Option 1");
        expect(optionLabel[1].textContent).toBe("Option 2");
    });

    it("change option with select", function () {
        var component = getComponent({ "data-id": dataId, type: ConditionalFieldset.Types.SELECT });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "li");
        ReactTestUtils.Simulate.click(options[1]);
        expect(componentRef.state.selectedIndex).toBe(1);

        form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeFalsy();
        form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeTruthy();
    });

    it("change option with radio", function () {
        var component = getComponent({ "data-id": dataId });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "input");
        expect(options.length).toBe(2);
        expect(options[0].checked).toBe(true);
        expect(options[1].checked).toBe(false);
        expect(componentRef.state.selectedIndex).toBe(0);


        ReactTestUtils.Simulate.change(options[1], { target: { value: 1 } });
        expect(componentRef.state.selectedIndex).toBe(1);

        form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeFalsy();
        form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeTruthy();
    });

    it("verify defaults change to select when 3 or more options", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <ConditionalFieldset data-id={dataId} >
                <div data-id="option1" title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                <div data-id="option2" title="Option 2">Option 2</div>
                <div data-id="option3" title="Option 3">Option 3</div>
            </ConditionalFieldset>
        );
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(select).toBeTruthy();
        var dropDownList = TestUtils.findRenderedComponentWithType(component, FormDropDownList);
        expect(dropDownList).toBeTruthy();
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "li");
        expect(options.length).toBe(3);
    });

    it("stateless change option", function () {
        var component = getComponent({
            "data-id": dataId,
            stateless: true,
            onValueChange: callback,
            selectedIndex: selectedIndex,
            type: ConditionalFieldset.Types.SELECT
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "li");
        ReactTestUtils.Simulate.click(options[1]);
        expect(callback).toBeCalledWith(1);
    });

    it("change option with select", function () {
        var component = getComponent({
            supportEmpty: true,
            emptyMessage: "DO NOTHING",
            type: ConditionalFieldset.Types.SELECT
        });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeFalsy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "li");
        expect(options.length).toBe(3);
        expect(options[0].textContent).toBe("DO NOTHING");
        expect(options[1].textContent).toBe("Option 1");
        expect(options[2].textContent).toBe("Option 2");

        ReactTestUtils.Simulate.click(options[1]);
        expect(componentRef.state.selectedIndex).toBe(1);

        form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("creates a conditional fieldset select with custom width", function () {
        var component = getComponent({
            "data-id": dataId,
            type: ConditionalFieldset.Types.SELECT,
            listClassName: "input-width-medium"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");

        expect(select).toBeTruthy();
        expect(TestUtils.findRenderedDOMNodeWithClass(select, "input-width-medium")).toBeTruthy();

        var classes = select.className.split(" ");
        expect(_.contains(classes, "input-width-medium")).toEqual(true);
    });

    it("renders as required", function () {
        const component = getComponent({
            emptyMessage: "DO NOTHING",
            required: true,
            supportEmpty: true,
        });

        const label = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(label.className).toContain("required");
    });
});
