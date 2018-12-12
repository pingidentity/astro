window.__DEV__ = true;

jest.dontMock("../ColumnPagination");


describe("ColumnPagination", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ColumnPagination = require("../ColumnPagination"),
        callback = jest.fn(),
        node,
        component;

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <ColumnPagination stateless={true} data-id="ColumnPagination" {...props} />
        );
    }

    it("should render component based on props", function () {
        component = render({
            perPage: 3,
            page: 1,
            total: 5,
            onChange: callback
        });
        node = TestUtils.findRenderedDOMNodeWithDataId(component, "ColumnPagination");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();
    });

    it("should render pagination links", function () {
        component = render({
            perPage: 3,
            page: 1,
            total: 5,
            onChange: callback
        });
        node = TestUtils.findRenderedDOMNodeWithTag(component, "div");
        expect(node.textContent).toBe("1 of 2");
        var links = TestUtils.scryRenderedDOMNodesWithClass(node, "icon-previous");
        expect(links.length).toBe(1);
        expect(ReactTestUtils.isDOMComponent(links[0])).toBeTruthy();

        links = TestUtils.scryRenderedDOMNodesWithClass(node, "icon-next");
        expect(links.length).toBe(1);
        expect(ReactTestUtils.isDOMComponent(links[0])).toBeTruthy();
    });

    it("should callback to parent when links are clicked", function () {
        callback = jest.fn();
        component = render({
            perPage: 3,
            page: 2,
            total: 5,
            onChange: callback
        });
        node = TestUtils.findRenderedDOMNodeWithTag(component, "div");

        var links = TestUtils.scryRenderedDOMNodesWithClass(node, "icon-previous");
        ReactTestUtils.Simulate.click(links[0]);
        expect(callback).toBeCalled();
        links = TestUtils.scryRenderedDOMNodesWithClass(node, "icon-next");
        ReactTestUtils.Simulate.click(links[0]);
        expect(callback).toBeCalled();
    });

    it("should render nothing when total page is 1", function () {
        component = render({
            perPage: 3,
            page: 1,
            total: 1,
            onChange: callback
        });
        node = TestUtils.findRenderedDOMNodeWithTag(component, "div");
        expect(node.textContent).toBe("");
    });

    it("should throw exception when total are not defined", function () {
        var expectedError =
                new Error("props.total and props.perPage must be defined to determine the number of page links!");
        expect(function () {
            render({
                perPage: 3,
                page: 1,
                onChange: callback
            });
        }).toThrow(expectedError);
    });

    it("should render pagination links even in case page is larger than total", function () {
        component = render({
            perPage: 3,
            page: 9,
            total: 5,
            onChange: callback
        });
        node = TestUtils.findRenderedDOMNodeWithTag(component, "div");
        expect(node.textContent).toBe("2 of 2");
        var links = TestUtils.scryRenderedDOMNodesWithClass(node, "icon-previous");
        expect(links.length).toBe(1);
        expect(ReactTestUtils.isDOMComponent(links[0])).toBeTruthy();
    });
});
