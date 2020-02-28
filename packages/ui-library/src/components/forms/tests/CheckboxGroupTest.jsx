import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CheckboxGroup from "../CheckboxGroup";
import _ from "underscore";
import { mount } from "enzyme";

describe("CheckboxGroup", function () {

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            options: [
                {
                    value: "one",
                    label: "Uno"
                },
                {
                    value: "two",
                    label: "Dos",
                    conditionalContent: "Sometimes"
                },
                {
                    value: "three",
                    label: "Tres"
                },
            ],
            values: ["one", "two"],
        });
        return ReactTestUtils.renderIntoDocument(<div><CheckboxGroup {...opts} /></div>);
    }

    it("Renders component with default data-id", function () {
        const component = getComponent();
        const cbGroup = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group");

        expect(cbGroup).toBeTruthy();
    });

    it("Renders component from a simple list", function () {
        const component = getComponent({
            options: ["two", "three"]
        });
        const cbGroup = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group");

        expect(cbGroup).toBeTruthy();
    });

    it("Triggers onValueChange when checking something", function () {
        const callback = jest.fn();
        const addCallback = jest.fn();
        const component = getComponent({
            onValueChange: value => callback(value),
            onAdd: addCallback
        });
        const option = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group-three");

        expect(callback).not.toBeCalled();
        expect(addCallback).not.toBeCalled();
        ReactTestUtils.Simulate.change(option, { target: { checked: true } });
        expect(callback).toBeCalledWith(["one", "two", "three"]);
        expect(addCallback).toBeCalledWith("three");
    });

    it("Triggers onValueChange when unchecking something", function () {
        const callback = jest.fn();
        const removeCallback = jest.fn();
        const component = getComponent({
            onValueChange: value => callback(value),
            onRemove: removeCallback
        });
        const option = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group-one");

        expect(callback).not.toBeCalled();
        expect(removeCallback).not.toBeCalled();
        ReactTestUtils.Simulate.change(option, { target: { checked: false } });
        expect(callback).toBeCalledWith(["two"]);
        expect(removeCallback).toBeCalledWith("one");
    });

    it("Only shows conditionalContent when the box is checked", function() {
        let component = getComponent();
        let content = TestUtils.findRenderedDOMNodeWithClass(component, "checkbox-description");
        expect(content).toBeTruthy();

        component = getComponent({ values: ["one", "three"] });
        content = TestUtils.findRenderedDOMNodeWithClass(component, "checkbox-description");
        expect(content).not.toBeTruthy();
    });

    const nestedOptions = [
        {
            label: "Fruits",
            value: "Fruits",
            children: [
                { label: "Apple", value: "Apple" },
                { label: "Orange", value: "Orange" },
                { label: "Banana", value: "Banana" },
            ],
        },
        {
            label: "Vegetables",
            value: "Vegetables",
            children: [
                { label: "Carrot", value: "Carrot" },
                { label: "Lettuce", value: "Lettuce" },
                { label: "Pepper", value: "Pepper" },
                { label: "Cucumber", value: "Cucumber" },
            ],
        },
        {
            label: "Bread",
            value: "Bread",
            children: [
                { label: "White Bread", value: "White Bread", disabled: true },
                { label: "Whole Wheat", value: "Whole Wheat" },
                { label: "Sourdough", value: "Sourdough" },
            ],
        },
    ];

    it("shows nested checkboxes on click", function() {
        const component = mount(
            <CheckboxGroup
                options={nestedOptions}
                renderOption={CheckboxGroup.renderNestedCheckboxes()}
            />
        );

        expect(component.find("label[data-id='checkbox-group-Fruits-Apple-container']").exists()).not.toBeTruthy();
        component.find("div[data-id='checkbox-group-Fruits-collapsible']").simulate("click");
        expect(component.find("label[data-id='checkbox-group-Fruits-Apple-container']").exists()).toBeTruthy();
    });
});
