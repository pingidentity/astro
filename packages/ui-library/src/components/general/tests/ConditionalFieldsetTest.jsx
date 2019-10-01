window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

jest.dontMock("../ConditionalFieldset");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/FormLabel");
jest.dontMock("../../forms/FormError");
jest.dontMock("../../forms/FormRadioGroup");
jest.dontMock("../../forms/FormRadioInput");
jest.dontMock("../../forms/InputWidths");

import React from "react";
import TestUtils from "../../../testutil/TestUtils";
import FormRadioGroup from "../../forms/FormRadioGroup";
import ConditionalFieldset from "../ConditionalFieldset";
import { InputWidths, InputWidthClasses } from "../../forms/InputWidths";
import { mount } from "enzyme";

describe("ConditionalFieldset", function () {
    const dataId = "fieldset";
    const defaultProps = {
        "data-id": dataId
    };

    function getComponent (props) {
        return TestUtils.renderInWrapper(
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

    it("sets the selectedIndex automatically", function () {
        const cb = jest.fn();
        const wrapper = getEnzymeWrapper({
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
