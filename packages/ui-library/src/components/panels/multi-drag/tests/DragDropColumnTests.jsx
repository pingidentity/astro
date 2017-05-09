window.__DEV__ = true;

jest.dontMock("../DragDropColumn.jsx");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("DragDropColumn", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../../testutil/TestUtils"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        DragDropColumn = require("../DragDropColumn.jsx"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            onSearch: jest.genMockFunction(),
            onScrolledToTop: jest.genMockFunction(),
            onScrolledToBottom: jest.genMockFunction(),

            contentType: <div />,
            name: "Available Rows",
            index: 0,
            rows: [{ id: 1, n: 1 }, { id: 2, n: 2 }],
        });

        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={DragDropColumn} opts={opts} />);
    }

    beforeEach(function () {
    });

    it("renders with default data-id", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-column");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given data-id", function () {
        var wrapper = getWrappedComponent({ "data-id": "myDragDropColumn" });
        var component = wrapper.refs.target;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "myDragDropColumn");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given className", function () {
        var wrapper = getWrappedComponent({ className: "myDragDropColumnClass" });
        var component = wrapper.refs.target;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithClass(component, "myDragDropColumnClass");

        expect(dragDropColumn).toBeDefined();
    });

    it("Renders search when showSearch=true", function () {
        var wrapper = getWrappedComponent({ showSearch: true });
        var component = wrapper.refs.target;
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "search")).toBeTruthy();

        wrapper.sendProps({ showSearch: false });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "search")).toBeFalsy();
    });

    it("Should clear query string", function () {
        var wrapper = getWrappedComponent({ showSearch: true }),
            component = wrapper.refs.target;

        component._handleSearch("test");
        expect(component.props.onSearch).toBeCalledWith(0, "test");

        component._clear();
        expect(component.props.onSearch).toBeCalledWith(0, "");
    });

    it("Renders drop target when no rows", function () {
        var wrapper = getWrappedComponent({ rows: [] });
        var component = wrapper.refs.target;

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "empty-placeholder")).toBeTruthy();
    });

    it("Executes scroll callbacks", function () {
        var wrapper = getWrappedComponent({ rows: [] });
        var component = wrapper.refs.target;
        var items = ReactDOM.findDOMNode(component.refs.items);

        component._handleScroll();
        expect(component.props.onScrolledToTop).toBeCalled();
        expect(component.props.onScrolledToBottom).not.toBeCalled();
        //clear the mock
        component.props.onScrolledToTop.mockClear();

        //set up the node to look like it's scrolled to the bottom
        items.scrollTop = 100;
        items.scrollHeight = 200;
        items.getBoundingClientRect = jest.genMockFunction().mockReturnValue({
            height: 100
        });

        component._handleScroll();
        expect(component.props.onScrolledToTop).not.toBeCalled();
        expect(component.props.onScrolledToBottom).toBeCalled();
    });

    it("Executes search callback", function () {
        var wrapper = getWrappedComponent({ showSearch: true });
        var component = wrapper.refs.target;

        component._handleSearch("superman");
        expect(component.props.onSearch).toBeCalledWith(0, "superman");
    });

    it("renders ghost row", function () {
        var wrapper = getWrappedComponent({ ghostRowAt: 1 });
        var component = wrapper.refs.target;

        //find all the rendered drag drop rows
        var rows = ReactDOM.findDOMNode(component).getElementsByClassName("drag-drop-row");

        expect(rows.length).toBe(3);
        expect(rows[1].getAttribute("data-reactid")).toContain("preview");
    });
});
