jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import { render, screen } from "@testing-library/react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FilterSelector from "../FilterSelector";
import { mount } from "enzyme";

const options = [
    {
        id: "one",
        name: "One",
    },
    {
        id: "two",
        name: "Two",
    },
    {
        id: "three",
        name: "Three",
    },
];
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
const mixedOptions = [
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
    },
    {
        label: "Bread",
        value: "Bread",
    },
];

const defaultProps = {
    options,
};
const renderComponent = (props) => render(<FilterSelector {...defaultProps} {...props} />);

function getComponent (props) {
    return ReactTestUtils.renderIntoDocument(<div><FilterSelector {...props} /></div>);
}

describe("FilterSelector", function () {
    it("renders with default data-id", function () {
        const component = getComponent({ options });
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "filter-selector");
        expect(section).toBeTruthy();
    });

    it("triggers search callback", function () {
        const callback = jest.fn();
        const component = getComponent({
            options,
            open: true,
            onSearch: callback,
            search: "searching"
        });
        const searchBox = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox-input");

        ReactTestUtils.Simulate.change(searchBox, { target: { value: "a search" } });
        expect(callback).lastCalledWith("a search");
    });

    it("renders with selection options by default", function () {
        const component = mount(
            <FilterSelector
                options={options}
                selected={["Fruits", "Vegetables"]}
            />
        );
        const selectionOptions = component.find("[data-id='only-selected-button']");
        expect(selectionOptions).toBeTruthy();
    });

    it("renders without selection options by default", function () {
        const component = mount(
            <FilterSelector
                options={options}
                selected={[]}
                hideSelectionOptions={true}
            />
        );
        const selectionOptions = component.find("[data-id='only-selected-button']");
        expect(selectionOptions).toHaveLength(0);
    });

    it("renders when some are selected", function () {
        const component = getComponent({ options, selected: ["one", "two"] });
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "filter-selector");
        expect(section).toBeTruthy();
    });

    it("renders supplied labelText", function() {
        const labelText = "some label";
        const component = getComponent({ options, labelText, selected: ["one", "two"] });
        const label = TestUtils.findRenderedDOMNodeWithDataId(component, "label");
        expect(label.textContent).toEqual(labelText);
    });

    it("renders supplied placeholder", function() {
        const placeholder = "placeholder";
        const component = getComponent({ options, placeholder, selected: [] });
        const label = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-filter");
        expect(label.textContent).toEqual(placeholder);
    });

    it("renders supplied label", function() {
        const labelText = "some label";
        const component = getComponent({ options, label: labelText, selected: ["one", "two"] });
        const label = TestUtils.findRenderedDOMNodeWithDataId(component, "label");
        expect(label.textContent).toEqual(labelText);
    });

    it("finds the name in the selected list", function() {
        const labelText = "One1";
        const component = getComponent({ options, selected: ["one"] });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "filter-selector");
        expect(element).toBeTruthy();
        expect(element.textContent).toEqual(labelText);
    });

    it("should filter out unselected options", function() {
        const component = mount(<FilterSelector options={options} selected={["Fruits", "Vegetables"]} />);

        component.find("a[data-id='filter-selector-popover-trigger']").simulate("click");
        expect(component.find("label[data-id='selectionList-Checkbox-3-container']").exists()).toBeTruthy();

        component.find("button[data-id='only-selected-button']").simulate("click");
        expect(component.find("label[data-id='selectionList-Checkbox-3-container']").exists()).not.toBeTruthy();
    });

    it("should call onValueChange with an empty list", function() {
        const callback = jest.fn();
        const component = mount(
            <FilterSelector
                options={options}
                selected={["Fruits", "Vegetables"]}
                onValueChange={callback}
            />
        );

        expect(callback).not.toBeCalled();
        component.find("a[data-id='filter-selector-popover-trigger']").simulate("click");
        component.find("button[data-id='clear-button']").simulate("click");
        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toEqual([]);
    });

    it("should filter out unselected options from a nested list", function() {
        const component = mount(<FilterSelector options={nestedOptions} selected={["Fruits", "Carrot"]} />);

        component.find("a[data-id='filter-selector-popover-trigger']").simulate("click");
        expect(component.find("label[data-id='selectionList-Checkbox-3-container']").exists()).toBeTruthy();

        component.find("button[data-id='only-selected-button']").simulate("click");
        expect(component.find("label[data-id='selectionList-Checkbox-3-container']").exists()).not.toBeTruthy();
    });

    it("should show the count for all child options if parent is selected and ignore parent in count", () => {
        renderComponent({
            options: nestedOptions,
            selected: [
                "Fruits",
                "Apple",
            ],
        });
        const expectedCount = nestedOptions[0].children.length;
        const counter = screen.getByText(`${expectedCount}`);
        expect(counter).toBeInTheDocument();
    });

    it("should show the proper count when there are nested and non-nested options", () => {
        renderComponent({
            options: mixedOptions,
            selected: [
                "Fruits",
                "Apple",
                "Bread",
                "Vegetables",
            ],
        });
        const expectedCount = nestedOptions[0].children.length + 2;
        const counter = screen.getByText(`${expectedCount}`);
        expect(counter).toBeInTheDocument();
    });
});
