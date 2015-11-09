window.__DEV__ = true;

jest.dontMock("../InfiniteScroll.jsx");
jest.dontMock("object-assign");

describe("Infinite Scroll", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        InfiniteScroll = require("../InfiniteScroll.jsx"),
        assign = require("object-assign");
    var batches;

    var MyRow = React.createClass({
        render: function () {
            return <div ref="container" className="row">My row: {this.props.num}</div>;
        }
    });

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    function getRenderedComponent (opts) {
        var defaults = {
            hasPrev: true,
            hasNext: true,
            batches: batches,
            attachToWindow: false,
            headingGenerator: jest.genMockFunction(),
            loadNext: jest.genMockFunction(),
            loadPrev: jest.genMockFunction(),
            onScroll: jest.genMockFunction(),
            contentType: React.createElement(MyRow)
        };

        return ReactTestUtils.renderIntoDocument(React.createElement(
            InfiniteScroll,
            assign(defaults, opts),
            <span>No results found</span>
        ));
    }

    beforeEach(function () {
        batches = [{ id: 0, data: [] }];

        for (var i = 0; i < 50; i += 1) {
            batches[0].data.push({ num: i });
        }

        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("re-renders if visibility array changes", function () {
        var component = getRenderedComponent();
        var node = React.findDOMNode(component.refs.container);

        component._getBatchVisibility = jest.genMockFunction().mockReturnValue([false, false, true]);
        component.render = jest.genMockFunction();

        //simulate a change of visibility
        ReactTestUtils.Simulate.scroll(node);
        expect(component.render.mock.calls.length).toBe(1);

        //simulate a scroll without a change of visibility - render not called again
        ReactTestUtils.Simulate.scroll(node);
        expect(component.render.mock.calls.length).toBe(1);
    });

    it("renders child if data is empty", function () {
        var component = getRenderedComponent({ batches: [] });
        var node = React.findDOMNode(component.refs.container);

        expect(node.childNodes.length).toBe(1);
        expect(node.childNodes[0].innerHTML).toBe("No results found");
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
        expect(React.findDOMNode(component.refs.batch0).childNodes.length).toBe(50);
    });

    it("passes the attributes to each row", function () {
        var component = getRenderedComponent();
        expect(React.findDOMNode(component.refs.batch0).childNodes[10].textContent).toBe("My row: 10");
    });

    it("attaches to window scrolls", function () {
        var component = getRenderedComponent({ attachToWindow: true });

        component.componentDidUpdate();
        component._didScrollToTop = jest.genMockFunction().mockReturnValue(true);
        component._didScrollToBottom = jest.genMockFunction().mockReturnValue(false);

        window.addEventListener.mock.calls[0][1]();

        expect(component.props.loadPrev.mock.calls.length).toBe(1);
        expect(component.props.loadNext.mock.calls.length).toBe(0);

        React.unmountComponentAtNode(React.findDOMNode(component).parentNode);

        expect(removeEventListener.mock.calls.length).toBe(1);
    });

    it("calls the heading generator", function () {
        var generator = function (data) {
            return data.num % 25 === 0 ? "Every 25 Heading..." : null;
        };
        var component = getRenderedComponent({ headingGenerator: generator });
        var batch = React.findDOMNode(component.refs.batch0);

        for (var i = 0; i < batch.childNodes.length; i += 1) {
            expect(batch.childNodes[i].getElementsByClassName("item-head").length).toBe(i % 25 === 0 ? 1 : 0);
        }
    });

    it("loads prev upon hitting bottom of container", function () {
        var component = getRenderedComponent();
        component._didScrollToTop = jest.genMockFunction().mockReturnValue(true);
        component._didScrollToBottom = jest.genMockFunction().mockReturnValue(false);
        component.componentDidUpdate();

        ReactTestUtils.Simulate.scroll(React.findDOMNode(component.refs.container));

        expect(component.props.loadPrev.mock.calls.length).toBe(1);
        expect(component.props.loadNext.mock.calls.length).toBe(0);
    });

    it("loads next upon hitting bottom of container", function () {
        var component = getRenderedComponent();
        component._didScrollToTop = jest.genMockFunction().mockReturnValue(false);
        component._didScrollToBottom = jest.genMockFunction().mockReturnValue(true);
        component.componentDidUpdate();

        ReactTestUtils.Simulate.scroll(React.findDOMNode(component.refs.container));

        expect(component.props.loadPrev.mock.calls.length).toBe(0);
        expect(component.props.loadNext.mock.calls.length).toBe(1);
    });
});

