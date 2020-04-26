window.__DEV__ = true;

jest.dontMock("../KeywordSearch.jsx");
jest.dontMock("../KeywordSearchView.jsx");


describe("KeywordSearchView", () => {
    const
        React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        KeywordSearchView = require("../KeywordSearchView");

    const getComponent = (props) => {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <KeywordSearchView
                    {...props}
                />
            </div>
        );
    };

    it("should render the component", () => {
        const component = getComponent();
        expect(component).toBeTruthy();
    });

    it("should render results", () => {
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "Also a test" }
            ]
        });
        const results = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "keyword-search__result"
        );
        expect(results.length).toBe(2);
    });

    it("should call onResultClick when a result is clicked", () => {
        const onResultClick = jest.fn();
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "Also a test" }
            ],
            onResultClick
        });

        const results = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "keyword-search__result"
        );

        ReactTestUtils.Simulate.click(results[0]);
        expect(onResultClick).toBeCalled();
    });


    it("should handle result clicks if onResultClick is not passed in", () => {
        const onResultClick = jest.fn();
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "Also a test" }
            ]
        });

        const results = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "keyword-search__result"
        );

        ReactTestUtils.Simulate.click(results[0]);
        expect(onResultClick).not.toBeCalled();
    });

    it("should call onValueChange when value changes", () => {
        const onValueChange = jest.fn();
        const component = getComponent({
            onValueChange
        });

        const searchBox = TestUtils.findRenderedDOMNodeWithTag(
            component,
            "input"
        );

        ReactTestUtils.Simulate.change(searchBox, { target: { value: "a" } });
        expect(onValueChange).toBeCalled();
    });

    it("should render section title above result name", () => {
        const component = getComponent({
            results: [
                {
                    id: "dirTest",
                    label: "dirTest"
                }
            ]
        });

        const title = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "keyword-search__result-label"
        );

        expect(title).toBeTruthy();
    });
});
