window.__DEV__ = true;

jest.dontMock("../DragDropColumn");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("DragDropColumn", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../../testutil/TestUtils"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        DragDropColumn = require("../DragDropColumn"),
        _ = require("underscore"),
        TestBackend = require("react-dnd-test-backend"),
        DragDropContext = require("react-dnd").DragDropContext;

    //this is set for each component in wrapInTestContext ref. Keeps from chaning all of the string refs
    var thisComponent;

    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)( class extends React.Component {
            render() {
                return <Component ref={(c) => thisComponent = c} {...this.props} />;
            }
        });
    }

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

        var WrappedComponent = wrapInTestContext(DragDropColumn);
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={WrappedComponent} opts={opts} />);
    }

    beforeEach(function () {
        thisComponent = null;
    });

    it("renders with default data-id", function () {
        getWrappedComponent();
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-column");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given data-id", function () {
        getWrappedComponent({ "data-id": "myDragDropColumn" });
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "myDragDropColumn");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given className", function () {
        getWrappedComponent({ className: "myDragDropColumnClass" });
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithClass(component, "myDragDropColumnClass");

        expect(dragDropColumn).toBeDefined();
    });

    it("Renders search when showSearch=true", function () {
        var wrapper = getWrappedComponent({ showSearch: true });
        var component = thisComponent;
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "search")).toBeTruthy();

        wrapper.sendProps({ showSearch: false });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "search")).toBeFalsy();
    });

    it("Renders drop target when no rows", function () {
        getWrappedComponent({ rows: [] });
        var component = thisComponent;

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "empty-placeholder")).toBeTruthy();
    });



    it("Executes search callback", function () {
        getWrappedComponent({ showSearch: true });
        var component = thisComponent;

        component._handleSearch("superman");
        expect(component.props.onSearch).toBeCalledWith(0, "superman");
    });

    it("renders ghost row", function () {
        getWrappedComponent({ ghostRowAt: 1 });
        var component = thisComponent;

        //find all the rendered drag drop rows
        var rows = ReactDOM.findDOMNode(component).getElementsByClassName("drag-drop-item");

        expect(rows.length).toBe(3);

        //TODO: reactid is deprecated
        //expect(rows[1].getAttribute("data-reactid")).toContain("preview");
    });

    it("Executes scroll callbacks", function () {
        getWrappedComponent({ rows: [] });
        var component = thisComponent;
        var itemNode = ReactDOM.findDOMNode(component.refs.items);

        //have to extend this because jsdom doesn't allow to set scrollTop etc
        var items = _.extend({}, itemNode);

        //mocking find dom node in the function to return our new items instead
        ReactDOM.findDOMNode = jest.fn().mockReturnValue(items);
        items.getBoundingClientRect = jest.genMockFunction().mockReturnValue({
            height: 100
        });

        component._handleScroll();
        expect(component.props.onScrolledToTop).toBeCalled();
        expect(component.props.onScrolledToBottom).not.toBeCalled();
        //clear the mock
        component.props.onScrolledToTop.mockClear();

        //set up the node to look like it's scrolled to the bottom
        items.scrollTop = 100;
        items.scrollHeight = 200;

        component._handleScroll();
        expect(component.props.onScrolledToTop).not.toBeCalled();
        expect(component.props.onScrolledToBottom).toBeCalled();

        jest.restoreAllMocks();
    });
    //Make sure the above test is always last because of the mock findDOMNode
});
