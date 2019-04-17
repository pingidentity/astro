window.__DEV__ = true;

jest.dontMock("../ConditionalFieldset");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/FormLabel");
jest.dontMock("../../forms/FormError");
jest.dontMock("../../forms/FormRadioGroup");
jest.dontMock("../../forms/FormRadioInput");
jest.dontMock("../../forms/InputWidths");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import Utils from "../../../util/Utils";
import FormDropDownList from "../../forms/FormDropDownList";
import FormRadioGroup from "../../forms/FormRadioGroup";
import ConditionalFieldset from "../ConditionalFieldset";
import { InputWidths, InputWidthClasses } from "../../forms/InputWidths";
import { mount } from "enzyme";

describe("ConditionalFieldset", function () {
    const dataId = "fieldset";
    const selectedIndex = 0;
    const defaultProps = {
        "data-id": dataId
    };
    let callback;

    beforeEach(function () {
        callback = jest.fn();
    });

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <ConditionalFieldset {...defaultProps} {...props}>
                <div data-id="option1" title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                <div data-id="option2" title="Option 2">Option 2</div>
            </ConditionalFieldset>
        );
    }

    function getEnzymeWrapper (props) {
        return mount(
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

    it("creates a conditional fieldset dropdown with specified width and classname", function () {
        const testClass = "test-class";
        const component = getComponent({
            "data-id": dataId,
            type: ConditionalFieldset.Types.SELECT,
            listClassName: testClass,
            inputWidth: InputWidths.MD,
        });

        const dropdown = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");

        expect(dropdown.className).toContain(InputWidthClasses.MD);
        expect(TestUtils.findRenderedDOMNodeWithClass(dropdown, testClass)).toBeTruthy();
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

    it("fires cannonball warning when the p-stateful flag is not set", function () {
        console.warn = jest.fn();
        getComponent({ flags: [] });
        expect(console.warn).toBeCalled();
    });

    it("does not fire cannonball warning when the p-stateful flag is set", function () {
        console.warn = jest.fn();
        getComponent({ flags: ["p-stateful"] });
        expect(console.warn).not.toBeCalled();
    });

    it("sets the selectedIndex automatically when p-statful flag is set", function () {
        const cb = jest.fn();
        const wrapper = getEnzymeWrapper({
            flags: ["p-stateful"],
            onValueChange: cb,
        });

        const r1 = { "data-id": "fieldset-options_0" };
        const r2 = { "data-id": "fieldset-options_1" };

        expect(cb).not.toBeCalled();
        expect(wrapper.find(r1).prop("checked")).toEqual(true);
        expect(wrapper.find(r2).prop("checked")).toEqual(false);

        // used "change" since "click" event does not trigger the onChange on the input in Enzyme
        wrapper.find(r2).simulate("change");

        expect(cb).toHaveBeenCalled();
        expect(wrapper.find(r1).prop("checked")).toEqual(false);
        expect(wrapper.find(r2).prop("checked")).toEqual(true);
    });
});
