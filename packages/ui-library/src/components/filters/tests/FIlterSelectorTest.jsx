jest.dontMock("../FilterSelector");

describe("FilterSelector", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FilterSelector = require("../FilterSelector");
    
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
    });

    it("triggers search callback", function () {
        const callback = jest.genMockFunction();
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

});