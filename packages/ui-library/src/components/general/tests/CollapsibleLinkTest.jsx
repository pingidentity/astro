window.__DEV__ = true;

jest.dontMock("../CollapsibleLink");

describe("CollapsibleLink", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var CollapsibleLink = require("../CollapsibleLink");
    var TestUtils = require("../../../testutil/TestUtils");

    it("renders collapsed state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsible link"
                expanded={false} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");

        expect(title.getAttribute("class")).not.toContain("open");
        expect(title.textContent).toEqual("Collapsible link");
    });

    it("renders expanded state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Expanded link"
                expanded={true} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");

        expect(title.getAttribute("class")).toContain("open");
        expect(title.textContent).toEqual("Expanded link");
    });

    it("renders custom classname and data-id", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsed link"
                data-id="collapsible-link-custom"
                className="my-class"
                expanded={false} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link-custom");

        expect(title.getAttribute("class")).toContain("my-class");
        expect(title.textContent).toEqual("Collapsed link");
    });

    it("renders arrow on the right by default", function () {
        var view = ReactTestUtils.renderIntoDocument(<CollapsibleLink title="Collapsed link" />);
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");

        expect(title.className.split(" ")).toContain("right");
    });

    it("renders arrow based on arrow positioning enum options", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsed link"
                data-id="collapsible-link-left"
                arrowPosition={CollapsibleLink.arrowPositions.LEFT} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link-left");

        expect(title.className.split(" ")).toContain("left");

        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsed link"
                data-id="collapsible-link-right"
                arrowPosition={CollapsibleLink.arrowPositions.RIGHT} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link-right");

        expect(title.className.split(" ")).toContain("right");
    });

    it("renders alternative title when expanded", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsed link"
                toggledTitle="Expanded link"
                className="my-class"
                expanded={true} />
        );

        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");
        expect(title.textContent).toEqual("Expanded link");
    });

    it("renders title when collapsed", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Collapsed link"
                toggledTitle="Expanded link"
                className="my-class"
                expanded={false} />
        );

        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");
        expect(title.textContent).toEqual("Collapsed link");
    });

    it("triggers callback on title click", function () {
        var callback = jest.genMockFunction();
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Expanded link"
                onToggle={callback}
                expanded={false} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");

        ReactTestUtils.Simulate.click(title);
        expect(callback).toBeCalled();

    });

    it("does not triggers callback on title click", function () {
        var contentClickCallback = jest.genMockFunction();
        var view = ReactTestUtils.renderIntoDocument(
            <CollapsibleLink
                title="Expanded link"
                expanded={false} />
        );
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "collapsible-link");

        ReactTestUtils.Simulate.click(title);
        expect(contentClickCallback).not.toBeCalled();

    });

});