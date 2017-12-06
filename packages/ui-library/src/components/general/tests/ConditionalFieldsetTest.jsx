window.__DEV__ = true;

jest.dontMock("../ConditionalFieldset.jsx");
jest.dontMock("../../forms/FormDropDownList.jsx");
jest.dontMock("../../forms/FormLabel.jsx");
jest.dontMock("../../forms/FormError.jsx");
jest.dontMock("../../forms/FormRadioGroup.jsx");

describe("ConditionalFieldset", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils"),
        FormDropDownList = require("../../forms/FormDropDownList.jsx"),
        FormRadioGroup = require("../../forms/FormRadioGroup.jsx"),
        ConditionalFieldset = require("../ConditionalFieldset.jsx"),
        _ = require("underscore"),
        callback,
        dataId = "fieldset",
        selectedIndex = 0;

    beforeEach(function () {
        callback = jest.genMockFunction();
    });

    function getGenericConditionalFieldset (props) {
        props = _.defaults(props || {}, {
            "data-id": dataId
        });

        return ReactTestUtils.renderIntoDocument(
            <ConditionalFieldset {...props}>
                 <div data-id="option1" title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                 <div data-id="option2" title="Option 2">Option 2</div>
             </ConditionalFieldset>
        );
    }

    it("renders default configuration with select", function () {
        var component = getGenericConditionalFieldset({ "data-id": dataId, type: "select" });

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
        var component = getGenericConditionalFieldset({ "data-id": dataId });

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
        var component = getGenericConditionalFieldset({ "data-id": dataId, type: "select" });
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
        var component = getGenericConditionalFieldset({ "data-id": dataId });
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
        var component = getGenericConditionalFieldset({
            "data-id": dataId,
            stateless: true,
            onValueChange: callback,
            selectedIndex: selectedIndex,
            type: "select"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "li");
        ReactTestUtils.Simulate.click(options[1]);
        expect(callback).toBeCalledWith(1);
    });

    it("change option with select", function () {
        var component = getGenericConditionalFieldset({
            "data-id": dataId,
            supportEmpty: true,
            emptyMessage: "DO NOTHING",
            type: "select"
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
            getGenericConditionalFieldset({ controlled: true });
        }).toThrow(expectedError);
    });

    it("creates a conditional fieldset select with custom width", function () {
        var component = getGenericConditionalFieldset({
            "data-id": dataId,
            type: "select",
            listClassName: "input-width-medium"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "fieldset-options");
        
        expect(select).toBeTruthy();
        expect(TestUtils.findRenderedDOMNodeWithClass(select, "input-width-medium")).toBeTruthy();
        
        var classes = select.className.split(" ");
        expect(_.contains(classes, "input-width-medium")).toEqual(true);
    });
});
