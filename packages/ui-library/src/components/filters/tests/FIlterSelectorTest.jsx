jest.dontMock("../FilterSelector");

jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FilterSelector from "../FilterSelector";

describe("FilterSelector", function () {

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

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(<div><FilterSelector {...props}/></div>);
    }

    it("renders with default data-id", function () {
        const component = getComponent({ options });
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "filter-selector");
        expect(section).toBeTruthy();

        const popover = TestUtils.findRenderedDOMNodeWithDataId(component, "filter-selector-popover");
        expect(popover).toBeTruthy();
    });

    it("triggers search callback", function () {
        const callback = jest.fn();
        const component = getComponent({ options, open: true, onSearch: callback, search: "searching" });
        const searchBox = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox-input");

        ReactTestUtils.Simulate.change(searchBox, { target: { value: "a search" } });
        expect(callback).lastCalledWith("a search");
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

});
