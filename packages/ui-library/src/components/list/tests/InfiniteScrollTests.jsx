window.__DEV__ = true;

jest.dontMock("../InfiniteScroll");

describe("Infinite Scroll", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        InfiniteScroll = require("../InfiniteScroll"),
        assign = require("object-assign");

    class MyRow extends React.Component {
        render() {
            return <div ref="container" className="row">My row: {this.props.num}</div>;
        }
    }

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    window.setTimeout = jest.fn();

    function getRenderedComponent (opts) {
        var batches = [{ id: 0, data: [] }];
        for (var i = 0; i < 50; i += 1) {
            batches[0].data.push({ num: i });
        }

        var defaults = {
            hasPrev: true,
            hasNext: true,
            batches: batches,
            attachToWindow: false,
            onScroll: jest.fn(),
            contentType: <MyRow />
        };

        return ReactTestUtils.renderIntoDocument(<InfiniteScroll {...assign(defaults, opts)}>
            {<span>No results found</span>}
        </InfiniteScroll>);
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders with default data-id", function () {
        var component = getRenderedComponent();

        var scroller = TestUtils.findRenderedDOMNodeWithDataId(component, "infinite-scroll");

        expect(scroller).toBeDefined();
    });

    it("renders with given data-id", function () {
        var component = getRenderedComponent({ "data-id": "myScroller" });

        var scroller = TestUtils.findRenderedDOMNodeWithDataId(component, "myScroller");

        expect(scroller).toBeDefined();
    });

    it("jumps to paged out item", function () {
        var component = getRenderedComponent();
        var node = ReactDOM.findDOMNode(component.refs.container);

        component.visibilityArray = [false, false, true];

        var batches = ReactDOM.findDOMNode(component).getElementsByClassName("batch");

        //pretend we're scrolled 200 pixes in this infinite scroll
        node.scrollTop = 200;
        node.getBoundingClientRect = jest.fn()
            .mockReturnValue({ top: 0, left: 0, bottom: 50, right: 100, height: 50, width: 100 });
        batches[0].getBoundingClientRect = jest.fn()
            .mockReturnValue({ top: -190, left: 0, bottom: -90, right: 100, height: 100, width: 100 });

        //jumping to the first item which we defined as starting at 10px, should cause the container to
        //scroll up by 190px
        component.jumpToItem(0, 0);
        expect(node.scrollTop).toBe(10);
    });

    it("re-renders if visibility array changes", function () {
        var component = getRenderedComponent();
        var node = ReactDOM.findDOMNode(component.refs.container);

        component._getBatchVisibility = jest.fn().mockReturnValue([false, false, true]);
        //change from mocking render because of react error
        component.componentDidUpdate = jest.fn().mockReturnValue(component.componentDidUpdate);
        //simulate a change of visibility
        ReactTestUtils.Simulate.scroll(node);
        expect(component.componentDidUpdate.mock.calls.length).toBe(1);

        //simulate a scroll without a change of visibility - render not called again
        ReactTestUtils.Simulate.scroll(node);
        expect(component.componentDidUpdate.mock.calls.length).toBe(1);
    });

    it("_padVisibility pads visibility array", function () {
        var component = getRenderedComponent();

        expect(component._padVisibility([false, false, false])).toEqual([false, false, false]);
        expect(component._padVisibility([false, true, false])).toEqual([true, true, true]);
        expect(component._padVisibility([false, false, true])).toEqual([false, true, true]);
        expect(component._padVisibility([true, false, false])).toEqual([true, true, false]);
    });

    it("renders child if data is empty", function () {
        var component = getRenderedComponent({ batches: [] });
        var node = ReactDOM.findDOMNode(component.refs.container);

        expect(node.childNodes.length).toBe(1);
        expect(node.childNodes[0].textContent).toBe("No results found");
    });

    it("computes rect intersection", function () {
        var comp = getRenderedComponent();

        function genRect (t, b) {
            return { left: 0, right: 100, top: t, bottom: b };
        }

        expect(comp._rectIntersect(genRect(0, 100), genRect(101, 200))).toBe(false);
        expect(comp._rectIntersect(genRect(0, 100), genRect(100, 200))).toBe(true);
        expect(comp._rectIntersect(genRect(0, 100), genRect(10, 50))).toBe(true);
        expect(comp._rectIntersect(genRect(10, 50), genRect(0, 100))).toBe(true);
        expect(comp._rectIntersect(genRect(10, 50), genRect(10, 50))).toBe(true);
    });

    it("renders right number of rows", function () {
        var component = getRenderedComponent();
        expect(ReactDOM.findDOMNode(component.refs.batch0).childNodes.length).toBe(50);
    });

    it("passes the attributes to each row", function () {
        var component = getRenderedComponent();
        expect(ReactDOM.findDOMNode(component.refs.batch0).childNodes[10].textContent).toBe("My row: 10");
    });

    it("attaches to window scrolls", function () {
        var component = getRenderedComponent({
            attachToWindow: true,
            onLoadPrev: jest.fn(),
            onLoadNext: jest.fn()
        });

        component.componentDidUpdate();
        component._didScrollToTop = jest.fn().mockReturnValue(true);
        component._didScrollToBottom = jest.fn().mockReturnValue(false);

        //trigger scroll
        TestUtils.findMockCall(window.addEventListener, "scroll")[1]();

        expect(component.props.onLoadPrev.mock.calls.length).toBe(1);
        expect(component.props.onLoadNext.mock.calls.length).toBe(0);

        expect(TestUtils.mockCallsContains(window.removeEventListener, "scroll")).toBe(false);
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(TestUtils.mockCallsContains(window.removeEventListener, "scroll")).toBe(true);
    });

    it("adds and removes scroll event listener if attachToWindow is true", function () {
        var component = getRenderedComponent({ attachToWindow: true });

        expect(TestUtils.mockCallsContains(window.addEventListener, "scroll")).toBe(true);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(TestUtils.mockCallsContains(window.addEventListener, "scroll")).toBe(true);
    });

    it("does not add or remove scroll event listener if attachToWindow is false", function () {
        var component = getRenderedComponent({ attachToWindow: false });

        expect(TestUtils.mockCallsContains(window.addEventListener, "scroll")).toBe(false);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(TestUtils.mockCallsContains(window.addEventListener, "scroll")).toBe(false);
    });


    it("calls the heading generator", function () {
        var generator = function (data) {
            return data.num % 25 === 0 ? "Every 25 Heading..." : null;
        };
        var component = getRenderedComponent({ onGenerateHeading: generator });
        var batch = ReactDOM.findDOMNode(component.refs.batch0);

        for (var i = 0; i < batch.childNodes.length; i += 1) {
            expect(batch.childNodes[i].getElementsByClassName("item-head").length).toBe(i % 25 === 0 ? 1 : 0);
        }
    });

    it("loads prev upon hitting bottom of container", function () {
        var component = getRenderedComponent({
            onLoadPrev: jest.fn(),
            onLoadNext: jest.fn()
        });
        component._didScrollToTop = jest.fn().mockReturnValue(true);
        component._didScrollToBottom = jest.fn().mockReturnValue(false);
        component.componentDidUpdate();

        ReactTestUtils.Simulate.scroll(ReactDOM.findDOMNode(component.refs.container));

        expect(component.props.onLoadPrev.mock.calls.length).toBe(1);
        expect(component.props.onLoadNext.mock.calls.length).toBe(0);
    });

    it("loads next upon hitting bottom of container", function () {
        var component = getRenderedComponent({
            onLoadPrev: jest.fn(),
            onLoadNext: jest.fn()
        });
        component._didScrollToTop = jest.fn().mockReturnValue(false);
        component._didScrollToBottom = jest.fn().mockReturnValue(true);
        component.componentDidUpdate();

        ReactTestUtils.Simulate.scroll(ReactDOM.findDOMNode(component.refs.container));

        expect(component.props.onLoadPrev.mock.calls.length).toBe(0);
        expect(component.props.onLoadNext.mock.calls.length).toBe(1);
    });

});
